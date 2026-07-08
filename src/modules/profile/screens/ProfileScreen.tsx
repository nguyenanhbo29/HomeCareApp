import { useRouter } from "expo-router";
import { View, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AppContainer from "../../../../src/components/common/AppContainer";
import AppText from "../../../../src/components/common/AppText";
import AppButton from "../../../../src/components/common/AppButton";
import { useAuth } from "../../../../src/hooks/useAuth";

export default function ProfileScreen() {
  const router = useRouter();
  const { currentUser, signOut } = useAuth();

  if (!currentUser) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/login");
    } catch (error: any) {
      Alert.alert("Logout failed", error.message || "Unable to logout.");
    }
  };

  return (
    <AppContainer>
      <View style={styles.header}>
        <Image
        //   source={
        //     currentUser.avatar
        //       ? { uri: currentUser.avatar }
        //       : require("../../../../assets/avatar-placeholder.png")
        //   }
        //   style={styles.avatar}
        />
        <AppText style={styles.name}>{currentUser.fullName}</AppText>
        <AppText style={styles.email}>{currentUser.email}</AppText>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <AppText style={styles.label}>Phone</AppText>
          <AppText>{currentUser.phone || "-"}</AppText>
        </View>
        <View style={styles.row}>
          <AppText style={styles.label}>Role</AppText>
          <AppText>{currentUser.role}</AppText>
        </View>
      </View>

      <View style={styles.actions}>
        <AppButton
          title="Edit Profile"
          onPress={() => router.push("/profile/edit")}
          variant="secondary"
        />
        <AppButton
          title="Change Password"
          onPress={() => router.push("/profile/change-password")}
          variant="secondary"
        />
        <AppButton
          title="Logout"
          onPress={handleLogout}
          variant="outline"
        />
      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E5E7EB",
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  email: {
    color: "#6B7280",
  },
  card: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontWeight: "600",
  },
  actions: {
    gap: 12,
  },
});