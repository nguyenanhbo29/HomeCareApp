import React, { useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import AppContainer from "../../../components/common/AppContainer";
import AppText from "../../../components/common/AppText";

import HomeHeader from "../components/HomeHeader";
import SearchBar from "../components/SearchBar";
import PromotionBanner from "../components/PromotionBanner";
import CategorySection from "../components/CategorySection";
import PopularServiceSection from "../components/PopularServiceCard";
import RecommendedSection from "../components/RecommendedSection";

import useCategories from "../../../hooks/useCategories";
import useServices from "../../../hooks/useServices";
import usePopularServices from "../../../hooks/usePopularServices";
import useRecommendedServices from "../../../hooks/useRecommendedServices";
import { useAuth } from "../../../hooks/useAuth";
import { Colors } from "../../../theme";

export default function HomeScreen() {
  const router = useRouter();
  const { currentUser } = useAuth();

  const [keyword, setKeyword] = useState("");

  const { categories } = useCategories();
  const { services: allServices } = useServices();
  const { services: popularServices } = usePopularServices();
  const { services: recommendedServices } = useRecommendedServices();

  const filteredServices = allServices.filter(
    (s) =>
      s.name.toLowerCase().includes(keyword.trim().toLowerCase()) ||
      s.description?.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  return (
    <AppContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      >
        <HomeHeader userName={currentUser?.fullName || "Khách"} />

        {/* Wrapper cho SearchBar và Lớp gợi ý nổi (Floating Dropdown) */}
        <View style={styles.searchWrapper}>
          <SearchBar
            value={keyword}
            onChangeText={setKeyword}
            onClear={() => setKeyword("")}
          />

          {keyword.trim() !== "" && (
            <View style={styles.dropdownContainer}>
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <TouchableOpacity
                    key={service.id}
                    style={styles.suggestionItem}
                    activeOpacity={0.7}
                    onPress={() => {
                      setKeyword("");
                      router.push(`/service/${service.id}`);
                    }}
                  >
                    <View style={styles.suggestionIconWrapper}>
                      <Ionicons
                        name="search-outline"
                        size={16}
                        color={Colors.primary}
                      />
                    </View>
                    <View style={styles.suggestionTextContainer}>
                      <AppText style={styles.suggestionName}>
                        {service.name}
                      </AppText>
                      {service.description ? (
                        <AppText
                          style={styles.suggestionDesc}
                          numberOfLines={1}
                        >
                          {service.description}
                        </AppText>
                      ) : null}
                    </View>
                    <AppText style={styles.suggestionPrice}>
                      ${service.price}
                    </AppText>
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.emptySuggestion}>
                  <AppText style={styles.emptySuggestionText}>
                    Không tìm thấy dịch vụ phù hợp
                  </AppText>
                </View>
              )}
            </View>
          )}
        </View>

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
          title="Dịch vụ phổ biến"
          data={popularServices}
          onPressItem={(service) =>
            router.push(`/service/${service.id}`)
          }
        />

        <RecommendedSection
          title="Dành cho bạn"
          data={recommendedServices}
          onPressItem={(service) =>
            router.push(`/service/${service.id}`)
          }
        />
      </ScrollView>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  searchWrapper: {
    position: "relative",
    zIndex: 999,
  },
  dropdownContainer: {
    position: "absolute",
    top: 58,
    left: 0,
    right: 0,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    zIndex: 1000,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  suggestionIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E6F4FE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  suggestionTextContainer: {
    flex: 1,
    marginRight: 8,
  },
  suggestionName: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  suggestionDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  suggestionPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.primary,
  },
  emptySuggestion: {
    paddingVertical: 16,
    alignItems: "center",
  },
  emptySuggestionText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
