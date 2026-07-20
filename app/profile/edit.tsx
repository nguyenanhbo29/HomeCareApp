import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
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
import { useAuth } from "../../src/hooks/useAuth";
import { updateProfile as updateProfileService } from "../../src/services/auth.service";

export default function EditProfileScreen() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.fullName);
      setPhone(currentUser.phone);
      setAvatar(currentUser.avatar);
    }
  }, [currentUser]);

  const handleSave = async () => {
    if (!fullName) {
      Alert.alert("Validation error", "Full name is required.");
      return;
    }

    try {
      setLoading(true);
      await updateProfileService({ fullName, phone, avatar });
      Alert.alert("Success", "Profile updated successfully.");
      router.back();
    } catch (error: any) {
      Alert.alert("Update failed", error.message || "Unable to update profile.");
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

        <AppText style={styles.title}>Edit Profile</AppText>
        <View style={styles.form}>
          <AppText style={styles.label}>Full Name</AppText>
          <TextInput
            style={styles.input}
            placeholder="Full name"
            value={fullName}
            onChangeText={setFullName}
          />
          <AppText style={styles.label}>Phone</AppText>
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <AppText style={styles.label}>Avatar URL</AppText>
          <TextInput
            style={styles.input}
            placeholder="Avatar image URL"
            value={avatar}
            onChangeText={setAvatar}
            autoCapitalize="none"
          />
        </View>

        <AppButton
          title="Save"
          onPress={handleSave}
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