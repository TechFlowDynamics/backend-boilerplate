import { Request, Response, NextFunction } from "express";
import AWS from "aws-sdk";
import config from "../../config";
import { PresignedPost } from "aws-sdk/clients/s3";

const s3 = new AWS.S3({
  accessKeyId: config.ACCESS_KEY_ID,
  secretAccessKey: config.SECRET_ACCESS_KEY,
  region: config.AWS_REGION,
});

const bucketName = config.S3_PUBLIC_BUCKET_NAME ?? "infinite-green-website";

export const generateS3UploadUrlMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { fileName, mimeType } = req.body;

  if (!fileName || !mimeType) {
    return res
      .status(400)
      .json({ error: "fileName and mimeType are required" });
  }
  const timestamp = Date.now();
  const fileExtension = fileName.split(".").pop();

  const s3FileName = `plants/${timestamp}-infinite-green.${fileExtension}`;

  const params: AWS.S3.PresignedPost.Params = {
    Bucket: bucketName,
    Expires: 300,
    Fields: {
      key: s3FileName,
      "Content-Type": mimeType,
    },
    Conditions: [
      { acl: "public-read" },
      { bucket: bucketName },
      ["content-length-range", 0, 1024 * 1024 * 15],
      { "x-amz-algorithm": "AWS4-HMAC-SHA256" },
    ],
  };

  try {
    const presignedData: PresignedPost = s3.createPresignedPost(params);

    req.userData.presignedData = presignedData;
    next();
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    res.status(500).json({ error: "Failed to generate presigned URL" });
  }
};
