import { Response, Request, NextFunction } from "express";
import { ResponseMessages } from "../../core/constants/cloud.constants";
import { responseHandler } from "../../core/handlers/response.handlers";
import { uploadGeneralFile } from "../service/upload.service";

export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return responseHandler(
        res,
        null,
        400,
        'Please provide "filename" in query!'
      );
    }
    const buffer = req.file.buffer;

    const uploadedFileName = req.file.originalname;

    const data = await uploadGeneralFile(buffer, uploadedFileName);

    return responseHandler(res, { data }, 200, ResponseMessages.OK);
  } catch (err) {
    console.log("error is ", err);
  }
};

export default {
  uploadFile,
};
