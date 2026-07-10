import { useRouter } from "expo-router";
import { View, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppContainer from "../../../components/common/AppContainer";
import AppText from "../../../components/common/AppText";
import { useAuth } from "../../../hooks/useAuth";
import { Colors } from "../../../theme";

export default function ProfileScreen() {
  const router = useRouter();
  const { currentUser, signOut } = useAuth();

  if (!currentUser) {
    return null;
  }

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await signOut();
              router.replace("/login");
            } catch (error: any) {
              Alert.alert("Logout failed", error.message || "Unable to logout.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Get initial letters of full name for avatar placeholder
  const getInitials = (name: string) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <AppContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            {currentUser.avatar ? (
              <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <AppText style={styles.avatarPlaceholderText}>
                  {getInitials(currentUser.fullName)}
                </AppText>
              </View>
            )}
          </View>
          <AppText style={styles.name}>{currentUser.fullName}</AppText>
          <AppText style={styles.email}>{currentUser.email}</AppText>
        </View>

        {/* Info Section */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Personal Info</AppText>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <View style={styles.infoIconWrapper}>
                <Ionicons name="call-outline" size={20} color={Colors.primary} />
              </View>
              <View style={styles.infoContent}>
                <AppText style={styles.infoLabel}>Phone</AppText>
                <AppText style={styles.infoValue}>{currentUser.phone || "Not set"}</AppText>
              </View>
            </View>
            
            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.infoIconWrapper}>
                <Ionicons name="shield-checkmark-outline" size={20} color={Colors.primary} />
              </View>
              <View style={styles.infoContent}>
                <AppText style={styles.infoLabel}>Role</AppText>
                <AppText style={styles.infoValue}>{currentUser.role}</AppText>
              </View>
            </View>
          </View>
        </View>

        {/* Actions Section */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Account Settings</AppText>
          <View style={styles.card}>
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => router.push("/profile/edit")}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIconWrapper, { backgroundColor: "#EBF5FF" }]}>
                  <Ionicons name="person-outline" size={20} color="#2D9CDB" />
                </View>
                <AppText style={styles.menuItemText}>Edit Profile</AppText>
              </View>
              <Ionicons name="chevron-forward-outline" size={20} color={Colors.textLight} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => router.push("/profile/change-password")}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIconWrapper, { backgroundColor: "#EDF2F7" }]}>
                  <Ionicons name="lock-closed-outline" size={20} color="#4A5568" />
                </View>
                <AppText style={styles.menuItemText}>Change Password</AppText>
              </View>
              <Ionicons name="chevron-forward-outline" size={20} color={Colors.textLight} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIconWrapper, { backgroundColor: "#FFEBEB" }]}>
                  <Ionicons name="log-out-outline" size={20} color={Colors.error} />
                </View>
                <AppText style={[styles.menuItemText, { color: Colors.error }]}>Logout</AppText>
              </View>
              <Ionicons name="chevron-forward-outline" size={20} color={Colors.error} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 40,
    paddingTop: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
    paddingVertical: 10,
  },
  avatarContainer: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  avatarPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: Colors.white,
  },
  avatarPlaceholderText: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.white,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textSecondary,
    marginBottom: 10,
    paddingLeft: 4,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingVertical: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  infoIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F9FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: 72,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
});