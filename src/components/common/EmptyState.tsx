import { View } from "react-native";
import AppText from "./AppText";

interface Props {
  message: string;
}

export default function EmptyState({ message }: Props) {
  return (
    <View
      style={{
        padding: 32,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AppText>{message}</AppText>
    </View>
  );
}