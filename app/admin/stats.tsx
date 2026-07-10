import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AppContainer from "../../src/components/common/AppContainer";
import AppText from "../../src/components/common/AppText";
import { getAdvancedStats, AdminStats } from "../../src/services/admin.service";
import { Colors } from "../../src/theme";

export default function AdminStatsScreen() {
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await getAdvancedStats();
      setStats(data);
    } catch (err: any) {
      Alert.alert("Error", err?.response?.data?.message || "Failed to load stats details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <AppContainer>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <AppText style={styles.loadingText}>Analyzing business data...</AppText>
        </View>
      </AppContainer>
    );
  }

  // Monthly Revenue Chart helpers
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyRevenue = stats?.monthlyRevenue || Array(12).fill(0);
  const maxRevenue = Math.max(...monthlyRevenue, 1);

  // Top services helpers
  const topServices = stats?.topServices || [];
  const maxServiceCount = Math.max(...topServices.map(s => s.count), 1);

  return (
    <AppContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <AppText style={styles.title}>Business Analytics</AppText>
        </View>

        {/* Small Highlight Cards */}
        <View style={styles.highlightRow}>
          <View style={styles.highlightCard}>
            <AppText style={styles.highlightLabel}>New Customers</AppText>
            <AppText style={styles.highlightValue}>+{stats?.newCustomersCount || 0}</AppText>
            <AppText style={styles.highlightSub}>Registered this month</AppText>
          </View>
          <View style={styles.highlightCard}>
            <AppText style={styles.highlightLabel}>Avg. Order Value</AppText>
            <AppText style={styles.highlightValue}>
              ${stats && stats.totalBookings > 0 ? Math.round(stats.totalRevenue / stats.totalBookings) : 0}
            </AppText>
            <AppText style={styles.highlightSub}>Across all bookings</AppText>
          </View>
        </View>

        {/* Custom Bar Chart for Monthly Revenue */}
        <View style={styles.sectionCard}>
          <AppText style={styles.sectionTitle}>Monthly Revenue Trend ({new Date().getFullYear()})</AppText>
          <View style={styles.chartContainer}>
            <View style={styles.barsRow}>
              {monthlyRevenue.map((rev, index) => {
                const heightPercentage = (rev / maxRevenue) * 100;
                // Only display months up to current month for cleaner look, or display all
                return (
                  <View key={index} style={styles.barColumn}>
                    <View style={styles.barTrack}>
                      <View 
                        style={[
                          styles.barFill, 
                          { 
                            height: `${heightPercentage}%`,
                            backgroundColor: rev > 0 ? Colors.primary : "#E5E7EB"
                          }
                        ]} 
                      />
                    </View>
                    <AppText style={styles.monthLabel}>{months[index]}</AppText>
                  </View>
                );
              })}
            </View>
          </View>
          
          {/* Legend Details */}
          <View style={styles.revenueLegend}>
            {monthlyRevenue.map((rev, index) => {
              if (rev === 0) return null;
              return (
                <View key={index} style={styles.legendRow}>
                  <AppText style={styles.legendMonth}>{months[index]}:</AppText>
                  <AppText style={styles.legendValue}>${rev.toLocaleString()}</AppText>
                </View>
              );
            })}
          </View>
        </View>

        {/* Top Performing Services List */}
        <View style={styles.sectionCard}>
          <AppText style={styles.sectionTitle}>Top Services By Bookings</AppText>
          <View style={styles.servicesList}>
            {topServices.length === 0 ? (
              <AppText style={styles.emptyText}>No data available yet</AppText>
            ) : (
              topServices.map((service, index) => {
                const widthPercentage = (service.count / maxServiceCount) * 100;
                return (
                  <View key={index} style={styles.serviceRow}>
                    <View style={styles.serviceMetaRow}>
                      <AppText style={styles.serviceName}>{service.name}</AppText>
                      <AppText style={styles.serviceCount}>{service.count} orders</AppText>
                    </View>
                    
                    {/* Custom Progress Bar */}
                    <View style={styles.progressBarBg}>
                      <View style={[styles.progressBarFill, { width: `${widthPercentage}%` }]} />
                    </View>
                    
                    <AppText style={styles.serviceRev}>
                      Revenue: ${service.revenue.toLocaleString()}
                    </AppText>
                  </View>
                );
              })
            )}
          </View>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
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
  highlightRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  highlightCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  highlightLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: "600",
    marginBottom: 6,
  },
  highlightValue: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  highlightSub: {
    fontSize: 10,
    color: Colors.textLight,
  },
  sectionCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  chartContainer: {
    height: 160,
    justifyContent: "flex-end",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: 16,
  },
  barsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: "100%",
  },
  barColumn: {
    alignItems: "center",
    flex: 1,
  },
  barTrack: {
    height: 120,
    width: 10,
    backgroundColor: "#F3F4F6",
    borderRadius: 5,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  barFill: {
    width: "100%",
    borderRadius: 5,
  },
  monthLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginTop: 6,
    fontWeight: "600",
  },
  revenueLegend: {
    gap: 8,
  },
  legendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  legendMonth: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: "600",
  },
  legendValue: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: "700",
  },
  servicesList: {
    gap: 16,
  },
  serviceRow: {
    gap: 6,
  },
  serviceMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceName: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  serviceCount: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: "600",
  },
  progressBarBg: {
    height: 8,
    backgroundColor: "#F3F4F6",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  serviceRev: {
    fontSize: 11,
    color: Colors.textLight,
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    color: Colors.textLight,
    paddingVertical: 20,
  },
});
