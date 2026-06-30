import React, { useState } from "react";
import { ScrollView } from "react-native";

import AppContainer from "../../components/ui/AppContainer";
import HomeHeader from "../../components/home/HomeHeader";
import SearchBar from "../../components/home/SearchBar";
import PromotionBanner from "../../components/home/PromotionBanner";
import CategorySection from "../../components/home/CategorySection";
import PopularServiceSection from "../../components/home/PopularServiceSection";

import {
  categories,
  popularServices,
} from "../../constants/homeData";

const HomeScreen = () => {
  const [keyword, setKeyword] = useState("");
  const [services, setServices] = useState(popularServices);

  
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

        <CategorySection data={categories} />

        <PopularServiceSection
          title="Popular Services"
          data={popularServices}
        />
      </ScrollView>
    </AppContainer>
  );
};

export default HomeScreen;