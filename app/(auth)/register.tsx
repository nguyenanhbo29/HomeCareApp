import { useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AppContainer from "../../src/components/common/AppContainer";
import AppButton from "../../src/components/common/AppButton";
import AppText from "../../src/components/common/AppText";
import { useAuth } from "../../src/hooks/useAuth";

export default function RegisterScreen() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Validation error", "Please fill all fields.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Validation error", "Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Validation error", "Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await signUp(fullName, email, password);
      router.push("/home");
    } catch (error: any) {
      Alert.alert("Registration failed", error.message || "Unable to register.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContainer>
      <View style={styles.wrapper}>
        <AppText style={styles.title}>Create account</AppText>
        <View style={styles.form}>
          <AppText style={styles.label}>Full Name</AppText>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
          />
          <AppText style={styles.label}>Email</AppText>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <AppText style={styles.label}>Password</AppText>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <AppText style={styles.label}>Confirm Password</AppText>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <AppButton
          title="Register"
          onPress={handleRegister}
          loading={loading}
        />

        <View style={styles.footer}>
          <AppText style={styles.footerText}>Already have an account?</AppText>
          <TouchableOpacity onPress={() => router.push("/login")}> 
            <AppText style={styles.footerLink}>Login</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
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
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    marginRight: 8,
  },
  footerLink: {
    color: "#2563EB",
    fontWeight: "700",
  },
});