import React, { useState } from "react";
import { ScrollView } from "react-native";

import AppContainer from "../../../components/common/AppContainer";
import HomeHeader from "../components/HomeHeader";
import SearchBar from "../components/SearchBar";
import PromotionBanner from "../components/PromotionBanner";
import CategorySection from "../components/CategorySection";
import PopularServiceSection from "../components/ServiceSection";

import {
  categories,
  popularServices,
  recommendedServices,
} from "../data/homeData";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const [keyword, setKeyword] = useState("");
  const [services, setServices] = useState(popularServices);
  const router = useRouter();

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
/>

<PopularServiceSection
    title="Recommended For You"
    data={recommendedServices}
/>
      </ScrollView>
    </AppContainer>
  );
};

export default HomeScreen;