import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AppContainer from "../../src/components/common/AppContainer";
import AppText from "../../src/components/common/AppText";
import { useAuth } from "../../src/hooks/useAuth";
import { getMyBookings } from "../../src/services/booking.service";
import { Booking } from "../../src/modules/booking/types/booking";
import { Colors } from "../../src/theme";

export default function AdminDashboard() {
  const router = useRouter();
  const { currentUser, signOut } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMyBookings();
      setBookings(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load admin stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Calculate statistics
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === "Pending").length;
  const totalRevenue = bookings
    .filter((b) => b.status === "Completed" || b.paymentStatus === "Paid")
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/login");
    } catch (error: any) {
      console.error("Logout failed", error);
    }
  };

  if (loading) {
    return (
      <AppContainer>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <AppText style={styles.loadingText}>Loading statistics...</AppText>
        </View>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        {/* Top Header */}
        <View style={styles.header}>
          <View>
            <AppText style={styles.welcomeText}>Hello Admin,</AppText>
            <AppText style={styles.adminName}>{currentUser?.fullName || "Administrator"}</AppText>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color={Colors.error} />
          </TouchableOpacity>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          {/* Stats Card 1: Revenue */}
          <View style={[styles.statsCard, { borderLeftColor: Colors.success }]}>
            <View style={[styles.iconWrapper, { backgroundColor: "#E6F4EA" }]}>
              <Ionicons name="cash-outline" size={24} color={Colors.success} />
            </View>
            <View style={styles.statsInfo}>
              <AppText style={styles.statsLabel}>Total Revenue</AppText>
              <AppText style={styles.statsValue}>
                ${totalRevenue.toLocaleString()}
              </AppText>
            </View>
          </View>

          {/* Stats Card 2: Bookings */}
          <View style={[styles.statsCard, { borderLeftColor: Colors.primary }]}>
            <View style={[styles.iconWrapper, { backgroundColor: "#EBF5FF" }]}>
              <Ionicons name="calendar-outline" size={24} color={Colors.primary} />
            </View>
            <View style={styles.statsInfo}>
              <AppText style={styles.statsLabel}>Total Bookings</AppText>
              <AppText style={styles.statsValue}>{totalBookings}</AppText>
            </View>
          </View>

          {/* Stats Card 3: Pending */}
          <View style={[styles.statsCard, { borderLeftColor: Colors.warning }]}>
            <View style={[styles.iconWrapper, { backgroundColor: "#FFFDEB" }]}>
              <Ionicons name="time-outline" size={24} color={Colors.warning} />
            </View>
            <View style={styles.statsInfo}>
              <AppText style={styles.statsLabel}>Pending Approval</AppText>
              <AppText style={styles.statsValue}>{pendingBookings}</AppText>
            </View>
          </View>
        </View>

        {/* Action Controls */}
        <View style={styles.actionsContainer}>
          <AppText style={styles.sectionTitle}>Admin Actions</AppText>
          
          <TouchableOpacity 
            style={styles.actionBtn}
            onPress={() => router.push("/admin/bookings")}
            activeOpacity={0.8}
          >
            <View style={styles.actionBtnLeft}>
              <View style={[styles.actionIconBg, { backgroundColor: "#F5F3FF" }]}>
                <Ionicons name="list-circle-outline" size={26} color="#6C4CF1" />
              </View>
              <View>
                <AppText style={styles.actionBtnTitle}>Manage Bookings</AppText>
                <AppText style={styles.actionBtnSub}>Approve, complete, or cancel bookings</AppText>
              </View>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color={Colors.textLight} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionBtn, { marginTop: 12 }]}
            onPress={() => router.replace("/(tabs)/home")}
            activeOpacity={0.8}
          >
            <View style={styles.actionBtnLeft}>
              <View style={[styles.actionIconBg, { backgroundColor: "#EBF5FF" }]}>
                <Ionicons name="phone-portrait-outline" size={24} color={Colors.primary} />
              </View>
              <View>
                <AppText style={styles.actionBtnTitle}>Back to Customer App</AppText>
                <AppText style={styles.actionBtnSub}>View system as a normal customer</AppText>
              </View>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color={Colors.textLight} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    paddingTop: 16,
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },
  welcomeText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  adminName: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  logoutButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFEBEB",
    justifyContent: "center",
    alignItems: "center",
  },
  statsContainer: {
    gap: 16,
    marginBottom: 28,
  },
  statsCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 6,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  statsInfo: {
    flex: 1,
  },
  statsLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  statsValue: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  actionsContainer: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionBtnLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  actionIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  actionBtnTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  actionBtnSub: {
    fontSize: 12,
    color: Colors.textLight,
  },
});
