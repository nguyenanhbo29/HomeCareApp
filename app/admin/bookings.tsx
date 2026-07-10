import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AppContainer from "../../src/components/common/AppContainer";
import AppText from "../../src/components/common/AppText";
import { getMyBookings, updateBooking } from "../../src/services/booking.service";
import { Booking } from "../../src/modules/booking/types/booking";
import { Colors } from "../../src/theme";

export default function AdminBookings() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBookings = async () => {
    try {
      setError(null);
      const data = await getMyBookings();
      setBookings(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load bookings");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchBookings();
  };

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "Confirmed":
        return "#EBF5FF"; // Light Blue
      case "Completed":
        return "#E6F4EA"; // Light Green
      case "Cancelled":
        return "#FCE8E6"; // Light Red
      default:
        return "#F3F4F6"; // Light Gray (Pending)
    }
  };

  const getStatusTextColor = (status: Booking["status"]) => {
    switch (status) {
      case "Confirmed":
        return Colors.primary;
      case "Completed":
        return Colors.success;
      case "Cancelled":
        return Colors.error;
      default:
        return Colors.textSecondary; // Pending
    }
  };

  const handleUpdateStatus = (bookingId: string, currentStatus: Booking["status"]) => {
    Alert.alert(
      "Update Status",
      `Choose new status for this booking (Current: ${currentStatus})`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => updateStatusApi(bookingId, { status: "Confirmed" }),
        },
        {
          text: "Complete & Pay",
          onPress: () => updateStatusApi(bookingId, { status: "Completed", paymentStatus: "Paid" }),
        },
        {
          text: "Cancel Booking",
          style: "destructive",
          onPress: () => updateStatusApi(bookingId, { status: "Cancelled" }),
        },
      ],
      { cancelable: true }
    );
  };

  const updateStatusApi = async (id: string, updateData: any) => {
    try {
      setLoading(true);
      await updateBooking(id, updateData);
      Alert.alert("Success", "Booking status updated successfully.");
      fetchBookings();
    } catch (err: any) {
      Alert.alert("Error", err?.response?.data?.message || "Failed to update booking status");
      setLoading(false);
    }
  };

  const renderBookingItem = ({ item }: { item: Booking }) => {
    const userDisplay = item.user as any; // Cast user to read properties populated from backend
    const customerName = userDisplay?.fullName || "Guest Customer";
    const customerPhone = userDisplay?.phone || "No phone";
    const customerEmail = userDisplay?.email || "No email";

    return (
      <TouchableOpacity 
        style={styles.bookingCard}
        onPress={() => handleUpdateStatus(item._id, item.status)}
        activeOpacity={0.8}
      >
        <View style={styles.cardHeader}>
          <View style={styles.serviceInfo}>
            <AppText style={styles.serviceName}>{item.service?.name}</AppText>
            <AppText style={styles.bookingId}>ID: {item._id.substring(item._id.length - 8).toUpperCase()}</AppText>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <AppText style={[styles.statusText, { color: getStatusTextColor(item.status) }]}>
              {item.status}
            </AppText>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.customerInfo}>
          <View style={styles.infoRow}>
            <Ionicons name="person-outline" size={16} color={Colors.textSecondary} />
            <AppText style={styles.infoText}>{customerName}</AppText>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={16} color={Colors.textSecondary} />
            <AppText style={styles.infoText}>{customerPhone}</AppText>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={16} color={Colors.textSecondary} />
            <AppText style={styles.infoText} numberOfLines={1}>{item.address}</AppText>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.cardFooter}>
          <View style={styles.dateTime}>
            <Ionicons name="time-outline" size={16} color={Colors.textSecondary} />
            <AppText style={styles.dateTimeText}>
              {new Date(item.bookingDate).toLocaleDateString()} at {item.bookingTime}
            </AppText>
          </View>
          <AppText style={styles.price}>${item.totalPrice.toLocaleString()}</AppText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <AppContainer>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <AppText style={styles.title}>Manage Bookings</AppText>
      </View>

      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <AppText style={styles.loadingText}>Fetching bookings...</AppText>
        </View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item._id}
          renderItem={renderBookingItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="calendar-outline" size={60} color={Colors.textLight} />
              <AppText style={styles.emptyText}>No bookings found in system.</AppText>
            </View>
          }
        />
      )}
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 16,
  },
  backBtn: {
    padding: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    color: Colors.textSecondary,
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 40,
    gap: 16,
  },
  bookingCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  serviceInfo: {
    flex: 1,
    marginRight: 16,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  bookingId: {
    fontSize: 11,
    color: Colors.textLight,
    fontWeight: "600",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 12,
  },
  customerInfo: {
    gap: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 14,
    color: Colors.textPrimary,
    marginLeft: 8,
    flex: 1,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateTime: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateTimeText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 15,
    color: Colors.textSecondary,
  },
});
