import { config, s3, s3Public } from "@/config";
import {
  AbortMultipartUploadCommand,
  CompletedPart,
  CompleteMultipartUploadCommand,
  CreateMultipartUploadCommand,
  GetObjectCommand,
  ListPartsCommand,
  UploadPartCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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

  const presignedUrl = await getPresignedUrl(params.filename);
  return presignedUrl;
}

export async function abortMultipartUpload(uploadId: string, filename: string) {
  const cmd = new AbortMultipartUploadCommand({
    Bucket: BUCKET,
    Key: filename,
    UploadId: uploadId,
  });
  await s3.send(cmd);
}

export async function getPresignedUrl(
  filename: string,
  expiresIn: number = 3600,
): Promise<string> {
  const cmd = new GetObjectCommand({
    Bucket: BUCKET,
    Key: filename,
  });

  const presignedUrl = await getSignedUrl(s3Public, cmd, { expiresIn });
  return presignedUrl;
}
