import { RefreshTokenInterface } from "../../core/interface/auth.interface";
import { refreshTokenModel } from "../models";

export const createRefresehToken = async (body: RefreshTokenInterface) => {
  return await refreshTokenModel.create(body);
};

export const findToken = async (
  filter: RefreshTokenInterface,
): Promise<RefreshTokenInterface> => {
  const data = await refreshTokenModel.findOne({
    ...filter,
  });
  const response: RefreshTokenInterface = {
    hash: data?.hash as string,
  };
  return response;
};

export default {
  createRefresehToken,
  findToken,
};
