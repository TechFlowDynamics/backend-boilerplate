import AWS from "aws-sdk";
import { PresignedPost } from "aws-sdk/clients/s3";
import config from "../../config";

const bucketName = config.S3_PUBLIC_BUCKET_NAME || "infinite-green-website";

AWS.config.update({
  region: config.AWS_SES_REGION,
  accessKeyId: config.ACCESS_KEY_ID,
  secretAccessKey: config.SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3({
  accessKeyId: config.ACCESS_KEY_ID,
  secretAccessKey: config.SECRET_ACCESS_KEY,
  region: config.AWS_REGION,
});

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

    const presignedPostData: PresignedPost = s3.createPresignedPost(
      inputParams
    );

    return presignedPostData;
  } catch (error) {
    throw new Error("Could not generate pre-signed URL");
  }
};

export const uploadGeneralFile = async (
  buffer: Buffer,
  fileName: string
): Promise<string> => {
  const fileExtension = fileName.split(".").pop();
  const timestamp = Date.now();
  const file_name = `kisna/export/${timestamp}-kisna-${Math.floor(
    Math.random() * 100 + 1
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
