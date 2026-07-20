import { useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppContainer from "../../src/components/common/AppContainer";
import AppButton from "../../src/components/common/AppButton";
import AppText from "../../src/components/common/AppText";
import { useAuth } from "../../src/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Radius, Spacing, Typography } from "../../src/theme";

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Lỗi nhập liệu", "Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }

    try {
      setLoading(true);
      const user = await signIn(email, password);
      if (user?.role === "Admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/(tabs)/home");
      }
    } catch (error: any) {
      Alert.alert("Đăng nhập thất bại", error.message || "Không thể đăng nhập.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContainer>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.wrapper}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={50}
      >
        {/* Header Branding */}
        <View style={styles.headerContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="fitness" size={40} color={Colors.primary} />
          </View>
          <AppText style={styles.brandTitle}>HomeCare</AppText>
          <AppText style={styles.brandSubtitle}>
            Chăm sóc sức khỏe gia đình tận tâm
          </AppText>
        </View>

        {/* Card Form */}
        <View style={styles.card}>
          <AppText style={styles.title}>Đăng nhập</AppText>
          <AppText style={styles.subtitle}>
            Vui lòng đăng nhập để tiếp tục sử dụng ứng dụng
          </AppText>

          <View style={styles.form}>
            {/* Email Field */}
            <AppText style={styles.label}>Email</AppText>
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={Colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Nhập email của bạn"
                placeholderTextColor={Colors.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Field */}
            <AppText style={styles.label}>Mật khẩu</AppText>
            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={Colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Nhập mật khẩu"
                placeholderTextColor={Colors.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={Colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            <AppButton
              title="Đăng nhập"
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
            />
          </View>
        </View>

        {/* Footer Link */}
        <View style={styles.footer}>
          <AppText style={styles.footerText}>Chưa có tài khoản?</AppText>
          <TouchableOpacity onPress={() => router.push("/register")}>
            <AppText style={styles.footerLink}>Đăng ký ngay</AppText>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: Spacing.lg,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  iconCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#E6F4FE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.sm,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.primary,
    letterSpacing: 0.5,
  },
  brandSubtitle: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    fontSize: Typography.h2,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  form: {},
  label: {
    fontSize: Typography.body,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: Spacing.sm,
    marginBottom: Spacing.md,
  },
  inputIcon: {
    marginRight: Spacing.xs,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: Typography.body,
    color: Colors.textPrimary,
  },
  eyeIcon: {
    padding: Spacing.xs,
  },
  loginButton: {
    marginTop: Spacing.sm,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.xl,
  },
  footerText: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    marginRight: Spacing.xs,
  },
  footerLink: {
    fontSize: Typography.body,
    color: Colors.primary,
    fontWeight: "700",
  },
});