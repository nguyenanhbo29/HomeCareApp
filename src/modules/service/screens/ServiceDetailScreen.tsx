import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import AppContainer from "../../../components/common/AppContainer";

import ServiceHero from "../components/ServiceHero";
import ServiceInfo from "../components/ServiceInfo";
import FeatureBadges from "../components/FeatureBadges";
import AboutSection from "../components/AboutSection";
import ReviewSection from "../components/ReviewSection";
import BottomBookingBar from "../components/BottomBookingBar";

import {
  serviceFeatures,
  serviceDescription,
  reviews,
} from "../data/serviceData";

export default function ServiceDetailScreen() {
  const router = useRouter();

  return (
    <AppContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <ServiceHero
          isFavorite={false}
          onBack={() => router.back()}
          onFavorite={() => {
            console.log("Favorite");
          }}
        />

        <ServiceInfo
          badge="Popular"
          name="House Cleaning"
          price={18}
          rating={4.9}
          reviews={1280}
          duration="2 hours"
        />

        <FeatureBadges
          data={serviceFeatures as any}
        />

        <AboutSection
          description={serviceDescription}
          onReadMore={() => {
            console.log("Read More");
          }}
        />

        <ReviewSection
          reviews={reviews}
        />
      </ScrollView>

      <BottomBookingBar
        price={18}
        onBookNow={() => {
          router.push("/booking");
        }}
      />
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 20,
  },
});