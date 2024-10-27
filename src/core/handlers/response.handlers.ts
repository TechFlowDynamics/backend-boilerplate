import { Response } from "express";

export const responseHandler = (
  res: Response,
  body: any ,
  status: number | 200,
  message?: string,
) => {
  const retunBody = {
    ...body,
    status: status,
    message: message || "",
  };
  return res.status(status).json(retunBody);
};
