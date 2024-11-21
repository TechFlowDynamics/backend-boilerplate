// src/core/types/express.d.ts
import "express";
import { UserType } from "../interface/global.interface";

declare module "express" {
  export interface Request {
    value?: any;
    userData?: UserType;
  }
}
