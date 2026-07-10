import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert, Modal, TextInput, ScrollView, Switch } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AppContainer from "../../src/components/common/AppContainer";
import AppText from "../../src/components/common/AppText";
import AppButton from "../../src/components/common/AppButton";
import { getAllServices } from "../../src/services/service.service";
import { getCategories, createService, updateService, deleteService, Category } from "../../src/services/admin.service";
import { Colors } from "../../src/theme";

export default function AdminServices() {
  const router = useRouter();
  
  // State
  const [services, setServices] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingService, setEditingService] = useState<any | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("#6C4CF1");
  const [isPopular, setIsPopular] = useState(false);
  const [isRecommended, setIsRecommended] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [serviceList, categoryList] = await Promise.all([
        getAllServices(),
        getCategories(),
      ]);
      setServices(serviceList);
      setCategories(categoryList);
      if (categoryList.length > 0) {
        setSelectedCategory(categoryList[0]._id);
      }
    } catch (err: any) {
      Alert.alert("Error", err?.response?.data?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setEditingService(null);
    setName("");
    setDescription("");
    setPrice("");
    setDuration("");
    if (categories.length > 0) {
      setSelectedCategory(categories[0]._id);
    }
    setImageUrl("https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500");
    setIcon("build-outline");
    setColor("#6C4CF1");
    setIsPopular(false);
    setIsRecommended(false);
    setModalVisible(true);
  };

  const openEditModal = (service: any) => {
    setEditingService(service);
    setName(service.name);
    setDescription(service.description);
    setPrice(service.price.toString());
    setDuration(service.duration);
    setSelectedCategory(service.category?._id || service.category || "");
    setImageUrl(service.image || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500");
    setIcon(service.icon || "build-outline");
    setColor(service.color || "#6C4CF1");
    setIsPopular(service.isPopular || false);
    setIsRecommended(service.isRecommended || false);
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!name || !description || !price || !duration || !selectedCategory) {
      Alert.alert("Validation Error", "Please fill in all required fields.");
      return;
    }

    const payload = {
      name,
      description,
      price: parseFloat(price),
      duration,
      category: selectedCategory,
      image: imageUrl,
      icon,
      color,
      isPopular,
      isRecommended,
    };

    try {
      setLoading(true);
      if (editingService) {
        await updateService(editingService._id, payload);
        Alert.alert("Success", "Service package updated successfully.");
      } else {
        await createService(payload);
        Alert.alert("Success", "Service package created successfully.");
      }
      setModalVisible(false);
      fetchData();
    } catch (err: any) {
      Alert.alert("Error", err?.response?.data?.message || "Failed to save service");
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to permanently delete this service package?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              await deleteService(id);
              Alert.alert("Deleted", "Service package deleted successfully.");
              fetchData();
            } catch (err: any) {
              Alert.alert("Error", err?.response?.data?.message || "Failed to delete service");
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const renderServiceItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.serviceCard}>
        <View style={styles.cardInfo}>
          <View style={[styles.iconContainer, { backgroundColor: item.color + "1A" }]}>
            <Ionicons name={(item.icon as any) || "build-outline"} size={24} color={item.color || Colors.primary} />
          </View>
          <View style={styles.details}>
            <AppText style={styles.serviceName}>{item.name}</AppText>
            <AppText style={styles.serviceMeta}>
              {item.duration} • ${item.price}
            </AppText>
            <View style={styles.tagContainer}>
              {item.isPopular && <View style={[styles.tag, { backgroundColor: "#FFFDEB" }]}><AppText style={[styles.tagText, { color: Colors.warning }]}>Popular</AppText></View>}
              {item.isRecommended && <View style={[styles.tag, { backgroundColor: "#EBF5FF" }]}><AppText style={[styles.tagText, { color: Colors.primary }]}>Recommended</AppText></View>}
            </View>
          </View>
        </View>
        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.actionIcon} onPress={() => openEditModal(item)}>
            <Ionicons name="create-outline" size={22} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionIcon, { marginLeft: 12 }]} onPress={() => handleDelete(item._id)}>
            <Ionicons name="trash-outline" size={22} color={Colors.error} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <AppContainer>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <AppText style={styles.title}>Manage Services</AppText>
      </View>

      {/* Main Content */}
      {loading && services.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          data={services}
          keyExtractor={(item) => item._id}
          renderItem={renderServiceItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: 80 }} />}
        />
      )}

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab} onPress={openAddModal}>
        <Ionicons name="add" size={30} color={Colors.surface} />
      </TouchableOpacity>

      {/* Add/Edit Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <AppText style={styles.modalTitle}>{editingService ? "Edit Service" : "Add Service"}</AppText>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={Colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.formContainer} showsVerticalScrollIndicator={false}>
              <AppText style={styles.label}>Service Name *</AppText>
              <TextInput style={styles.input} placeholder="e.g. Premium Cleaning" value={name} onChangeText={setName} />

              <AppText style={styles.label}>Description *</AppText>
              <TextInput style={[styles.input, styles.textArea]} multiline placeholder="Describe the service details..." value={description} onChangeText={setDescription} />

              <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <AppText style={styles.label}>Price ($) *</AppText>
                  <TextInput style={styles.input} keyboardType="numeric" placeholder="e.g. 50" value={price} onChangeText={setPrice} />
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <AppText style={styles.label}>Duration *</AppText>
                  <TextInput style={styles.input} placeholder="e.g. 2 hours" value={duration} onChangeText={setDuration} />
                </View>
              </View>

              <AppText style={styles.label}>Category *</AppText>
              <View style={styles.categoryPicker}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat._id}
                    style={[
                      styles.categoryChip,
                      selectedCategory === cat._id && { backgroundColor: Colors.primary, borderColor: Colors.primary }
                    ]}
                    onPress={() => setSelectedCategory(cat._id)}
                  >
                    <AppText style={[styles.categoryChipText, selectedCategory === cat._id && { color: Colors.surface }]}>
                      {cat.name}
                    </AppText>
                  </TouchableOpacity>
                ))}
              </View>

              <AppText style={styles.label}>Image URL</AppText>
              <TextInput style={styles.input} placeholder="http://..." value={imageUrl} onChangeText={setImageUrl} />

              <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <AppText style={styles.label}>Icon (Ionicons)</AppText>
                  <TextInput style={styles.input} placeholder="build-outline" value={icon} onChangeText={setIcon} />
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <AppText style={styles.label}>Color Hex</AppText>
                  <TextInput style={styles.input} placeholder="#6C4CF1" value={color} onChangeText={setColor} />
                </View>
              </View>

              {/* Switches */}
              <View style={styles.switchRow}>
                <AppText style={styles.switchLabel}>Mark as Popular</AppText>
                <Switch value={isPopular} onValueChange={setIsPopular} trackColor={{ true: Colors.primary }} />
              </View>

              <View style={styles.switchRow}>
                <AppText style={styles.switchLabel}>Mark as Recommended</AppText>
                <Switch value={isRecommended} onValueChange={setIsRecommended} trackColor={{ true: Colors.primary }} />
              </View>

              <View style={{ marginTop: 24, marginBottom: 12 }}>
                <AppButton title={editingService ? "Save Changes" : "Create Service"} onPress={handleSave} />
              </View>
            </ScrollView>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    paddingBottom: 40,
    gap: 16,
  },
  serviceCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  details: {
    flex: 1,
    marginRight: 8,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  serviceMeta: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  tagContainer: {
    flexDirection: "row",
    gap: 6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 10,
    fontWeight: "700",
  },
  cardActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionIcon: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.background,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
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
    maxHeight: "90%",
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  formContainer: {
    paddingBottom: 40,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textSecondary,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  textArea: {
    height: 80,
    paddingTop: 12,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryPicker: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: "#F9FAFB",
  },
  categoryChipText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: "600",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    paddingVertical: 4,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
});
