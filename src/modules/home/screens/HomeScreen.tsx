import React, { useState } from "react";
import { ScrollView } from "react-native";
import { useRouter } from "expo-router";

import AppContainer from "../../../components/common/AppContainer";

import HomeHeader from "../components/HomeHeader";
import SearchBar from "../components/SearchBar";
import PromotionBanner from "../components/PromotionBanner";
import CategorySection from "../components/CategorySection";
import PopularServiceSection from "../components/PopularServiceCard";
import RecommendedSection from "../components/RecommendedSection";

import useCategories from "../../../hooks/useCategories";

import {
  popularServices,
  recommendedServices,
} from "../data/homeData";

export default function HomeScreen() {
  const router = useRouter();

  const [keyword, setKeyword] = useState("");

  const {
    categories,
    loading,
  } = useCategories();


  return (
    <AppContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      >
        <HomeHeader userName="Nguyen" />

        <SearchBar
          value={keyword}
          onChangeText={setKeyword}
        />

        <PromotionBanner />

        <CategorySection
          data={categories}
          onPressCategory={(category) =>
            router.push({
              pathname: "/service",
              params: {
                category: category.id,
              },
            })
          }
        />

        <PopularServiceSection
          title="Popular Services"
          data={popularServices}
          onPressItem={(service) =>
            router.push(`/service/${service.id}`)
          }
        />

        <RecommendedSection
          title="Recommended For You"
          data={recommendedServices}
          onPressItem={(service) =>
            router.push(`/service/${service.id}`)
          }
        />
      </ScrollView>
    </AppContainer>
  );
}