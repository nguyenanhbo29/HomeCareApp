import React, {
  useMemo,
  useState,
} from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

import AppContainer from "../../../components/common/AppContainer";

import BookingHeader from "../components/BookingHeader";
import BookingCard from "../components/BookingCard";
import BookingStatusTabs, {
  BookingFilter,
} from "../components/BookingStatusTabs";

import useBookings from "../../../hooks/useBookings";

export default function BookingHistoryScreen() {
  const router = useRouter();

  const {
    bookings,
    loading,
    error,
    refresh,
  } = useBookings();

  const [selectedStatus, setSelectedStatus] =
    useState<BookingFilter>("All");

  const filteredBookings =
    useMemo(() => {
      if (selectedStatus === "All") {
        return bookings;
      }

      return bookings.filter(
        (booking) =>
          booking.status ===
          selectedStatus
      );
    }, [bookings, selectedStatus]);

  if (loading) {
    return (
      <AppContainer>
        <View style={styles.center}>
          <ActivityIndicator
            size="large"
            color="#6C4CF1"
          />
        </View>
      </AppContainer>
    );
  }

  if (error) {
    return (
      <AppContainer>
        <View style={styles.center}>
          <Text>{error}</Text>
        </View>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <FlatList
        data={filteredBookings}
        keyExtractor={(item) => item._id}
        refreshing={loading}
        onRefresh={refresh}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <BookingHeader />

            <BookingStatusTabs
              selected={selectedStatus}
              onChange={
                setSelectedStatus
              }
            />
          </>
        }
        renderItem={({ item }) => (
          <BookingCard
            item={item}
            onPress={() =>
              router.push({
                pathname:
                  "/booking/detail",
                params: {
                  id: item._id,
                },
              })
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text
              style={styles.emptyTitle}
            >
              No Bookings
            </Text>

            <Text
              style={styles.emptySub}
            >
              Your bookings will
              appear here.
            </Text>
          </View>
        }
      />
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 30,
  },

  center: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",
  },

  empty: {
    marginTop: 80,

    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 22,

    fontWeight: "700",

    color: "#111827",
  },

  emptySub: {
    marginTop: 8,

    fontSize: 15,

    color: "#6B7280",
  },
});