import AWS from "aws-sdk";
import config from "../../config";

const sns = new AWS.SNS({
  region: config.AWS_SES_REGION,
  accessKeyId: config.AWS_SES_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SES_SECRET_ACCESS_KEY,
});

const ses = new AWS.SES({
  region: config.AWS_SES_REGION,
  accessKeyId: config.AWS_SES_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SES_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3({
  region: config.AWS_REGION,
  accessKeyId: config.ACCESS_KEY_ID,
  secretAccessKey: config.SECRET_ACCESS_KEY,
});

export { sns, ses, s3 };
