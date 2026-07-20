import { useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppContainer from "../../src/components/common/AppContainer";
import AppButton from "../../src/components/common/AppButton";
import AppText from "../../src/components/common/AppText";
import { changePassword as changePasswordService } from "../../src/services/auth.service";

export default function ChangePasswordScreen() {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert("Validation error", "Please fill all fields.");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Validation error", "New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Validation error", "Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await changePasswordService(oldPassword, newPassword);
      Alert.alert("Success", "Password changed successfully.");
      router.back();
    } catch (error: any) {
      Alert.alert("Change failed", error.message || "Unable to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContainer>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>

        <AppText style={styles.title}>Change Password</AppText>
        <View style={styles.form}>
          <AppText style={styles.label}>Old Password</AppText>
          <TextInput
            style={styles.input}
            placeholder="Old password"
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry
          />
          <AppText style={styles.label}>New Password</AppText>
          <TextInput
            style={styles.input}
            placeholder="New password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <AppText style={styles.label}>Confirm Password</AppText>
          <TextInput
            style={styles.input}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <AppButton
          title="Change Password"
          onPress={handleChangePassword}
          loading={loading}
        />
      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
  },
  form: {
    marginBottom: 24,
  },
  label: {
    marginBottom: 8,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
});