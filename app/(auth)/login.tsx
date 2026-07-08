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

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation error", "Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      await signIn(email, password);
      router.push("/home");
    } catch (error: any) {
      Alert.alert("Login failed", error.message || "Unable to login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContainer>
      <View style={styles.wrapper}>
        <AppText style={styles.title}>Welcome back</AppText>
        <View style={styles.form}>
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
        </View>

        <AppButton
          title="Login"
          onPress={handleLogin}
          loading={loading}
        />

        <View style={styles.footer}>
          <AppText style={styles.footerText}>Need an account?</AppText>
          <TouchableOpacity onPress={() => router.push("/register")}> 
            <AppText style={styles.footerLink}>Register</AppText>
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