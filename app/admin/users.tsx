import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert, TextInput, Modal, ScrollView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AppContainer from "../../src/components/common/AppContainer";
import AppText from "../../src/components/common/AppText";
import { useAuth } from "../../src/hooks/useAuth";
import { getAdminUsers, updateUserStatus, updateUserRole, AdminUser } from "../../src/services/admin.service";
import { Colors } from "../../src/theme";

export default function AdminUsers() {
  const router = useRouter();
  const { currentUser } = useAuth();
  
  // State
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // Detail Modal State
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  const fetchUsers = async (searchVal?: string) => {
    try {
      const data = await getAdminUsers(searchVal);
      setUsers(data);
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to load users list";
      if (Platform.OS === "web") window.alert(msg);
      else Alert.alert("Error", msg);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    fetchUsers(text);
  };

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
      const msg = "Bạn không thể tự khóa tài khoản của chính mình.";
      if (Platform.OS === "web") window.alert(msg);
      else Alert.alert("Từ chối thao tác", msg);
      return;
    }

    const doToggle = async () => {
      try {
        setLoading(true);
        await updateUserStatus(user._id, nextStatus);
        const msg = `Tài khoản ${user.fullName} đã được ${isBlocking ? "Khóa" : "Mở khóa"}.`;
        if (Platform.OS === "web") window.alert(msg);
        else Alert.alert("Thành công", msg);
        if (selectedUser?._id === user._id) {
          setSelectedUser({ ...selectedUser, status: nextStatus });
        }
        fetchUsers(searchText);
      } catch (err: any) {
        const errMsg = err?.response?.data?.message || "Không thể cập nhật trạng thái";
        if (Platform.OS === "web") window.alert("Lỗi: " + errMsg);
        else Alert.alert("Lỗi", errMsg);
        setLoading(false);
      }
    };

    if (Platform.OS === "web") {
      if (window.confirm(`Bạn có chắc muốn ${isBlocking ? "khóa" : "mở khóa"} người dùng ${user.fullName}?`)) {
        doToggle();
      }
    } else {
      Alert.alert(
        isBlocking ? "Khóa tài khoản" : "Mở khóa tài khoản",
        `Bạn có chắc muốn ${isBlocking ? "khóa" : "mở khóa"} ${user.fullName}?`,
        [
          { text: "Hủy", style: "cancel" },
          {
            text: isBlocking ? "Khóa" : "Mở khóa",
            style: isBlocking ? "destructive" : "default",
            onPress: doToggle,
          },
        ]
      );
    }
  };

  const handleToggleRole = (user: AdminUser) => {
    if (currentUser?.id === user._id) {
      const msg = "Bạn không thể tự thay đổi vai trò của chính mình.";
      if (Platform.OS === "web") window.alert(msg);
      else Alert.alert("Từ chối thao tác", msg);
      return;
    }

    const newRole = user.role === "Admin" ? "Customer" : "Admin";

    const doChangeRole = async () => {
      try {
        setLoading(true);
        await updateUserRole(user._id, newRole);
        const msg = `Đã đổi vai trò của ${user.fullName} thành ${newRole}.`;
        if (Platform.OS === "web") window.alert(msg);
        else Alert.alert("Thành công", msg);
        if (selectedUser?._id === user._id) {
          setSelectedUser({ ...selectedUser, role: newRole });
        }
        fetchUsers(searchText);
      } catch (err: any) {
        const errMsg = err?.response?.data?.message || "Không thể đổi vai trò";
        if (Platform.OS === "web") window.alert("Lỗi: " + errMsg);
        else Alert.alert("Lỗi", errMsg);
        setLoading(false);
      }
    };

    if (Platform.OS === "web") {
      if (window.confirm(`Xác nhận đổi vai trò của ${user.fullName} sang ${newRole}?`)) {
        doChangeRole();
      }
    } else {
      Alert.alert(
        "Đổi vai trò",
        `Xác nhận đổi vai trò của ${user.fullName} sang ${newRole}?`,
        [
          { text: "Hủy", style: "cancel" },
          { text: "Đổi vai trò", onPress: doChangeRole },
        ]
      );
    }
  };

  const openDetailModal = (user: AdminUser) => {
    setSelectedUser(user);
    setDetailModalVisible(true);
  };

  const renderUserItem = ({ item }: { item: AdminUser }) => {
    const isSelf = currentUser?.id === item._id;
    const isBlocked = item.status === "Blocked";

    return (
      <TouchableOpacity
        style={styles.userCard}
        activeOpacity={0.9}
        onPress={() => openDetailModal(item)}
      >
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
              Role: <AppText style={{ fontWeight: "700", color: item.role === "Admin" ? Colors.primary : Colors.textPrimary }}>{item.role}</AppText> • Status:{" "}
              <AppText style={[styles.statusIndicator, { color: isBlocked ? Colors.error : Colors.success }]}>
                {item.status}
              </AppText>
            </AppText>
          </View>
        </View>

        {/* Action Bar */}
        <View style={styles.actionsRow}>
          {/* Detail Button */}
          <TouchableOpacity
            style={styles.actionItemBtn}
            onPress={() => openDetailModal(item)}
            activeOpacity={0.7}
          >
            <Ionicons name="eye-outline" size={16} color={Colors.primary} />
            <AppText style={[styles.actionBtnLabel, { color: Colors.primary }]}>Chi tiết</AppText>
          </TouchableOpacity>

          {/* Block/Unblock Button */}
          {!isSelf && (
            <TouchableOpacity
              style={[
                styles.statusBtn,
                isBlocked ? styles.unblockBtn : styles.blockBtn
              ]}
              onPress={(e) => {
                e.stopPropagation?.();
                handleToggleStatus(item);
              }}
              activeOpacity={0.7}
            >
              <Ionicons 
                name={isBlocked ? "lock-open-outline" : "lock-closed-outline"} 
                size={16} 
                color={isBlocked ? Colors.success : Colors.error} 
              />
              <AppText style={[styles.statusBtnText, { color: isBlocked ? Colors.success : Colors.error }]}>
                {isBlocked ? "Unblock" : "Block"}
              </AppText>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
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
        <View style={styles.searchInputWrapper}>
          <Ionicons name="search-outline" size={20} color={Colors.textLight} style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, email or phone..."
            value={searchText}
            onChangeText={handleSearchChange}
            placeholderTextColor={Colors.textLight}
            returnKeyType="search"
          />
          {searchText.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearchText("");
                fetchUsers("");
              }}
              style={{ padding: 4 }}
            >
              <Ionicons name="close-circle" size={18} color={Colors.textLight} />
            </TouchableOpacity>
          )}
        </View>
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

      {/* Detail User Modal */}
      <Modal visible={detailModalVisible} animationType="slide" transparent={true} onRequestClose={() => setDetailModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <AppText style={styles.modalTitle}>Chi tiết người dùng</AppText>
              <TouchableOpacity onPress={() => setDetailModalVisible(false)}>
                <Ionicons name="close" size={24} color={Colors.textPrimary} />
              </TouchableOpacity>
            </View>

            {selectedUser && (
              <ScrollView contentContainerStyle={styles.modalBody} showsVerticalScrollIndicator={false}>
                {/* Avatar Icon */}
                <View style={styles.modalAvatarCircle}>
                  <Ionicons name="person" size={40} color={Colors.primary} />
                </View>

                <AppText style={styles.modalFullName}>{selectedUser.fullName}</AppText>
                <AppText style={styles.modalEmail}>{selectedUser.email}</AppText>

                <View style={styles.detailCard}>
                  <View style={styles.detailRow}>
                    <Ionicons name="call-outline" size={20} color={Colors.primary} />
                    <View style={styles.detailInfo}>
                      <AppText style={styles.detailLabel}>Số điện thoại</AppText>
                      <AppText style={styles.detailValue}>{selectedUser.phone || "Chưa cập nhật"}</AppText>
                    </View>
                  </View>

                  <View style={styles.detailDivider} />

                  <View style={styles.detailRow}>
                    <Ionicons name="shield-checkmark-outline" size={20} color={Colors.primary} />
                    <View style={styles.detailInfo}>
                      <AppText style={styles.detailLabel}>Vai trò (Role)</AppText>
                      <AppText style={[styles.detailValue, { color: selectedUser.role === "Admin" ? Colors.primary : Colors.textPrimary }]}>
                        {selectedUser.role}
                      </AppText>
                    </View>
                    {currentUser?.id !== selectedUser._id && (
                      <TouchableOpacity
                        style={styles.modalChangeRoleBtn}
                        onPress={() => handleToggleRole(selectedUser)}
                      >
                        <Ionicons name="swap-horizontal-outline" size={14} color={Colors.primary} style={{ marginRight: 4 }} />
                        <AppText style={styles.modalChangeRoleText}>
                          Chuyển sang {selectedUser.role === "Admin" ? "Customer" : "Admin"}
                        </AppText>
                      </TouchableOpacity>
                    )}
                  </View>

                  <View style={styles.detailDivider} />

                  <View style={styles.detailRow}>
                    <Ionicons name="alert-circle-outline" size={20} color={selectedUser.status === "Blocked" ? Colors.error : Colors.success} />
                    <View style={styles.detailInfo}>
                      <AppText style={styles.detailLabel}>Trạng thái tài khoản</AppText>
                      <AppText style={[styles.detailValue, { color: selectedUser.status === "Blocked" ? Colors.error : Colors.success }]}>
                        {selectedUser.status}
                      </AppText>
                    </View>
                  </View>

                  <View style={styles.detailDivider} />

                  <View style={styles.detailRow}>
                    <Ionicons name="calendar-outline" size={20} color={Colors.textSecondary} />
                    <View style={styles.detailInfo}>
                      <AppText style={styles.detailLabel}>Ngày đăng ký</AppText>
                      <AppText style={styles.detailValue}>
                        {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString("vi-VN") : "Không rõ"}
                      </AppText>
                    </View>
                  </View>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
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
    marginBottom: 20,
  },
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 14,
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
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    gap: 8,
  },
  actionItemBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionBtnLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  statusBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "85%",
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  modalBody: {
    alignItems: "center",
    paddingBottom: 30,
  },
  modalAvatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#E6F4FE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  modalFullName: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  modalEmail: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  detailCard: {
    width: "100%",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  detailInfo: {
    flex: 1,
    marginLeft: 12,
  },
  detailLabel: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  detailDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  modalChangeRoleBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#EBF5FF",
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  modalChangeRoleText: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.primary,
  },
});
