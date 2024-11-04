import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

interface ENV {
  CLIENT_URL: string | undefined;
  NODE_ENV: string | undefined;
  MONGODB_CONNECTION_URL: string;
  DB_NAME: string;
  SECRET_ACCESS_KEY: string | undefined;
  ACCESS_KEY_ID: string | undefined;
  S3_PUBLIC_BUCKET_NAME: string | undefined;
  PORT: number | undefined;
  AUTHORIZATION_KEY: string | undefined;
  JWT_SECRET: string | undefined;
  F_BASE_URL: string | undefined;
  F_BASE_NGROK_URL: string | undefined;
  GOOGLE_CLIENT_ID: string | undefined;
  GOOGLE_CLIENT_SECRET: string | undefined;
  GOOGLE_CALLBACK_URL_LOCAL: string | undefined;
  GOOGLE_CALLBACK_URL_UAT: string | undefined;
  SENDGRID_API_KEY: string | undefined;
  SENDGRID_SENDER_EMAIL: string | undefined;
  FIREBASE_API_KEY: string | undefined;
  FIREBASE_AUTH_DOMAIN: string | undefined;
  FIREBASE_PROJECT_ID: string | undefined;
  FIREBASE_STORAGE_BUCKET: string | undefined;
  FIREBASE_MESSAGING_SENDER_ID: string | undefined;
  FIREBASE_APP_ID: string | undefined;
  FIREBASE_MEASUREMENT_ID: string | undefined;
  CACHE_DB_PORT: number | undefined;
  CACHE_DB_HOST: string | undefined;
  CACHE_DB_PASSWORD: string | undefined;
  SEED_ADMIN_USERNAME: string | undefined;
  TWILIO_FAMILY_NAME: string | undefined;
  SEED_ADMIN_PASSWORD: string | undefined;
  AWS_REGION: string | undefined;
  AWS_SES_REGION: string | undefined;
  AWS_SNS_ACCESS_KEY_ID: string | undefined;
  AWS_SNS_SECRET_ACCESS_KEY: string | undefined;
  AWS_SES_ACCESS_KEY_ID: string | undefined;
  AWS_SES_SECRET_ACCESS_KEY: string | undefined;
  AWS_SENDERS_EMAIL: string | undefined;
  REFRESH_TOKEN_SECERT: string | undefined;
  ACCESS_TOKEN_SECERT: string | undefined;
}

const getConfig = (): ENV => {
  return {
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
    DB_NAME: process.env.DB_NAME ? process.env.DB_NAME : "",
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    REFRESH_TOKEN_SECERT: process.env.REFRESH_TOKEN_SECERT,
    ACCESS_TOKEN_SECERT: process.env.ACCESS_TOKEN_SECERT,
    NODE_ENV: process.env.NODE_ENV,
    MONGODB_CONNECTION_URL: process.env.MONGODB_CONNECTION_URL
      ? process.env.MONGODB_CONNECTION_URL
      : "",
    S3_PUBLIC_BUCKET_NAME: process.env.S3_PUBLIC_BUCKET_NAME,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    AUTHORIZATION_KEY: process.env.AUTHORIZATION_KEY,
    F_BASE_URL: process.env.F_BASE_URL,
    F_BASE_NGROK_URL: process.env.F_BASE_NGROK_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL_LOCAL: process.env.GOOGLE_CALLBACK_URL_LOCAL
      ? process.env.GOOGLE_CALLBACK_URL_LOCAL
      : "",
    TWILIO_FAMILY_NAME: process.env.TWILIO_FAMILY_NAME,

    GOOGLE_CALLBACK_URL_UAT: process.env.GOOGLE_CALLBACK_URL_UAT
      ? process.env.GOOGLE_CALLBACK_URL_UAT
      : "",
    AWS_REGION: process.env.AWS_REGION,
    AWS_SES_REGION: process.env.AWS_SES_REGION,
    AWS_SNS_ACCESS_KEY_ID: process.env.AWS_SNS_ACCESS_KEY_ID,
    AWS_SNS_SECRET_ACCESS_KEY: process.env.AWS_SNS_SECRET_ACCESS_KEY,
    AWS_SES_ACCESS_KEY_ID: process.env.AWS_SES_ACCESS_KEY_ID,
    AWS_SES_SECRET_ACCESS_KEY: process.env.AWS_SES_SECRET_ACCESS_KEY,
    AWS_SENDERS_EMAIL: process.env.AWS_SENDERS_EMAIL,
    JWT_SECRET: process.env.JWT_SECRET,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    SENDGRID_SENDER_EMAIL: process.env.SENDGRID_SENDER_EMAIL,
    CLIENT_URL: process.env.CLIENT_URL,
    CACHE_DB_PORT: process.env.CACHE_DB_PORT
      ? Number(process.env.CACHE_DB_PORT)
      : undefined,
    CACHE_DB_HOST: process.env.CACHE_DB_HOST,
    CACHE_DB_PASSWORD: process.env.CACHE_DB_PASSWORD,
    SEED_ADMIN_USERNAME: process.env.SEED_ADMIN_USERNAME,
    SEED_ADMIN_PASSWORD: process.env.SEED_ADMIN_PASSWORD,
  };
};

const config = getConfig();

export default config;
