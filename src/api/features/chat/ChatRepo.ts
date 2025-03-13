import { ChatRequestModel, ChatResponseModel } from "./models/ChatModel";
import { BaseApiResponseModel } from '../../baseApiResponseModel/baseApiResponseModel';
import client from "../../client";
import { ApiPath } from "../../ApiPath";

interface ChatRepo {
  getChatMessages: (params: ChatRequestModel) => Promise<BaseApiResponseModel<ChatResponseModel>>;
}

class ChatRepoImpl implements ChatRepo {
  async getChatMessages(params: ChatRequestModel): Promise<BaseApiResponseModel<ChatResponseModel>> {
    return await client.get(ApiPath.CHAT, params);
  }
}

export const defaultChatRepo = new ChatRepoImpl();