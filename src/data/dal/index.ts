import {
  Model,
  Document,
  FilterQuery,
  UpdateQuery,
  PipelineStage,
  QueryOptions,
} from "mongoose";
import mongodb from "mongodb";
// Create a new document
export const create = async <T extends Document>(
  model: Model<T>,
  body: Partial<T>,
): Promise<T> => {
  return await model.create(body);
};

// Create multiple documents
export const createMany = async <T extends Document>(
  model: Model<T>,
  body: Partial<T>[],
): Promise<mongodb.InsertManyResult> => {
  return await model.insertMany(body, { rawResult: true });
};

// Find documents with filtering, pagination, and sorting
export const find = async <T extends Document>(
  model: Model<T>,
  filter: FilterQuery<T> = {},
  pagination: { skip?: number; limit?: number } = {},
  sort: Record<string, any> = {},
  projection: Record<string, any> = {},
): Promise<T[]> => {
  return await model
    .find(filter, projection)
    .sort(sort)
    .skip(pagination.skip || 0)
    .limit(pagination.limit || 0);
};

// Find a single document
export const findOne = async <T extends Document>(
  model: Model<T>,
  filter: FilterQuery<T>,
  projection: Record<string, any> = {},
): Promise<T | null> => {
  return await model.findOne(filter, projection);
};

// Find a document by ID
export const findByID = async <T extends Document>(
  model: Model<T>,
  id: string,
): Promise<T | null> => {
  return await model.findById(id);
};

// Count documents
export const countDocuments = async <T extends Document>(
  model: Model<T>,
  filter: FilterQuery<T>,
): Promise<number> => {
  return await model.countDocuments(filter);
};

// Bulk write operations
export const bulkWrite = async <T extends Document>(
  model: Model<T>,
  operations: any[],
): Promise<any> => {
  return await model.bulkWrite(operations);
};

// Update a single document and return the updated document
export const findOneAndUpdate = async <T extends Document>(
  model: Model<T>,
  filter: FilterQuery<T>,
  body: UpdateQuery<T>,
): Promise<T | null> => {
  return await model.findOneAndUpdate(filter, body, {
    new: true,
    useFindAndModify: false,
  });
};

// Update a single document with array filters and return the updated document
export const findOneAndUpdateArray = async <T extends Document>(
  model: Model<T>,
  filter: FilterQuery<T>,
  body: UpdateQuery<T>,
  arrayFilters: QueryOptions = {},
): Promise<T | null> => {
  return await model.findOneAndUpdate(filter, body, {
    ...arrayFilters,
    new: true,
  });
};

// Upsert (update or insert) a single document
export const findOneAndUpsert = async <T extends Document>(
  model: Model<T>,
  filter: FilterQuery<T>,
  body: UpdateQuery<T>,
): Promise<T> => {
  return await model.findOneAndUpdate(filter, body, {
    new: true,
    upsert: true,
    runValidators: true,
    context: "query",
    setDefaultsOnInsert: true,
  });
};

// Update multiple documents
export const updateMany = async <T extends Document>(
  model: Model<T>,
  filter: FilterQuery<T>,
  body: UpdateQuery<T>,
): Promise<any> => {
  return await model.updateMany(filter, body, { new: true });
};

// Delete a single document
export const findOneAndDelete = async <T extends Document>(
  model: Model<T>,
  filter: FilterQuery<T>,
): Promise<T | null> => {
  return await model.findOneAndDelete(filter);
};

// Delete multiple documents
export const deleteMany = async <T extends Document>(
  model: Model<T>,
  filter: FilterQuery<T>,
): Promise<any> => {
  return await model.deleteMany(filter);
};

// Perform aggregation queries
export const aggregate = async <T extends Document>(
  model: Model<T>,
  pipeline: PipelineStage[],
): Promise<any[]> => {
  return await model
    .aggregate(pipeline)
    .collation({ locale: "en_US", strength: 1 });
};

// Perform a distinct query to get unique values
export const distinct = async <T extends Document>(
  model: Model<T>,
  field: string,
  query: FilterQuery<T> = {},
): Promise<any[]> => {
  return await model.distinct(field, query);
};

export default {
  create,
  createMany,
  find,
  findOne,
  findByID,
  countDocuments,
  bulkWrite,
  findOneAndUpdate,
  findOneAndUpdateArray,
  findOneAndUpsert,
  updateMany,
  findOneAndDelete,
  deleteMany,
  aggregate,
  distinct,
};
