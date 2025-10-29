import { config, s3 } from "@/config";
import {
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  AbortMultipartUploadCommand,
  ListPartsCommand,
  CompletedPart,
} from "@aws-sdk/client-s3";

const BUCKET = config.s3.bucket;

export async function initMultipartUpload(
  filename: string,
  contentType: string,
) {
  const cmd = new CreateMultipartUploadCommand({
    Bucket: BUCKET,
    Key: filename,
    ContentType: contentType,
  });
  const res = await s3.send(cmd);
  return res.UploadId!;
}

export async function uploadPart(params: {
  uploadId: string;
  filename: string;
  partNumber: number;
  body: Buffer | Uint8Array | Blob | string | ReadableStream | undefined;
}) {
  const cmd = new UploadPartCommand({
    Bucket: BUCKET,
    Key: params.filename,
    UploadId: params.uploadId,
    PartNumber: params.partNumber,
    Body: params.body,
  });
  const res = await s3.send(cmd);
  return res.ETag!;
}

export async function listUploadedParts(uploadId: string, filename: string) {
  const cmd = new ListPartsCommand({
    Bucket: BUCKET,
    Key: filename,
    UploadId: uploadId,
  });
  const res = await s3.send(cmd);
  return res.Parts ?? [];
}

export async function completeMultipartUpload(params: {
  uploadId: string;
  filename: string;
  parts: CompletedPart[];
}) {
  const cmd = new CompleteMultipartUploadCommand({
    Bucket: BUCKET,
    Key: params.filename,
    UploadId: params.uploadId,
    MultipartUpload: { Parts: params.parts },
  });
  const res = await s3.send(cmd);
  return res.Location!;
}

export async function abortMultipartUpload(uploadId: string, filename: string) {
  const cmd = new AbortMultipartUploadCommand({
    Bucket: BUCKET,
    Key: filename,
    UploadId: uploadId,
  });
  await s3.send(cmd);
}
