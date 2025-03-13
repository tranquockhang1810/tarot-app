export const ApiPath = {
  // Auth
  LOGIN_BY_OTP: getApiPath("auth/login-by-otp"),
  REGISTER:  getApiPath("auth/register"),
  LOGIN_FACEBOOK: getApiPath("auth/login-by-facebook"),

  //Topic
  GET_TOPICS: getApiPath("topic/list"),

  // Chat History
  GET_CHAT_LIST: getApiPath("chat/list"),

  // Chat messages
  CHAT: getApiPath("chat/detail"),
};

function getApiPath(path: string) {
  return `${process.env.EXPO_PUBLIC_SERVER_ENDPOINT!}/api/v1/${path}`;
}
function getWSPath(path: string) {
  return `${process.env.EXPO_PUBLIC_SERVER_ENDPOINT!.replace("http", "ws")!}/v1/2024/${path}`;
}
