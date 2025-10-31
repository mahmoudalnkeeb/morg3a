import { logger } from "@/config";
import {
  abortMultipartUpload,
  completeMultipartUpload,
  initMultipartUpload,
  listUploadedParts,
  uploadPart,
} from "@/utils/s3";
import type { Request, Response } from "express";

type Part = {
  filename: string;
  uploadId: string;
  partNumber: number;
  chunk: string;
  isLast: false;
};

type FirstPart = Omit<Part, "uploadId"> & { contentType: string };

export async function upload(req: Request, res: Response) {
  const part: FirstPart | Part = req.body;

  logger.info(`uploading part number ${part.partNumber}`);

  const uploadId =
    req.body.partNumber === 1
      ? await initMultipartUpload(
          part.filename,
          (part as FirstPart).contentType,
        )
      : (part as Part).uploadId;

  const buffer = Buffer.from(part.chunk, "base64");

  const partEtag = await uploadPart({
    filename: part.filename,
    partNumber: part.partNumber,
    uploadId,
    body: buffer,
  });

  if (part.isLast) {
    // finalize the upload
    const parts = await listUploadedParts(uploadId, part.filename);
    const location = await completeMultipartUpload({
      uploadId: uploadId,
      filename: part.filename,
      parts,
    });

    // send the file location
    res.status(201).json({
      status: "success",
      message: "file uploaded",
      data: {
        location,
        isDone: true,
      },
    });
    return;
  }

  res.status(201).json({
    status: "success",
    message: "part uploaded",
    data: {
      partEtag,
      uploadId,
      isDone: false,
    },
  });
}

export async function abortUpload(req: Request, res: Response) {
  const { uploadId, filename } = req.body;

  await abortMultipartUpload(uploadId, filename);

  res.status(200).json({
    status: "success",
    message: "file upload aborted",
  });
}
