#!/usr/bin/env node
"use strict";
require("dotenv").config();

/**
 * Upload the local .export snapshot to S3 under cms/prod/<timestamp>
 * and update cms/prod/active.json to point to the latest snapshot prefix.
 *
 * Env vars required:
 * - AWS_ACCESS_KEY_ID
 * - AWS_SECRET_ACCESS_KEY
 * - AWS_REGION
 * - S3_BUCKET
 */

const fs = require("fs");
const path = require("path");
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
const crypto = require("crypto");
const {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
} = require("@aws-sdk/client-s3");

const AWS_REGION = process.env.LUSHFUL_AWS_REGION;
const S3_BUCKET = process.env.LUSHFUL_S3_BUCKET;

if (!AWS_REGION || !S3_BUCKET) {
  console.error("Missing LUSHFUL_AWS_REGION or LUSHFUL_S3_BUCKET env");
  process.exit(1);
}

const s3 = new S3Client({ region: AWS_REGION });

const EXPORT_ROOT = path.resolve(process.cwd(), ".export");
const PREFIX_ROOT = "cms/prod";

function ensureExportExists() {
  if (!fs.existsSync(EXPORT_ROOT)) {
    console.error(
      ".export directory not found. Run export-contentful.js first."
    );
    process.exit(1);
  }
}

function createTimestamp() {
  const iso = new Date().toISOString().replace(/[:.]/g, "-");
  const rand = crypto.randomBytes(4).toString("hex");
  return `${iso}-${rand}`;
}

async function uploadFile(localPath, s3Key) {
  const Body = fs.readFileSync(localPath);
  const ContentType = localPath.endsWith(".json")
    ? "application/json"
    : "application/octet-stream";
  await s3.send(
    new PutObjectCommand({ Bucket: S3_BUCKET, Key: s3Key, Body, ContentType })
  );
}

async function uploadDirectory(localDir, s3Prefix) {
  const entries = fs.readdirSync(localDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(localDir, entry.name);
    const key = `${s3Prefix}/${path
      .relative(EXPORT_ROOT, fullPath)
      .split(path.sep)
      .join("/")}`;
    if (entry.isDirectory()) {
      await uploadDirectory(fullPath, s3Prefix);
    } else {
      await uploadFile(fullPath, key);
    }
  }
}

async function updateActiveJSON(s3Prefix) {
  const key = `${PREFIX_ROOT}/active.json`;
  const body = Buffer.from(
    JSON.stringify(
      { prefix: s3Prefix, updatedAt: new Date().toISOString() },
      null,
      2
    ),
    "utf8"
  );
  await s3.send(
    new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
      Body: body,
      ContentType: "application/json",
    })
  );
}

async function main() {
  ensureExportExists();
  const timestamp = createTimestamp();
  const targetPrefix = `${PREFIX_ROOT}/${timestamp}`;

  await uploadDirectory(EXPORT_ROOT, targetPrefix);
  await updateActiveJSON(targetPrefix);
  console.log(`Uploaded .export to s3://${S3_BUCKET}/${targetPrefix}`);
  console.log(`Updated s3://${S3_BUCKET}/${PREFIX_ROOT}/active.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
