export const ApiPath = {
  // Auth
  LOGIN_BY_OTP: getApiPath("auth/login-by-otp"),
  REGISTER:  getApiPath("auth/register"),
  LOGIN_FACEBOOK: getApiPath("auth/login-by-facebook"),

  //Topic
  GET_TOPICS: getApiPath("topic/list"),

  // Card
  GET_RANDOM_CARDS: getApiPath("card/random"),

  // Chat History
  GET_CHAT_LIST: getApiPath("chat/list"),
  CREATE_CHAT: getApiPath("chat/create"),
  DELETE_CHAT: getApiPath("chat/delete"),
  UPDATE_CARDS: getApiPath("chat/update-cards"),

  // Chat messages
  CHAT: getApiPath("chat/detail"),

  //Horoscope
  GET_HOROSCOPE: getApiPath("horoscope/user"),
  GET_HOROSCOPE_DETAIL: getApiPath("horoscope/daily"),
};

function getApiPath(path: string) {
  return `${process.env.EXPO_PUBLIC_SERVER_ENDPOINT!}/api/v1/${path}`;
}
function getWSPath(path: string) {
  return `${process.env.EXPO_PUBLIC_SERVER_ENDPOINT!.replace("http", "ws")!}/v1/2024/${path}`;
}
