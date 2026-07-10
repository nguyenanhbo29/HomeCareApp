import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AppContainer from "../../src/components/common/AppContainer";
import AppText from "../../src/components/common/AppText";
import { useAuth } from "../../src/hooks/useAuth";
import { getAdminUsers, updateUserStatus, AdminUser } from "../../src/services/admin.service";
import { Colors } from "../../src/theme";

export default function AdminUsers() {
  const router = useRouter();
  const { currentUser } = useAuth();
  
  // State
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchUsers = async (searchVal?: string) => {
    try {
      const data = await getAdminUsers(searchVal);
      setUsers(data);
    } catch (err: any) {
      Alert.alert("Error", err?.response?.data?.message || "Failed to load users list");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = () => {
    setLoading(true);
    fetchUsers(searchText);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchUsers(searchText);
  };

  const handleToggleStatus = (user: AdminUser) => {
    const isBlocking = user.status === "Active";
    const nextStatus = isBlocking ? "Blocked" : "Active";

    if (currentUser?.id === user._id) {
      Alert.alert("Action Denied", "You cannot change your own account status.");
      return;
    }

    Alert.alert(
      isBlocking ? "Block User" : "Unblock User",
      `Are you sure you want to ${isBlocking ? "block" : "unblock"} ${user.fullName}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: isBlocking ? "Block" : "Unblock",
          style: isBlocking ? "destructive" : "default",
          onPress: async () => {
            try {
              setLoading(true);
              await updateUserStatus(user._id, nextStatus);
              Alert.alert("Success", `User has been ${isBlocking ? "blocked" : "unblocked"} successfully.`);
              fetchUsers(searchText);
            } catch (err: any) {
              Alert.alert("Error", err?.response?.data?.message || "Failed to change user status");
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const renderUserItem = ({ item }: { item: AdminUser }) => {
    const isSelf = currentUser?.id === item._id;
    const isBlocked = item.status === "Blocked";

    return (
      <View style={styles.userCard}>
        <View style={styles.cardHeader}>
          <View style={styles.userInfo}>
            <View style={styles.nameRow}>
              <AppText style={styles.fullName}>{item.fullName}</AppText>
              {isSelf && (
                <View style={styles.selfBadge}>
                  <AppText style={styles.selfBadgeText}>You</AppText>
                </View>
              )}
            </View>
            <AppText style={styles.emailText}>{item.email}</AppText>
            <AppText style={styles.phoneText}>
              Phone: {item.phone || "No phone"}
            </AppText>
            <AppText style={styles.roleText}>
              Role: {item.role} • Status:{" "}
              <AppText style={[styles.statusIndicator, { color: isBlocked ? Colors.error : Colors.success }]}>
                {item.status}
              </AppText>
            </AppText>
          </View>

          {/* Block/Unblock Button */}
          {!isSelf && (
            <TouchableOpacity
              style={[
                styles.statusBtn,
                isBlocked ? styles.unblockBtn : styles.blockBtn
              ]}
              onPress={() => handleToggleStatus(item)}
              activeOpacity={0.7}
            >
              <Ionicons 
                name={isBlocked ? "lock-open-outline" : "lock-closed-outline"} 
                size={18} 
                color={isBlocked ? Colors.success : Colors.error} 
              />
              <AppText style={[styles.statusBtnText, { color: isBlocked ? Colors.success : Colors.error }]}>
                {isBlocked ? "Unblock" : "Block"}
              </AppText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <AppContainer>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <AppText style={styles.title}>Manage Users</AppText>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, email or phone..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Ionicons name="search" size={20} color={Colors.surface} />
        </TouchableOpacity>
      </View>

      {/* Users List */}
      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <AppText style={styles.loadingText}>Searching users...</AppText>
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item._id}
          renderItem={renderUserItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="people-outline" size={60} color={Colors.textLight} />
              <AppText style={styles.emptyText}>No users found.</AppText>
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
  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  searchBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
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
  userCard: {
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
    alignItems: "center",
  },
  userInfo: {
    flex: 1,
    marginRight: 12,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 8,
  },
  fullName: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  selfBadge: {
    backgroundColor: "#E6F4EA",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  selfBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.success,
  },
  emailText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  phoneText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  roleText: {
    fontSize: 12,
    color: Colors.textLight,
    fontWeight: "600",
  },
  statusIndicator: {
    fontWeight: "700",
  },
  statusBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  blockBtn: {
    borderColor: "#FCE8E6",
    backgroundColor: "#FDF2F2",
  },
  unblockBtn: {
    borderColor: "#E6F4EA",
    backgroundColor: "#F3FAF5",
  },
  statusBtnText: {
    fontSize: 12,
    fontWeight: "700",
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
