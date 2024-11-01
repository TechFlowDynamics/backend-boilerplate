// src/middleware/logger.ts
import morganBody from "morgan-body";
import { Express } from "express";

class CustomLogger {
  private formatDate(date: Date) {
    return date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      // timeZoneName: "short",
      hour12: false,
    });
  }

  info(message: string) {
    console.info(`[INFO] ${this.formatDate(new Date())} - ${message}`);
  }

  warn(message: string) {
    console.warn(`[WARN] ${this.formatDate(new Date())} - ${message}`);
  }

  error(message: string) {
    console.error(`[ERROR] ${this.formatDate(new Date())} - ${message}`);
  }

  debug(message: string) {
    console.debug(`[DEBUG] ${this.formatDate(new Date())} - ${message}`);
  }
}

const customLogger = new CustomLogger();

export const setupLogger = (app: Express) => {
  morganBody(app, {
    noColors: false,
    prettify: true,
    logRequestBody: true,
    logReqUserAgent: false,
    logIP: false,
    maxBodyLength: 5000,
    logReqDateTime: false,
    theme: "darkened",
    includeNewLine: true,
    filterParameters: ["password", "token"], // Exclude sensitive information
    stream: {
      write: message => {
        customLogger.info(message.trim());
        return true;
      },
    },
  });
};

export default customLogger;
