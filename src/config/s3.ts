import { S3Client } from "@aws-sdk/client-s3";
import { config } from "./env";

export const s3 = new S3Client({
  ...config.s3.config,
  forcePathStyle: true,
});
