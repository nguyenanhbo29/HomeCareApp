import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Colors, Radius, Spacing } from "../../theme";

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function AppCard({ children, style }: Props) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    elevation: 2,
  },
});