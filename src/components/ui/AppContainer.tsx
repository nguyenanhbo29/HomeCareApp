import React from "react";
import { SafeAreaView, StyleSheet, ViewStyle } from "react-native";

import { Colors, Spacing } from "../../theme";

interface AppContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function AppContainer({
  children,
  style,
}: AppContainerProps) {
  return (
    <SafeAreaView style={[styles.container, style]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.md,
  },
});