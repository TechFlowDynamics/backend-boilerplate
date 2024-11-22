import config from "../../config";
import { s3 } from "../../core/scripts/aws.scripts";

const bucketName = config.S3_PUBLIC_BUCKET_NAME || "infinite-green-website";

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
