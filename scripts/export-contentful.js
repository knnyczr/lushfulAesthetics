#!/usr/bin/env node
"use strict";
require("dotenv").config();

/**
 * Export published Contentful entries by type to a local snapshot folder.
 * - Output structure:
 *   .export/
 *     index.json                          // manifest of types and counts
 *     types/
 *       ContentfulHomePage/index.json     // array of nodes
 *       ContentfulServicePage/index.json  // array of nodes
 *       ...
 *
 * Requirements:
 * - Preserve Gatsby GraphQL type names as used in queries (ContentfulXxx)
 * - Keep RichText fields as { raw } JSON strings as provided by CDA
 * - Include asset fields with id, url, description
 *
 * Env vars required:
 * - CONTENTFUL_SPACE_ID
 * - CONTENTFUL_CDA (Content Delivery API token)
 */

const fs = require("fs");
const path = require("path");
const contentful = require("contentful");
const dotenv = require("dotenv");

// Load env from .env.<NODE_ENV> → .env.development → .env.production → .env
(() => {
  const candidates = [
    `.env.${process.env.NODE_ENV || "development"}`,
    `.env.development`,
    `.env.production`,
    `.env`,
  ];
  for (const p of candidates) {
    const abs = path.resolve(process.cwd(), p);
    if (fs.existsSync(abs)) {
      dotenv.config({ path: abs });
      break;
    }
  }
})();

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

if (!SPACE_ID || !ACCESS_TOKEN) {
  console.error(
    "Missing CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN in environment"
  );
  process.exit(1);
}

const OUTPUT_ROOT = path.resolve(process.cwd(), ".export");
const OUTPUT_TYPES = path.join(OUTPUT_ROOT, "types");

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function writeJSON(filePath, data) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

function entrySysTypeToGraphQLType(contentTypeId) {
  // Convert Contentful Content Type ID to Gatsby GraphQL type name convention
  // content type "homePage" => ContentfulHomePage
  // content type "servicePage" => ContentfulServicePage
  // content type "blogPost" => ContentfulBlogPost etc.
  if (!contentTypeId) return null;
  const pascal = contentTypeId
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
  return `Contentful${pascal}`;
}

function mapAsset(asset) {
  if (!asset || !asset.sys) return null;
  const id = asset.sys.id;
  const url = asset.fields?.file?.url ? `https:${asset.fields.file.url}` : null;
  const description = asset.fields?.description || asset.fields?.title || null;
  return { id, url, description };
}

function transformFieldsPreservingRichTextAndAssets(fields) {
  if (!fields || typeof fields !== "object") return fields;
  const MAX_DEPTH = 3;

  const walk = (value, depth = 0) => {
    if (value == null) return value;
    if (depth > MAX_DEPTH) return null;
    if (Array.isArray(value)) return value.map((v) => walk(v, depth + 1));
    if (typeof value !== "object") return value;

    // Asset object (expanded)
    if (value.sys && value.sys.type === "Asset") {
      return mapAsset(value);
    }

    // RichText document
    if (value.nodeType === "document" && value.content) {
      return { raw: JSON.stringify(value) };
    }

    // Linked Entry (expanded): flatten to its fields
    if (value.fields && value.sys && value.sys.type === "Entry") {
      return walk(value.fields, depth + 1);
    }

    // Generic object: shallowly copy, skip sys/metadata to avoid cycles
    const out = {};
    for (const k of Object.keys(value)) {
      if (k === "sys" || k === "metadata") continue;
      out[k] = walk(value[k], depth + 1);
    }
    return out;
  };

  const result = {};
  for (const key of Object.keys(fields)) {
    result[key] = walk(fields[key], 0);
  }
  return result;
}

async function fetchAllContent(client) {
  // Get all content types first to know the set
  const contentTypes = await client.getContentTypes();
  const manifest = { types: [], generatedAt: new Date().toISOString() };

  for (const ct of contentTypes.items) {
    const typeId = ct.sys.id; // e.g., servicePage
    const graphQLType = entrySysTypeToGraphQLType(typeId);
    if (!graphQLType) continue;

    // Fetch all entries for this type (published only via CDA)
    const entries = await paginateEntries(client, typeId);

    const mapped = entries.map((entry) => {
      const id = entry.sys?.id;
      const fields = transformFieldsPreservingRichTextAndAssets(entry.fields);
      return { id, ...fields };
    });

    const outPath = path.join(OUTPUT_TYPES, graphQLType, "index.json");
    writeJSON(outPath, mapped);

    manifest.types.push({
      type: graphQLType,
      count: mapped.length,
      path: path.relative(OUTPUT_ROOT, outPath),
    });
  }

  writeJSON(path.join(OUTPUT_ROOT, "index.json"), manifest);
  return manifest;
}

async function paginateEntries(client, contentType) {
  const limit = 100;
  let skip = 0;
  let total = null;
  const results = [];
  do {
    const res = await client.getEntries({
      content_type: contentType,
      limit,
      skip,
      include: 2,
    });
    if (total === null) total = res.total;
    results.push(...res.items);
    skip += res.items.length;
  } while (skip < total);
  return results;
}

async function main() {
  ensureDir(OUTPUT_TYPES);
  const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN,
    environment: "master",
  });
  const manifest = await fetchAllContent(client);
  console.log(
    `Export complete: ${manifest.types.length} types written to ${OUTPUT_ROOT}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
