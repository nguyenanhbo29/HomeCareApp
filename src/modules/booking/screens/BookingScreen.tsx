import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import AppContainer from "../../../components/common/AppContainer";

import BookingHeader from "../components/BookingHeader";
import ServiceSelector from "../components/ServiceSelector";
import DateSelector from "../components/DateSelector";
import TimeSelector from "../components/TimeSelector";
import AddressInput from "../components/AddressInput";
import NoteInput from "../components/NoteInput";
import BookingSummary from "../components/BookingSummary";
import ConfirmBookingButton from "../components/ConfirmBookingButton";

import useServices from "../../../hooks/useServices";
import useServiceDetail from "../../../hooks/useServiceDetail";
import useBooking from "../../../hooks/useBooking";

import {
  bookingDates,
  generateBookingTimes,
} from "../data/bookingData";

export default function BookingScreen() {
  const router = useRouter();

  const { serviceId } = useLocalSearchParams<{
    serviceId: string;
  }>();

  const { services } = useServices();

  const {
    book,
    loading: bookingLoading,
  } = useBooking();

  const [selectedServiceId, setSelectedServiceId] =
    useState("");

  const {
    service,
    loading,
  } = useServiceDetail(selectedServiceId);

  const [selectedDate, setSelectedDate] =
    useState(bookingDates[0]?.id || "");

  const [selectedTime, setSelectedTime] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [note, setNote] =
    useState("");

  const timesData = generateBookingTimes(selectedDate);


  useEffect(() => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
  }, [serviceId]);

  async function handleBooking() {
    if (!selectedServiceId) {
      Alert.alert(
        "Missing Service",
        "Please select a service."
      );
      return;
    }

    if (!selectedDate) {
      Alert.alert(
        "Missing Date",
        "Please choose a booking date."
      );
      return;
    }

    if (!selectedTime) {
      Alert.alert(
        "Missing Time",
        "Please choose a booking time."
      );
      return;
    }

    if (!address.trim()) {
      Alert.alert(
        "Missing Address",
        "Please enter your address."
      );
      return;
    }

    if (!service) {
      Alert.alert(
        "Service Not Found",
        "Please try again."
      );
      return;
    }

    try {
      await book({
        service: selectedServiceId,
        bookingDate: selectedDate,
        bookingTime: selectedTime,
        address,
        note,
        totalPrice: service.price,
      });

      setSelectedDate("");
      setSelectedTime("");
      setAddress("");
      setNote("");

      Alert.alert(
        "🎉 Booking Confirmed",
        `${service.name}

📅 ${selectedDate}
🕒 ${selectedTime}

Your booking has been created successfully.`,
        [
          {
            text: "Continue Booking",
            style: "cancel",
          },
          {
            text: "View My Bookings",
            onPress: () => {
              router.replace("/(tabs)/booking");
            },
          },
        ]
      );
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        "Booking Failed",
        error?.response?.data?.message ??
          "Unable to create booking. Please try again."
      );
    }
  }

  return (
    <AppContainer>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : "height"
        }
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={styles.container}
        >
          <BookingHeader />

          <ServiceSelector
            services={services}
            selectedServiceId={selectedServiceId}
            onChange={setSelectedServiceId}
          />

          <DateSelector
            data={bookingDates}
            selected={selectedDate}
            onSelect={setSelectedDate}
          />

          <TimeSelector
            data={timesData}
            selected={selectedTime}
            onSelect={setSelectedTime}
          />

          <AddressInput
            value={address}
            onChangeText={setAddress}
          />

          <NoteInput
            value={note}
            onChangeText={setNote}
          />

          {!loading && service && (
            <BookingSummary
              service={service.name}
              duration={service.duration}
              rate={service.price}
            />
          )}

          <ConfirmBookingButton
            loading={bookingLoading}
            onPress={handleBooking}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    paddingBottom: 80,
  },
});