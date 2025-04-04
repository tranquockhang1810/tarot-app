import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Alert } from "react-native";
import { io, Socket } from "socket.io-client";
import { useAuth } from "../auth/useAuth";
import { MessageContextType } from "./MessageContextType";
import { MessageResponseModel } from "@/src/api/features/history/models/MessageModel";

// ⚡ URL socket server
const SOCKET_URL = process.env.EXPO_PUBLIC_SERVER_ENDPOINT;

// Tạo Context
const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<MessageResponseModel[] | undefined>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isNewMessage, setIsNewMessage] = useState<boolean>(false);

  useEffect(() => {
    if (!user?._id) return;

    const newSocket = io(SOCKET_URL, { transports: ["websocket"] });

    newSocket.on("connect", () => {
      console.log("✅ Connected to socket");
      setIsConnected(true);
      newSocket.emit("registerUser", user._id);
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Disconnected from socket");
      setIsConnected(false);
    });

    newSocket.on("newMessage", (message: MessageResponseModel) => {
      setIsNewMessage((prev) => !prev);
      setMessages((prev) => [message, ...prev || []]);
    });

    newSocket.on("replaceMessage", ({ oldId, newMessage }) => {
      setIsNewMessage((prev) => !prev);
      setMessages((prev) =>
        prev && prev.map((msg) => (msg._id === oldId ? newMessage : msg))
      );
    });

    newSocket.on("errorMessage", (error: { message: string }) => {
      console.error("🚨 Socket Error:", error);
      Alert.alert("Error", error.message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user?._id]);

  const sendMessage = useCallback(
    (chatID: string, message: string) => {
      if (!socket || !isConnected) {
        Alert.alert("Error", "Not connected to chat server.");
        return;
      }
      socket.emit("sendMessage", { userID: user?._id, chatID, message });
    },
    [socket, isConnected, user?._id]
  );

  const updateMessageSeen = useCallback(
    (chatId: string) => {
      if (!socket || !isConnected) {
        Alert.alert("Error", "Not connected to chat server.");
        return;
      }
      socket.emit("seenMessages", { chatId });
    },
    [socket, isConnected]
  );

  return (
    <MessageContext.Provider
      value={{ messages, setMessages, sendMessage, isConnected, updateMessageSeen, isNewMessage }}
    >
      {children}
    </MessageContext.Provider>
  );
};

// Hook để dùng MessageContext
export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};
