import { S3Client } from "@aws-sdk/client-s3";
import { config } from "./env";

export const s3 = new S3Client({
  ...config.s3.config,
  forcePathStyle: true,
});

export const s3Public = new S3Client({
  endpoint: config.s3.publicEndpoint,
  region: config.s3.config.region,
  credentials: config.s3.config.credentials,
  forcePathStyle: true,
});
