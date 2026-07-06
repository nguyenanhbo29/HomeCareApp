import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Service } from "../../service/types/service";

interface Props {
  services: Service[];
  selectedServiceId: string;
  onChange: (id: string) => void;
}

export default function ServiceSelector({
  services,
  selectedServiceId,
  onChange,
}: Props) {
  const [visible, setVisible] = useState(false);

  const selectedService = useMemo(() => {
    return (
      services.find(
        (item) => item.id === selectedServiceId
      ) || services[0]
    );
  }, [services, selectedServiceId]);

  function handleSelect(id: string) {
    onChange(id);
    setVisible(false);
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>
          Service
        </Text>

        <TouchableOpacity
          style={styles.selector}
          activeOpacity={0.8}
          onPress={() => setVisible(true)}
        >
          <View style={styles.left}>
            <View
              style={[
                styles.icon,
                {
                  backgroundColor:
                    selectedService?.category?.color ??
                    "#6C4CF1",
                },
              ]}
            >
              <Ionicons
                name={
                  (selectedService?.category
                    ?.icon as any) || "sparkles"
                }
                color="#fff"
                size={22}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>
                {selectedService?.name}
              </Text>

              <Text style={styles.category}>
                {selectedService?.category?.name}
              </Text>
            </View>
          </View>

          <Ionicons
            name="chevron-down"
            size={22}
            color="#666"
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>
              Choose Service
            </Text>

            <FlatList
              data={services}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() =>
                    handleSelect(item.id)
                  }
                >
                  <View
                    style={[
                      styles.icon,
                      {
                        backgroundColor:
                          item.category.color,
                      },
                    ]}
                  >
                    <Ionicons
                      name={item.category.icon as any}
                      color="#fff"
                      size={20}
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.itemName}>
                      {item.name}
                    </Text>

                    <Text
                      style={styles.itemCategory}
                    >
                      {item.category.name}
                    </Text>
                  </View>

                  {item.id ===
                    selectedServiceId && (
                    <Ionicons
                      name="checkmark-circle"
                      color="#6C4CF1"
                      size={24}
                    />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
  },

  label: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  selector: {
    backgroundColor: "#fff",

    borderRadius: 18,

    padding: 16,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    shadowColor: "#000",

    shadowOpacity: 0.06,

    shadowRadius: 6,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  icon: {
    width: 52,
    height: 52,
    borderRadius: 26,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  category: {
    marginTop: 3,
    color: "#6B7280",
  },

  overlay: {
    flex: 1,

    backgroundColor: "rgba(0,0,0,.35)",

    justifyContent: "center",

    paddingHorizontal: 20,
  },

  modal: {
    backgroundColor: "#fff",

    borderRadius: 24,

    padding: 20,

    maxHeight: "70%",
  },

  modalTitle: {
    fontSize: 20,

    fontWeight: "700",

    marginBottom: 18,
  },

  item: {
    flexDirection: "row",

    alignItems: "center",

    paddingVertical: 14,
  },

  itemName: {
    fontSize: 16,

    fontWeight: "600",
  },

  itemCategory: {
    color: "#6B7280",

    marginTop: 3,
  },
});