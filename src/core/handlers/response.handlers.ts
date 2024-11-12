import { Response } from "express";

export const responseHandler = (
  res: Response,
  body: any,
  status: number | 200,
  message?: string,
) => {
  const retunBody = {
    status: "success",
    statusCode: status,
    message: message || "",
    ...body,
  };
  return res.status(status).json(retunBody);
};
