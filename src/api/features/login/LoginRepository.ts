import { ApiPath } from "../../ApiPath";
import { BaseApiResponseModel } from "../../baseApiResponseModel/baseApiResponseModel";
import client from "../../client";
import { UserModel } from "./models/UserModel";

interface ILoginRepository {
  loginByOtp(params: { idToken: string }): Promise<BaseApiResponseModel<UserModel>>;
}

class LoginRepository implements ILoginRepository {
  async loginByOtp(params: { idToken: string }): Promise<BaseApiResponseModel<UserModel>> {
    return await client.post(ApiPath.loginByOtp, params);
  }
}

export const defaultLoginRepository = new LoginRepository();