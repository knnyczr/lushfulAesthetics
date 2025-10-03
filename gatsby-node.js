const path = require("path");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { createRemoteFileNode } = require("gatsby-source-filesystem");

const useS3Source = String(process.env.USE_S3_SOURCE).toLowerCase() === "true";
const AWS_REGION = process.env.AWS_REGION;
const S3_BUCKET = process.env.S3_BUCKET;
const S3_PREFIX_OVERRIDE = process.env.S3_PREFIX; // optional manual rollback/override
const DEFAULT_LOCALE = process.env.CONTENTFUL_LOCALE || "en-US";

async function streamToString(stream) {
  return await new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
  });
}

async function getJSONFromS3({ client, key }) {
  const res = await client.send(
    new GetObjectCommand({ Bucket: S3_BUCKET, Key: key })
  );
  const body = await streamToString(res.Body);
  return JSON.parse(body);
}

function toContentfulTypeName(name) {
  if (!name) return null;
  const pascal = name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
  return `Contentful${pascal}`;
}

function collectAssets(obj, found = new Map()) {
  if (!obj || typeof obj !== "object") return found;
  if (Array.isArray(obj)) {
    obj.forEach((v) => collectAssets(v, found));
    return found;
  }
  // asset heuristic: has id and (url or description)
  if (obj.id && (obj.url || obj.description) && !obj.sys && !obj.internal) {
    found.set(obj.id, {
      contentful_id: obj.id,
      url: obj.url || null,
      publicUrl: obj.url || null,
      description: obj.description || null,
    });
  }
  Object.values(obj).forEach((v) => collectAssets(v, found));
  return found;
}

function linkifyAssetsFields({ value, getNodeIdForAsset }) {
  if (Array.isArray(value)) {
    return value.map((v) =>
      linkifyAssetsFields({ value: v, getNodeIdForAsset })
    );
  }
  if (!value || typeof value !== "object") return value;

  const next = { ...value };
  for (const [k, v] of Object.entries(value)) {
    if (v && typeof v === "object" && v.id && (v.url || v.description)) {
      const nodeId = getNodeIdForAsset(v.id);
      if (nodeId) {
        delete next[k];
        next[`${k}___NODE`] = nodeId;
        continue;
      }
    }
    next[k] = linkifyAssetsFields({ value: v, getNodeIdForAsset });
  }
  return next;
}

function normalizeForGatsby(item, typeName) {
  const contentful_id = item.contentful_id || item.id || item.sys?.id;
  const node_locale = item.node_locale || DEFAULT_LOCALE;
  const updatedAt = item.updatedAt || item.sys?.updatedAt || null;
  const base = { ...item };
  delete base.id;
  delete base.sys;
  return {
    contentful_id,
    node_locale,
    updatedAt,
    ...base,
    internalType: typeName,
  };
}

