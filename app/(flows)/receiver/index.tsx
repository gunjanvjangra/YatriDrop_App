import {
  CheckCircle,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  QrCode,
  Star,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ReceiverFlow() {
  const [screen, setScreen] = useState("incoming"); // incoming, tracking, arrival, pickup, confirmation, rating
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const incomingDelivery = {
    trackingId: "PT-2411-8734",
    itemType: "Documents",
    senderName: "Amit Patel",
    travelerName: "Rajesh Kumar",
    travelerRating: 4.8,
    // Using a placeholder image for demo
    travelerPhoto: "https://i.pravatar.cc/150?img=11",
    pickupStation: "Mumbai Central",
    destStation: "New Delhi",
    estimatedArrival: "8:30 PM Today",
    currentLocation: "Approaching Vadodara",
  };

  const renderStatusStep = (
    title: string,
    subtitle: string,
    isCompleted: boolean,
    isLast: boolean = false
  ) => (
    <View style={{ flexDirection: "row" }}>
      <View style={{ alignItems: "center", marginRight: 10 }}>
        <View
          style={[
            styles.stepDot,
            isCompleted
              ? { backgroundColor: "#16A34A" }
              : { backgroundColor: "#D1D5DB" },
          ]}
        >
          {isCompleted && <CheckCircle size={12} color="white" />}
        </View>
        {!isLast && (
          <View
            style={[
              styles.stepLine,
              isCompleted
                ? { backgroundColor: "#16A34A" }
                : { backgroundColor: "#E5E7EB" },
            ]}
          />
        )}
      </View>
      <View style={{ paddingBottom: 20 }}>
        <Text style={[styles.stepTitle, isCompleted && { color: "#111827" }]}>
          {title}
        </Text>
        <Text style={styles.stepSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {screen === "incoming"
            ? "Incoming Delivery"
            : screen === "tracking"
            ? "Live Tracking"
            : screen === "pickup"
            ? "Pickup Verification"
            : "Details"}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        {screen === "incoming" && (
          <>
            <View style={styles.card}>
              <View style={styles.rowBetween}>
                <View>
                  <Text style={styles.label}>Tracking ID</Text>
                  <Text style={styles.value}>
                    {incomingDelivery.trackingId}
                  </Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>In Transit</Text>
                </View>
              </View>
              <View style={styles.highlightBox}>
                <Package size={24} color="#7C3AED" />
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.label}>Current Location</Text>
                  <Text style={styles.value}>
                    {incomingDelivery.currentLocation}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Your Traveler</Text>
              <View style={styles.row}>
                <Image
                  source={{ uri: incomingDelivery.travelerPhoto }}
                  style={styles.avatar}
                />
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <Text style={styles.name}>
                    {incomingDelivery.travelerName}
                  </Text>
                  <View style={styles.row}>
                    <Star size={14} color="#CA8A04" fill="#CA8A04" />
                    <Text style={{ marginLeft: 4, color: "#CA8A04" }}>
                      {incomingDelivery.travelerRating}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.row, { marginTop: 15, gap: 10 }]}>
                <TouchableOpacity
                  style={[styles.actionBtn, { backgroundColor: "#2563EB" }]}
                >
                  <Phone size={18} color="white" />
                  <Text style={styles.btnText}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionBtn, { backgroundColor: "#16A34A" }]}
                >
                  <MessageCircle size={18} color="white" />
                  <Text style={styles.btnText}>Chat</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => setScreen("tracking")}
            >
              <Text style={styles.primaryBtnText}>Track Live Location</Text>
            </TouchableOpacity>
          </>
        )}

        {screen === "tracking" && (
          <>
            <View style={styles.mapPlaceholder}>
              <View style={styles.pulseCircle} />
              <MapPin size={40} color="#7C3AED" />
              <Text style={{ marginTop: 10, fontWeight: "bold" }}>
                Approaching Vadodara
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={[styles.cardTitle, { marginBottom: 20 }]}>
                Journey Progress
              </Text>
              {renderStatusStep("Picked Up", "Mumbai Central - 2:45 PM", true)}
              {renderStatusStep("Passed Surat", "On Schedule - 5:20 PM", true)}
              {renderStatusStep("Approaching Vadodara", "ETA: 45 min", true)}
              {renderStatusStep(
                "Destination",
                "New Delhi - 8:30 PM",
                false,
                true
              )}
            </View>

            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => setScreen("pickup")}
            >
              <Text style={styles.primaryBtnText}>Simulate Arrival (Dev)</Text>
            </TouchableOpacity>
          </>
        )}

        {screen === "pickup" && (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Show to Traveler</Text>
              <View style={{ alignItems: "center", padding: 20 }}>
                <QrCode size={150} color="black" />
                <Text
                  style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}
                >
                  {incomingDelivery.trackingId}
                </Text>
              </View>
            </View>

            <View style={[styles.card, { backgroundColor: "#7C3AED" }]}>
              <Text
                style={{ color: "white", textAlign: "center", opacity: 0.8 }}
              >
                Delivery OTP
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 32,
                  fontWeight: "bold",
                  textAlign: "center",
                  letterSpacing: 5,
                  marginVertical: 10,
                }}
              >
                2916
              </Text>
              <Text
                style={{ color: "white", textAlign: "center", fontSize: 12 }}
              >
                Only share after receiving item
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.primaryBtn, { backgroundColor: "#16A34A" }]}
              onPress={() => setScreen("confirmation")}
            >
              <Text style={styles.primaryBtnText}>Confirm Item Received</Text>
            </TouchableOpacity>
          </>
        )}

        {screen === "confirmation" && (
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <CheckCircle size={80} color="#16A34A" />
            <Text
              style={{ fontSize: 24, fontWeight: "bold", marginVertical: 10 }}
            >
              Item Received!
            </Text>
            <Text style={{ color: "gray", textAlign: "center" }}>
              Your delivery has been successfully completed.
            </Text>

            <TouchableOpacity
              style={[styles.primaryBtn, { width: "100%", marginTop: 40 }]}
              onPress={() => setScreen("incoming")}
            >
              <Text style={styles.primaryBtnText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  header: {
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#111827" },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  row: { flexDirection: "row", alignItems: "center" },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: { fontSize: 12, color: "#6B7280" },
  value: { fontSize: 16, fontWeight: "500", color: "#111827" },
  badge: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: { color: "#1E40AF", fontSize: 12, fontWeight: "600" },
  highlightBox: {
    marginTop: 15,
    backgroundColor: "#F3E8FF",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  name: { fontSize: 16, fontWeight: "600" },
  actionBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  btnText: { color: "white", fontWeight: "500" },
  primaryBtn: {
    backgroundColor: "#7C3AED",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  primaryBtnText: { color: "white", fontSize: 16, fontWeight: "600" },
  mapPlaceholder: {
    height: 250,
    backgroundColor: "#E0E7FF",
    borderRadius: 16,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  pulseCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(124, 58, 237, 0.2)",
    position: "absolute",
  },
  stepDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  stepLine: { width: 2, height: 50, marginTop: -2 },
  stepTitle: { fontSize: 14, fontWeight: "600", color: "#9CA3AF" },
  stepSubtitle: { fontSize: 12, color: "#9CA3AF" },
});
