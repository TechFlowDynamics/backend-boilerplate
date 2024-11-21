import { validateRequest } from "../../../core/utils/validateRequest.utils";
import { getUserSchema } from "../schema/userValidation.schema";

export const getUserValidationFunc = (payload: any) => {
  return validateRequest(getUserSchema, payload);
};
