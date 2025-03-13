import { MessageResponseModel } from "@/src/api/features/history/models/MessageModel";

export interface MessageContextType {
  messages: MessageResponseModel[];
  setMessages: React.Dispatch<React.SetStateAction<MessageResponseModel[]>>;
  sendMessage: (chatID: string, message: string) => void;
  isConnected: boolean;
  isLoading: boolean;
  updateMessageSeen: (chatId: string) => void;
  isNewMessage: boolean;
}