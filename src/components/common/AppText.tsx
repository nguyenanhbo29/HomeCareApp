import React from "react";
import {
  Text,
  StyleSheet,
  TextProps,
  TextStyle,
  StyleProp,
} from "react-native";

import { Colors, Typography } from "../../theme";

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export default function AppText({
  children,
  style,
  ...props
}: AppTextProps) {
  return (
    <Text
      {...props}
      style={[styles.text, style]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.textPrimary,
    fontSize: Typography.body,
  },
});