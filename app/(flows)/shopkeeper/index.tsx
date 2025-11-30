import {
  AlertCircle,
  Camera,
  CheckCircle,
  Package,
  Store,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ShopkeeperFlow() {
  const [screen, setScreen] = useState("dashboard"); // dashboard, alert, store, pickup

  // --- Screens ---

  if (screen === "dashboard") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.header, { backgroundColor: "#D97706" }]}>
          <Text style={styles.headerTitleWhite}>Shop Dashboard</Text>
          <Text style={styles.headerSubtitleWhite}>Kumar General Store</Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 20 }}>
          {/* Stats Grid */}
          <View style={styles.row}>
            <View style={[styles.statCard, { marginRight: 10 }]}>
              <Package size={24} color="#D97706" />
              <Text style={styles.statNum}>2</Text>
              <Text style={styles.statLabel}>Parcels Stored</Text>
            </View>
            <View style={[styles.statCard, { marginLeft: 10 }]}>
              <CheckCircle size={24} color="#16A34A" />
              <Text style={styles.statNum}>47</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
          </View>

          {/* Verification Badge */}
          <View
            style={[
              styles.card,
              {
                backgroundColor: "#D97706",
                flexDirection: "row",
                alignItems: "center",
              },
            ]}
          >
            <View style={styles.whiteCircle}>
              <Store size={24} color="#D97706" />
            </View>
            <View style={{ marginLeft: 15 }}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
              >
                Verified Partner
              </Text>
              <Text style={{ color: "rgba(255,255,255,0.8)" }}>
                ⭐ 4.9 Rating
              </Text>
            </View>
          </View>

          {/* Active List */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Stored Parcels</Text>
            {["PT-2411-9876", "PT-2411-7234"].map((id, idx) => (
              <View
                key={id}
                style={[
                  styles.listItem,
                  idx > 0 && { borderTopWidth: 1, borderColor: "#E5E7EB" },
                ]}
              >
                <View>
                  <Text style={{ fontWeight: "600" }}>{id}</Text>
                  <Text style={styles.subText}>Receiver: Deepak Kumar</Text>
                </View>
                <TouchableOpacity
                  style={styles.actionBtnSmall}
                  onPress={() => setScreen("pickup")}
                >
                  <Text style={{ color: "white", fontSize: 12 }}>
                    Receiver Arrived
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.alertBtn}
            onPress={() => setScreen("alert")}
          >
            <Text style={styles.alertBtnText}>
              📦 Simulate New Drop Request
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === "alert") {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", backgroundColor: "#FFF7ED", padding: 20 },
        ]}
      >
        <View style={styles.modalCard}>
          <View style={styles.iconCircleBig}>
            <AlertCircle size={40} color="white" />
          </View>
          <Text style={styles.modalTitle}>New Parcel Drop</Text>
          <Text
            style={{ textAlign: "center", color: "#6B7280", marginBottom: 20 }}
          >
            Traveler Rajesh needs to drop a parcel. Receiver unavailable.
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Tracking ID</Text>
            <Text style={styles.value}>PT-9876</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Commission</Text>
            <Text style={{ color: "#16A34A", fontWeight: "bold" }}>₹50</Text>
          </View>

          <TouchableOpacity
            style={[styles.primaryBtn, { width: "100%", marginTop: 20 }]}
            onPress={() => setScreen("store")}
          >
            <Text style={styles.primaryBtnText}>Accept & Store</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 15 }}
            onPress={() => setScreen("dashboard")}
          >
            <Text style={{ color: "#6B7280" }}>Decline</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (screen === "store") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Store Parcel</Text>
        </View>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Verify Traveler</Text>
            <View style={styles.row}>
              <Text>Rajesh Kumar (4.8 ⭐)</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Take Photos</Text>
            <View style={styles.uploadPlaceholder}>
              <Camera size={24} color="#9CA3AF" />
              <Text style={{ color: "#6B7280" }}>Parcel Front</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Storage Location</Text>
            <TextInput style={styles.input} placeholder="e.g. Shelf A3" />
          </View>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => setScreen("dashboard")}
          >
            <Text style={styles.primaryBtnText}>Confirm Stored</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === "pickup") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.header, { backgroundColor: "#16A34A" }]}>
          <Text style={styles.headerTitleWhite}>Receiver Pickup</Text>
          <Text style={styles.headerSubtitleWhite}>Verify & Handover</Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 20 }}>
          {/* Parcel Info */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Parcel Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Tracking ID</Text>
              <Text style={styles.value}>PT-2411-9876</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Receiver</Text>
              <Text style={styles.value}>Deepak Kumar</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Stored Location</Text>
              <Text style={[styles.value, { color: "#D97706" }]}>Shelf A3</Text>
            </View>
          </View>

          {/* Verification */}
          <View style={[styles.card, { marginTop: 10 }]}>
            <Text style={styles.sectionTitle}>Verification Steps</Text>

            <View style={{ marginBottom: 15 }}>
              <Text style={[styles.label, { marginBottom: 5 }]}>
                1. Verify Receiver OTP
              </Text>
              <TextInput
                style={styles.otpInput}
                placeholder="• • • •"
                keyboardType="numeric"
                maxLength={4}
                textAlign="center"
              />
            </View>

            <View style={{ marginBottom: 15 }}>
              <Text style={[styles.label, { marginBottom: 5 }]}>
                2. Check Government ID
              </Text>
              <View style={styles.row}>
                <CheckCircle size={20} color="#16A34A" />
                <Text style={{ marginLeft: 10 }}>
                  Name matches: Deepak Kumar
                </Text>
              </View>
            </View>

            <View>
              <Text style={[styles.label, { marginBottom: 5 }]}>
                3. Take Proof Photo
              </Text>
              <TouchableOpacity style={styles.uploadPlaceholder}>
                <Camera size={24} color="#9CA3AF" />
                <Text style={{ color: "#6B7280" }}>Photo with Receiver</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Earnings Preview */}
          <View
            style={[
              styles.card,
              {
                backgroundColor: "#DCFCE7",
                alignItems: "center",
                marginTop: 10,
                borderColor: "#16A34A",
                borderWidth: 1,
              },
            ]}
          >
            <Text style={{ color: "#166534", fontWeight: "600" }}>
              Commission for this handoff
            </Text>
            <Text
              style={{ fontSize: 24, fontWeight: "bold", color: "#16A34A" }}
            >
              ₹50
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.primaryBtn,
              { backgroundColor: "#16A34A", marginTop: 20 },
            ]}
            onPress={() => setScreen("dashboard")}
          >
            <Text style={styles.primaryBtnText}>Confirm Handover Complete</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <View>
      <Text>Pickup flow similar to Receiver flow.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: { padding: 16, backgroundColor: "white" },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  headerTitleWhite: { fontSize: 20, fontWeight: "bold", color: "white" },
  headerSubtitleWhite: { fontSize: 14, color: "rgba(255,255,255,0.8)" },
  row: { flexDirection: "row", alignItems: "center" },
  statCard: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },
  statNum: { fontSize: 24, fontWeight: "bold", marginVertical: 5 },
  statLabel: { color: "#6B7280", fontSize: 12 },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  whiteCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  subText: { fontSize: 12, color: "#6B7280" },
  actionBtnSmall: {
    backgroundColor: "#D97706",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  alertBtn: {
    backgroundColor: "#FFF7ED",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D97706",
    alignItems: "center",
  },
  alertBtnText: { color: "#D97706", fontWeight: "600" },
  modalCard: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 24,
    alignItems: "center",
    shadowOpacity: 0.1,
  },
  iconCircleBig: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#D97706",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  modalTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 5 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  label: { color: "#6B7280" },
  value: { fontWeight: "600" },
  primaryBtn: {
    backgroundColor: "#D97706",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  primaryBtnText: { color: "white", fontSize: 16, fontWeight: "600" },
  uploadPlaceholder: {
    height: 100,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 12,
    borderRadius: 8,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 12,
    borderRadius: 8,
    fontSize: 24,
    letterSpacing: 5,
  },
});
