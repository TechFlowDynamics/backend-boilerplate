import { NextFunction, Request, Response } from "express";
import { ResponseMessages } from "../../core/constants/cloud.constants";
import { responseHandler } from "../../core/handlers/response.handlers";
import { getService } from "../service/questions.service";
import {
  PaginationInterface,
  QuestoinFilterInterface,
} from "../../core/interface/questions.interface";
export const getList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = req.query;
    console.log("🚀 ~ query:", query);

    let filter: QuestoinFilterInterface = {};
    if (query?.categoryTitle) {
      filter.categoryTitle = query.categoryTitle as string;
    }
    if (query?.tags) {
      if (typeof query.tags === "string") {
        const tags = query.tags.split(",");
        filter.topicTags = { $elemMatch: { name: { $in: tags } } };
      }
    }
    if (query?.title) {
      filter.title = { $regex: `${query?.title}`, $options: "i" };
    }

    if (query?.difficulty) {
      filter.difficulty = query.difficulty as string;
    }
    let pagination: PaginationInterface = { skip: 0, limit: 20 };

    if (query?.pageSize && query?.pageNo) {
      const pageSize = parseInt(query.pageSize as string, 10);
      const pageNo = parseInt(query.pageNo as string, 10);

      pagination.skip = (pageNo - 1) * pageSize;
      pagination.limit = pageSize;
    }

    console.log("🚀 ~ filter:", filter);
    const data = await getService(filter, pagination);
    responseHandler(res, { data }, 200, ResponseMessages.OK);
  } catch (error) {
    next(error);
  }
};
