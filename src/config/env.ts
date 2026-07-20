import Constants from "expo-constants";
import { Platform } from "react-native";

const getBaseUrl = () => {
  if (Platform.OS === "web") {
    return "http://localhost:5001/api";
  }

  // Tự động lấy địa chỉ IP mạng máy tính khi chạy trên Expo Go (điện thoại thật)
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const ip = hostUri.split(":")[0];
    return `http://${ip}:5001/api`;
  }

  if (Platform.OS === "android") {
    return "http://10.0.2.2:5001/api";
  }

  return "http://localhost:5001/api";
};

export const API_URL = getBaseUrl();