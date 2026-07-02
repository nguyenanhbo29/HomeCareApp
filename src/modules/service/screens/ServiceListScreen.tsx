import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import AppContainer from "../../../components/common/AppContainer";
import ServiceHeader from "../components/ServiceHeader";
import ServiceCard from "../components/ServiceCard";
import { services } from "../data/serviceData";


export default function ServiceListScreen() {
  return (
    <AppContainer>
      <ServiceHeader title="Cleaning Services" />

      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ServiceCard
            {...item}
            onPress={() => {
              console.log(item.name);
            }}
          />
        )}
      />
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 30,
  },
});