exports.sourceNodes = async (api) => {
  const {
    actions,
    reporter,
    createNodeId,
    createContentDigest,
    getNodesByType,
    cache,
    store,
  } = api;
  const { createNode } = actions;

  if (!useS3Source) {
    return;
  }

  // Safety guard: if Contentful plugin already created nodes, skip S3 sourcing to avoid type ownership conflicts
  const preExistingAssets = getNodesByType && getNodesByType("ContentfulAsset");
  if (preExistingAssets && preExistingAssets.length > 0) {
    reporter.warn(
      "Detected existing Contentful nodes (env not empty). Skipping S3 source to avoid type ownership conflicts. Set CONTENTFUL_ENV to an empty environment to enable S3 sourcing."
    );
    return;
  }

  if (!AWS_REGION || !S3_BUCKET) {
    reporter.panicOnBuild(
      "USE_S3_SOURCE is true but AWS_REGION or S3_BUCKET is missing in environment"
    );
    return;
  }

  const s3 = new S3Client({ region: AWS_REGION });

  try {
    // 1) Determine snapshot prefix: S3_PREFIX override or active.json
    let prefix = S3_PREFIX_OVERRIDE ? S3_PREFIX_OVERRIDE : null;
    if (!prefix) {
      const active = await getJSONFromS3({
        client: s3,
        key: "cms/prod/active.json",
      });
      prefix = active.prefix;
    }
    prefix = prefix.replace(/^\/+/, "");

    // 2) Load catalog index.json for snapshot
    const catalog = await getJSONFromS3({
      client: s3,
      key: `${prefix}/index.json`,
    });

    // Asset node cache
    const assetIdToNodeId = new Map();

    function getNodeIdForAsset(assetId) {
      return assetIdToNodeId.get(assetId);
    }

    // Helper to create a ContentfulAsset node if not exists
    async function createOrGetAssetNode(
      asset,
      options = { shouldDownload: false, parentNodeId: undefined }
    ) {
      const existing = assetIdToNodeId.get(asset.contentful_id || asset.id);
      if (existing) return existing;
      const contentful_id = asset.contentful_id || asset.id;
      const nodeId = createNodeId(`contentful-asset-${contentful_id}`);
      const rawUrl = asset.url || "";
      const httpsUrl = rawUrl.startsWith("http") ? rawUrl : `https:${rawUrl}`;
      const fileName = httpsUrl.split("/").pop() || null;

      // Optionally download the remote file and link as localFile
      let localFileNodeId = null;
      if (options.shouldDownload) {
        try {
          const fileNode = await createRemoteFileNode({
            url: httpsUrl,
            parentNodeId: nodeId,
            createNode,
            createNodeId,
            cache,
            store,
            reporter,
          });
          if (fileNode && fileNode.id) {
            localFileNodeId = fileNode.id;
          }
        } catch (err) {
          reporter.warn(
            `Failed to download asset ${contentful_id} from ${httpsUrl}: ${err.message}`
          );
        }
      }

      const node = {
        contentful_id,
        title: asset.title || null,
        description: asset.description || null,
        url: httpsUrl || null,
        publicUrl: httpsUrl || null,
        file: {
          url: httpsUrl || null,
          fileName,
          contentType: asset.contentType || null,
          details: {
            image: {
              width: asset.width || null,
              height: asset.height || null,
            },
          },
        },
        node_locale: DEFAULT_LOCALE,
        ...(localFileNodeId ? { localFile___NODE: localFileNodeId } : {}),
        internal: {
          type: "ContentfulAsset",
          contentDigest: createContentDigest({
            contentful_id,
            url: httpsUrl || null,
          }),
        },
      };
      createNode({ id: nodeId, ...node });
      assetIdToNodeId.set(contentful_id, nodeId);
      return nodeId;
    }

    // 3) For each type, fetch its JSON and create nodes
    for (const t of catalog.types) {
      const typeName = t.type; // already like ContentfulServicePage
      const list = await getJSONFromS3({
        client: s3,
        key: `${prefix}/${t.path}`,
      });

      for (const rawItem of list) {
        // Determine which assets we want to download locally for this item (selective)
        const downloadAssetIds = new Set();
        if (typeName === "ContentfulServicePage") {
          const hero = rawItem?.heroImage;
          if (hero && (hero.id || hero.contentful_id)) {
            downloadAssetIds.add(hero.id || hero.contentful_id);
          }
          const pairs = rawItem?.beforeAndAfters || [];
          for (const pair of pairs) {
            const b = pair?.before;
            const a = pair?.after;
            if (b && (b.id || b.contentful_id))
              downloadAssetIds.add(b.id || b.contentful_id);
            if (a && (a.id || a.contentful_id))
              downloadAssetIds.add(a.id || a.contentful_id);
          }
        }

        // Collect assets from the item
        const foundAssets = collectAssets(rawItem);
        for (const asset of foundAssets.values()) {
          const assetId = asset.contentful_id || asset.id;
          const shouldDownload = downloadAssetIds.has(assetId);
          // eslint-disable-next-line no-await-in-loop
          await createOrGetAssetNode(asset, { shouldDownload });
        }

        // Linkify asset fields with ___NODE
        const withLinks = linkifyAssetsFields({
          value: rawItem,
          getNodeIdForAsset,
        });

        // Ensure article.references links to assets if article exists and set __typename
        if (withLinks.article) {
          const refNodeIds = [];
          const foundAssetsArr = Array.from(foundAssets.values());
          for (const a of foundAssetsArr) {
            const nid = getNodeIdForAsset(a.contentful_id);
            if (nid) refNodeIds.push(nid);
          }
          if (refNodeIds.length) {
            withLinks.article["references___NODE"] = refNodeIds;
            // also include a non-node version for debugging/introspection
            withLinks.article.references = foundAssetsArr.map((a) => ({
              __typename: "ContentfulAsset",
              title: a.title || null,
              description: a.description || null,
              url: a.url || null,
            }));
          }
        }

        const normalized = normalizeForGatsby(withLinks, typeName);
        const nodeId = createNodeId(`${typeName}-${normalized.contentful_id}`);
        const node = {
          ...normalized,
          internal: {
            type: typeName,
            contentDigest: createContentDigest(normalized),
          },
        };
        createNode({ id: nodeId, ...node });
      }
    }

    reporter.info("S3 snapshot sourced successfully.");
  } catch (err) {
    reporter.panicOnBuild(`Failed to source from S3: ${err.message}`);
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type ContentfulAsset implements Node {
      localFile: File @link
    }
  `);
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
  const servicePageTemplate = path.resolve(`./src/templates/servicePage.js`);
  const generalFAQsTemplate = path.resolve(`./src/templates/generalFAQs.js`);
  const privacyPolicyTemplate = path.resolve(
    `./src/templates/privacyPolicyPage.js`
  );
  const hipaaPolicyTemplate = path.resolve(
    `./src/templates/hipaaPolicyPage.js`
  );
  const categoryPageTemplate = path.resolve(`./src/templates/blogCategory.js`);
  const blogPageTemplate = path.resolve(`./src/templates/blogPost.js`);

  const {
    data: {
      allContentfulServicePage,
      allContentfulGeneralFaqPage,
      allContentfulBlogCategory,
      allContentfulBlogPost,
      allContentfulFooterContent,
    },
  } = await graphql(`
    {
      allContentfulServicePage {
        edges {
          node {
            slug
            id
          }
        }
      }

      allContentfulGeneralFaqPage(limit: 1) {
        edges {
          node {
            slug
            id
          }
        }
      }

      allContentfulFooterContent {
        edges {
          node {
            hipaaSlug
            privacyPolicySlug
          }
        }
      }

      allContentfulBlogCategory {
        edges {
          node {
            slug
            id
          }
        }
      }
      allContentfulBlogPost {
        edges {
          node {
            slug
            category {
              slug
            }
          }
        }
      }
    }
  `);
  allContentfulServicePage.edges.forEach((page) => {
    createPage({
      path: `/${page.node.slug}/`,
      component: servicePageTemplate,
      context: {
        servicePageId: page.node.id,
      },
    });
  });

  allContentfulGeneralFaqPage.edges.forEach((page) => {
    createPage({
      path: `/${page.node.slug}/`,
      component: generalFAQsTemplate,
      context: { pageId: page.node.id },
    });
  });

  allContentfulFooterContent.edges.forEach((page) => {
    if (page.node.hipaaSlug) {
      createPage({
        path: `/${page.node.hipaaSlug}/`,
        component: hipaaPolicyTemplate,
      });
    }
    if (page.node.privacyPolicySlug) {
      createPage({
        path: `/${page.node.privacyPolicySlug}/`,
        component: privacyPolicyTemplate,
      });
    }
  });

  allContentfulBlogCategory.edges.forEach((page) => {
    createPage({
      path: `/blog/${page.node.slug}/`,
      context: { blogCategory: page.node.id },
      component: categoryPageTemplate,
    });
  });

  allContentfulBlogPost.edges.forEach((page) => {
    createPage({
      path: `/blog/${page.node.category.slug}/${page.node.slug}/`,
      context: { pageId: page.node.slug },
      component: blogPageTemplate,
    });
  });

  createRedirect({
    fromPath: `/facial-aesthetic-services/botox`,
    toPath: `/facial-injectable-services/botox`,
  });
  createRedirect({
    fromPath: `/facial-aesthetic-services/fillers/cheek-filler`,
    toPath: `/facial-injectable-services/cheek-filler`,
  });
  createRedirect({
    fromPath: `/facial-aesthetic-services/fillers/lip-filler`,
    toPath: `/facial-injectable-services/lip-filler`,
  });
  createRedirect({
    fromPath: `/facial-aesthetic-services/fillers/jawline-filler`,
    toPath: `/facial-injectable-services/jawline-filler`,
  });
  createRedirect({
    fromPath: `/facial-aesthetic-services/fillers/chin-filler`,
    toPath: `/facial-injectable-services/chin-filler`,
  });
  createRedirect({
    fromPath: `/facial-aesthetic-services/fillers/nasolabiel-fold-filler`,
    toPath: `/facial-injectable-services/nasolabial-fold-filler`,
  });
  createRedirect({
    fromPath: `/facial-aesthetic-services/prp/under-eye-prp`,
    toPath: `/facial-injectable-services/prp/under-eye-prp`,
  });
};
