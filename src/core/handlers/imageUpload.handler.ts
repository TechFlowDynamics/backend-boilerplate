import AWS from "aws-sdk";
import { PresignedPost } from "aws-sdk/clients/s3";
import config from "../../config";
import { s3 } from "../scripts/aws.scripts";

const bucketName = config.S3_PUBLIC_BUCKET_NAME || "infinite-green-website";

export const generatePublicS3FileUrl = async (fileName: string) => {
  try {
    console.log(`-S3-SIGN-URL-STARTS---FILENAME-${fileName}`);

    const fileExtension = fileName.split(".").pop();
    const timestamp = Date.now();
    const s3FileName = `imagesBiker/${timestamp}-infinite-green.${fileExtension}`;

    const inputParams = {
      Bucket: bucketName,
      Expires: 300,
      Fields: {
        key: s3FileName,
      },
      conditions: [
        { ACL: "public-read" },
        { bucket: bucketName },
        { success_action_status: "200" },
        ["starts-with", "$key", ""],
        ["content-length-range", 0, 1024 * 1024 * 15],
        { "x-amz-algorithm": "AWS4-HMAC-SHA256" },
      ],
    };

    const presignedPostData: PresignedPost =
      s3.createPresignedPost(inputParams);

    return presignedPostData;
  } catch (error) {
    throw new Error("Could not generate pre-signed URL");
  }
};

export const uploadGeneralFile = async (
  buffer: Buffer,
  fileName: string,
): Promise<string> => {
  const fileExtension = fileName.split(".").pop();
  const timestamp = Date.now();
  const file_name = `kisna/export/${timestamp}-kisna-${Math.floor(
    Math.random() * 100 + 1,
  )}.${fileExtension}`;

  const params: AWS.S3.PutObjectRequest = {
    Bucket: bucketName,
    Key: file_name,
    Body: buffer,
  };

  try {
    const response = await s3.upload(params).promise();
    console.log("File uploaded successfully.", response.Location);
    return response.Location;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error(`Failed to upload file: ${error}`);
  }
};
