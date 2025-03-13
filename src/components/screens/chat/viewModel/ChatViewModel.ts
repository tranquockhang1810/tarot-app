import { ResultObject } from "@/src/api/baseApiResponseModel/baseApiResponseModel";
import { defaultChatRepo } from "@/src/api/features/chat/ChatRepo";
import { ChatRequestModel, ChatResponseModel } from "@/src/api/features/chat/models/ChatModel";
import { useAuth } from "@/src/context/auth/useAuth";
import { useMessage } from "@/src/context/socket/useMessage";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";

const ChatViewModel = (chatID: string) => {
  const { localStrings } = useAuth();
  const [resultObject, setResultObject] = useState<ResultObject | null>(null);
  const [chatsLoading, setChatsLoading] = useState<boolean>(false);
  const [chatInfo, setChatInfo] = useState<ChatResponseModel | null>(null);
  const { messages, setMessages, sendMessage, isConnected, updateMessageSeen } = useMessage();
  const [input, setInput] = useState<string>("");
  const [query, setQuery] = useState<ChatRequestModel>({
    id: chatID,
    page: 1,
    limit: 20,
  });
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const handleSend = () => {
    if (input.trim() !== "") {
      sendMessage(chatID, input);
      setInput("");
      setHasMore(true);
      setPage(1);
    }
  };

  const getChatMessages = async (query: ChatRequestModel) => {
    try {
      setChatsLoading(true);
      const res = await defaultChatRepo.getChatMessages(query);
      if (res?.code === 200 && res?.data) {
        setMessages((prev) => {
          if (query?.page === 1) return res.data?.messages || [];
          const newMessages = res.data?.messages.filter(
            (message) => !prev?.some((existingMessage) => existingMessage._id === message._id)
          );
          return prev ? [...prev, ...newMessages] : res.data?.messages;
        });
        setChatInfo(res.data);
        setPage(res?.paging?.page);
        setHasMore(res?.paging?.page < res?.paging?.totalPages);
      } else {
        setMessages([]);
        setPage(0);
        setHasMore(false);
        setChatInfo(null);
        setResultObject({
          type: "error",
          title: localStrings.Chat.GetListMessageFailed,
          content: res?.message,
        });
      }
    } catch (error: any) {
      console.error("🚨 Error:", error);
      setResultObject({
        type: "error",
        title: localStrings.GLobals.ErrorMessage,
        content: error?.message,
      });
    } finally {
      setChatsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getChatMessages(query);
    }, [query])
  );

  useEffect(() => {
    if (isConnected)
      updateMessageSeen(chatID);
  }, [chatID, isConnected]);

  const loadOlderMessages = () => {
    if (hasMore && !chatsLoading && page > 0) {
      getChatMessages({ ...query, page: page + 1 });
    }
    else return;
  };

  return {
    resultObject,
    messages,
    isConnected,
    input,
    setInput,
    handleSend,
    chatsLoading,
    loadOlderMessages,
    chatInfo,
    setMessages
  };
};

export default ChatViewModel