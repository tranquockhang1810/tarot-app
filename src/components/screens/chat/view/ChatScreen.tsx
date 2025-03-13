import React, { useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Screen from "@/src/components/layout/Screen";
import { useAuth } from "@/src/context/auth/useAuth";
import useColor from "@/src/hooks/useColor";
import { Button } from "@ant-design/react-native";
import MyInput from "@/src/components/foundation/MyInput";
import { router } from "expo-router";
import ChatViewModel from "../viewModel/ChatViewModel";
import { showToast } from "@/src/utils/helper/SendMessage";
import { Image } from "expo-image";
import { GetRemainingDay } from "@/src/utils/helper/DateTransfer";

const ChatScreen = ({ id }: { id: string | string[] }) => {
  const { localStrings, language } = useAuth();
  const { brandPrimary, brandPrimaryTap } = useColor();
  const chatID = Array.isArray(id) ? id[0] : id;
  const {
    resultObject,
    messages, isConnected,
    input, setInput,
    handleSend,
    chatsLoading,
    loadOlderMessages,
    chatInfo,
    setMessages
  } = ChatViewModel(chatID);

  const header = () => {
    const { createdDate, remainingDays } = GetRemainingDay(chatInfo?.createdAt);
    return (
      <View style={{ flexDirection: "row", alignItems: "center", minHeight: 40 }}>
        <TouchableOpacity style={{ height: 30 }} onPress={() => router?.back()} >
          <MaterialIcons name="arrow-back-ios" size={24} color="white" />
        </TouchableOpacity>
        {!chatInfo ? null : (
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1, justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={{ uri: chatInfo?.topic?.image }} style={{ width: 50, height: 50, borderRadius: 50 }} />
              <View style={{ flexDirection: "column", justifyContent: "space-between", marginLeft: 10 }}>
                <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>{createdDate}</Text>
                <Text style={{ color: "white", opacity: 0.6, fontSize: 12 }}>
                  {localStrings?.GLobals?.Remain} {remainingDays} {localStrings.GLobals.Day.toLowerCase() + (remainingDays > 1 && language === 'en' ? 's' : '')}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={{ height: 30 }}>
              <MaterialIcons name="menu" size={30} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  };

  useEffect(() => {
    if (resultObject?.type) {
      showToast({
        type: resultObject?.type,
        title: resultObject?.title,
        content: resultObject?.content
      });
    }
  }, [resultObject]);


  return (
    <Screen header={header}>
      <FlatList
        data={messages}
        style={{ marginBottom: 80, paddingHorizontal: 10 }}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Text style={[styles.message, item.senderType === "user" ? styles.userMessage : styles.aiMessage]}>
            {item.message}
          </Text>
        )}
        inverted
        ListHeaderComponent={chatsLoading ? <ActivityIndicator size="small" color="white" /> : null}
        onEndReached={loadOlderMessages}
        onEndReachedThreshold={0.1}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ ...styles.inputContainer, backgroundColor: brandPrimaryTap }}
      >
        <View style={{ ...styles.inputWrapper, backgroundColor: brandPrimaryTap }}>
          <MyInput
            style={styles.textInput}
            value={input}
            onChangeText={setInput}
            placeholder={localStrings.Chat.EnterMessage}
            placeholderTextColor={"#fff"}
            inputStyle={{ color: "white" }}
            multiline
            variant="borderless"
          />
          {isConnected && input.trim() !== "" && (
            <TouchableOpacity
              style={{ ...styles.sendButton }}
              onPress={handleSend}
            >
              <MaterialIcons
                name="send"
                size={20}
                color={"white"}
              />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  message: {
    padding: 10,
    marginVertical: 4,
    borderRadius: 8,
    maxWidth: "75%",
    alignSelf: "flex-start",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
    elevation: 2,
  },
  userMessage: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },
  aiMessage: {
    backgroundColor: "#EEE",
    alignSelf: "flex-start",
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  sendButton: {
    marginLeft: 10,
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatScreen;
