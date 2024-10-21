import dal from "../../data/dal";
import {
  IQuestion,
  PaginationInterface,
  QuestionOutputInterface,
  QuestoinFilterInterface,
} from "../../core/interface/questions.interface";
import questionsModel from "../../data/models/questions.model";

export const getService = async (
  filter: QuestoinFilterInterface,
  pagination: PaginationInterface,
): Promise<QuestionOutputInterface[]> => {
  const projection = {
    title: 1,
    topicTags: 1,
    categoryTitle: 1,
    content: 1,
    acRate: 1,
    difficulty: 1,
    _id: 0,
  };

  const data = await dal.find(
    questionsModel,
    filter,
    pagination,
    {},
    projection,
  );
  return data as QuestionOutputInterface[];
};

export const questionDetails = async (slug: string): Promise<IQuestion> => {
  const filter = { titleSlug: `${slug}` };

  const response = await dal.findOne(questionsModel, filter);
  return response as IQuestion;
};
