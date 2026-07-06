import React from "react";
import {
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import {
  useRouter,
  useLocalSearchParams,
} from "expo-router";

import AppContainer from "../../../components/common/AppContainer";

import ServiceHero from "../components/ServiceHero";
import ServiceInfo from "../components/ServiceInfo";
import FeatureBadges from "../components/FeatureBadges";
import AboutSection from "../components/AboutSection";
import ReviewSection from "../components/ReviewSection";
import BottomBookingBar from "../components/BottomBookingBar";

import useServiceDetail from "../../../hooks/useServiceDetail";

import {
  serviceFeatures,
  reviews,
} from "../data/serviceData";

export default function ServiceDetailScreen() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const {
    service,
    loading,
  } = useServiceDetail(id);

  if (loading) {
    return (
      <AppContainer>
        <View style={styles.loading}>
          <ActivityIndicator
            size="large"
            color="#6C4CF1"
          />
        </View>
      </AppContainer>
    );
  }

  if (!service) {
    return (
      <AppContainer>
        <View style={styles.loading}>
        </View>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <ServiceHero
          image={service.image}
          isFavorite={service.isFavorite}
          onBack={() => router.back()}
          onFavorite={() => {
            console.log("Favorite");
          }}
        />

        <ServiceInfo
          badge={service.badge}
          name={service.name}
          price={service.price}
          rating={service.rating}
          reviews={service.reviews}
          duration={service.duration}
        />

        <FeatureBadges
          data={serviceFeatures as any}
        />

        <AboutSection
          description={service.description}
          onReadMore={() => {}}
        />

        <ReviewSection
          reviews={reviews}
        />
      </ScrollView>

      <BottomBookingBar
    price={service.price}
    onBookNow={() =>
        router.push({
            pathname: "/booking",
            params: {
                serviceId: service.id,
            },
        })
    }
/>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 20,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});