import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

interface Props {
  onPress: () => void;
  loading?: boolean;
}

export default function ConfirmBookingButton({
  onPress,
  loading = false,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        loading && styles.buttonDisabled,
      ]}
      activeOpacity={0.85}
      disabled={loading}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color="#FFFFFF"
        />
      ) : (
        <Text style={styles.text}>
          Confirm Booking
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 20,

    marginTop: 35,

    marginBottom: 40,

    height: 60,

    borderRadius: 30,

    backgroundColor: "#6C4CF1",

    justifyContent: "center",

    alignItems: "center",
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  text: {
    color: "#FFFFFF",

    fontSize: 18,

    fontWeight: "700",
  },
});