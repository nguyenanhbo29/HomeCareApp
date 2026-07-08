import React from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import AppContainer from "../../../components/common/AppContainer";

import useBookingDetail from "../../../hooks/useBookingDetail";

import useCancelBooking from "../../../hooks/useCancelBooking";

export default function BookingDetailScreen() {
  const router = useRouter();

  const { id } =
    useLocalSearchParams<{
      id: string;
    }>();

  const {
    booking,
    loading,
    error,
  } = useBookingDetail(id);

  const {
  cancelBooking,
  loading: cancelling,
} = useCancelBooking();

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

  if (error || !booking) {
    return (
      <AppContainer>
        <View style={styles.center}>
          <Text style={styles.error}>
            {error ??
              "Booking not found"}
          </Text>
        </View>
      </AppContainer>
    );
  }

  const statusColor = {
    Pending: "#F59E0B",
    Confirmed: "#3B82F6",
    Completed: "#10B981",
    Cancelled: "#EF4444",
  }[booking.status];

  async function handleCancelBooking() {
  Alert.alert(
    "Cancel Booking",
    "Are you sure you want to cancel this booking?",
    [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          try {
            await cancelBooking(
              booking!._id
            );

            Alert.alert(
              "Success",
              "Booking has been cancelled.",
              [
                {
                  text: "OK",
                  onPress: () => {
                    router.replace(
                      "/"
                    );
                  },
                },
              ]
            );
          } catch (error: any) {
            console.log(error);

            Alert.alert(
              "Error",
              error?.response?.data
                ?.message ??
                "Failed to cancel booking."
            );
          }
        },
      },
    ]
  );
}

  return (
    <AppContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.container
        }
      >
                {/* Header */}

        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="#111827"
          />
        </TouchableOpacity>

        <Text style={styles.title}>
          Booking Detail
        </Text>

        <Text style={styles.subtitle}>
          Track your booking information
        </Text>

        {/* Service Card */}

        <View style={styles.serviceCard}>
          <Image
            source={{
              uri: booking.service.image,
            }}
            style={styles.serviceImage}
          />

          <View
            style={styles.serviceContent}
          >
            <Text
              style={styles.serviceName}
            >
              {booking.service.name}
            </Text>

            <Text
              style={
                styles.serviceDuration
              }
            >
              {booking.service.duration}
            </Text>

            <Text
              style={styles.servicePrice}
            >
              ₫
              {booking.totalPrice.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Status */}

        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                statusColor,
            },
          ]}
        >
          <Text
            style={styles.statusText}
          >
            {booking.status}
          </Text>
        </View>

        {/* Booking Information */}

        <View style={styles.card}>
          <Text
            style={styles.cardTitle}
          >
            Booking Information
          </Text>

          <View style={styles.row}>
            <Text
              style={styles.label}
            >
              Date
            </Text>

            <Text
              style={styles.value}
            >
              {new Date(
                booking.bookingDate
              ).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.row}>
            <Text
              style={styles.label}
            >
              Time
            </Text>

            <Text
              style={styles.value}
            >
              {booking.bookingTime}
            </Text>
          </View>

          <View style={styles.row}>
            <Text
              style={styles.label}
            >
              Duration
            </Text>

            <Text
              style={styles.value}
            >
              {
                booking.service
                  .duration
              }
            </Text>
          </View>
        </View>

        {/* Address */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Service Address
          </Text>

          <Text style={styles.address}>
            {booking.address}
          </Text>
        </View>

        {/* Note */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Note
          </Text>

          <Text style={styles.note}>
            {booking.note?.trim()
              ? booking.note
              : "No note"}
          </Text>
        </View>

        {/* Payment */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Payment
          </Text>

          <View style={styles.row}>
            <Text style={styles.label}>
              Total Price
            </Text>

            <Text style={styles.price}>
              ₫
              {booking.totalPrice.toLocaleString()}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Payment Status
            </Text>

            <View
              style={[
                styles.paymentBadge,
                {
                  backgroundColor:
                    booking.paymentStatus ===
                    "Paid"
                      ? "#10B981"
                      : "#EF4444",
                },
              ]}
            >
              <Text
                style={
                  styles.paymentText
                }
              >
                {booking.paymentStatus}
              </Text>
            </View>
          </View>
        </View>

        {/* Cancel Button */}

        {booking.status ===
          "Pending" && (
          <TouchableOpacity
            style={
              styles.cancelButton
            }
            activeOpacity={0.85}
           onPress={handleCancelBooking}
            disabled={cancelling}
          >
            <Ionicons
              name="close-circle"
              size={20}
              color="#FFFFFF"
            />

            <Text
              style={
                styles.cancelText
              }
            >
              Cancel Booking
            </Text>
          </TouchableOpacity>
        )}

      </ScrollView>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  error: {
    fontSize: 16,
    color: "#EF4444",
    fontWeight: "600",
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F3F4F6",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    marginTop: 6,
    marginBottom: 25,
  },

  serviceCard: {
    flexDirection: "row",

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    padding: 16,

    marginBottom: 18,

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 10,

    elevation: 3,
  },

  serviceImage: {
    width: 90,
    height: 90,

    borderRadius: 16,
  },

  serviceContent: {
    flex: 1,

    marginLeft: 15,

    justifyContent: "space-between",
  },

  serviceName: {
    fontSize: 20,

    fontWeight: "700",

    color: "#111827",
  },

  serviceDuration: {
    fontSize: 15,

    color: "#6B7280",
  },

  servicePrice: {
    fontSize: 22,

    fontWeight: "700",

    color: "#6C4CF1",
  },

  statusBadge: {
    alignSelf: "flex-start",

    paddingHorizontal: 18,

    paddingVertical: 8,

    borderRadius: 20,

    marginBottom: 22,
  },

  statusText: {
    color: "#FFFFFF",

    fontWeight: "700",

    fontSize: 14,
  },

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    padding: 18,

    marginBottom: 18,

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 10,

    elevation: 3,
  },

  cardTitle: {
    fontSize: 18,

    fontWeight: "700",

    color: "#111827",

    marginBottom: 16,
  },

  row: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 14,
  },

  label: {
    fontSize: 15,

    color: "#6B7280",
  },

  value: {
    fontSize: 15,

    fontWeight: "600",

    color: "#111827",
  },

  address: {
    fontSize: 16,

    color: "#111827",

    lineHeight: 24,
  },

  note: {
    fontSize: 16,

    color: "#111827",

    lineHeight: 24,
  },

  price: {
    fontSize: 18,

    fontWeight: "700",

    color: "#6C4CF1",
  },

  paymentBadge: {
    paddingHorizontal: 14,

    paddingVertical: 6,

    borderRadius: 18,
  },

  paymentText: {
    color: "#FFFFFF",

    fontWeight: "700",
  },

  cancelButton: {
    height: 58,

    borderRadius: 30,

    backgroundColor: "#EF4444",

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    marginTop: 10,

    marginBottom: 35,
  },

  cancelText: {
    color: "#FFFFFF",

    fontSize: 17,

    fontWeight: "700",

    marginLeft: 10,
  },
});