#!/usr/bin/env node
/**
 * Simple smoke test: hit Gatsby GraphQL endpoint and assert non-zero counts.
 * Works with `gatsby develop` (default http://localhost:8000/___graphql).
 */
const http = require("http");

const endpoint =
  process.env.GRAPHQL_ENDPOINT || "http://localhost:8000/___graphql";

const query = `
{
  allContentfulServicePage { totalCount }
  allContentfulBlogPost { totalCount }
  allContentfulAsset { totalCount }
}
`;

function post(url, body) {
  return new Promise((resolve, reject) => {
    const { hostname, port, path } = new URL(url);
    const data = Buffer.from(JSON.stringify({ query: body }));
    const req = http.request(
      {
        hostname,
        port: port || 80,
        path,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": data.length,
        },
      },
      (res) => {
        let chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          const txt = Buffer.concat(chunks).toString("utf8");
          try {
            const json = JSON.parse(txt);
            resolve(json);
          } catch (e) {
            reject(new Error(`Non-JSON response: ${txt.slice(0, 200)}`));
          }
        });
      }
    );
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

(async () => {
  const res = await post(endpoint, query);
  if (res.errors) {
    console.error("GraphQL errors:", res.errors);
    process.exit(1);
  }
  const svc = res.data?.allContentfulServicePage?.totalCount ?? 0;
  const blog = res.data?.allContentfulBlogPost?.totalCount ?? 0;
  const asset = res.data?.allContentfulAsset?.totalCount ?? 0;

  console.log(
    `Counts → ServicePage: ${svc}, BlogPost: ${blog}, Asset: ${asset}`
  );

  if (svc === 0 || blog === 0 || asset === 0) {
    throw new Error(
      "One or more counts are zero. Check S3 snapshot, active.json, and Gatsby S3 source."
    );
  }
  console.log("✅ Smoke test passed.");
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
