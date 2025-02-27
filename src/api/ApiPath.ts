export const ApiPath = {
  // Auth
  loginByOtp: getApiPath("auth/login-by-otp"),
};

function getApiPath(path: string) {
  return `${process.env.EXPO_PUBLIC_SERVER_ENDPOINT!}/api/v1/${path}`;
}
function getWSPath(path: string) {
  return `${process.env.EXPO_PUBLIC_SERVER_ENDPOINT!.replace("http", "ws")!}/v1/2024/${path}`;
}
