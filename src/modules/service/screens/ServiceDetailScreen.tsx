import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import AppContainer from "../../../components/common/AppContainer";

export default function ServiceDetailScreen() {
  return (
    <AppContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
      </ScrollView>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
});