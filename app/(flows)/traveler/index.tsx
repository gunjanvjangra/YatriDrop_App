import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Camera,
  CheckCircle,
  MapPin,
  MessageCircle,
  Phone,
  QrCode,
  Star,
  TrendingUp,
  Wallet,
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

export default function TravelerFlow() {
  const router = useRouter();
  const [screen, setScreen] = useState("browse"); // browse, details, accept, pickup, transit, deliver, earnings
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const deliveryRequests = [
    {
      id: 1,
      itemType: "Documents",
      pickupStation: "Mumbai Central",
      destStation: "New Delhi",
      compensation: 250,
      urgency: "Express",
      senderName: "Amit Patel",
      rating: 4.7,
      routeMatch: 95,
      distance: "1384 km",
      time: "16h",
      verified: true,
    },
    {
      id: 2,
      itemType: "Small Parcel",
      pickupStation: "Mumbai Central",
      destStation: "Vadodara",
      compensation: 150,
      urgency: "Standard",
      senderName: "Priya Shah",
      rating: 4.9,
      routeMatch: 100,
      distance: "392 km",
      time: "4h",
      verified: true,
    },
  ];

  // --- Helper Components ---
  const StatusBadge = ({ label, color }: { label: string; color: string }) => (
    <View
      style={{
        backgroundColor: color + "20",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
      }}
    >
      <Text style={{ color: color, fontSize: 12, fontWeight: "600" }}>
        {label}
      </Text>
    </View>
  );

  // --- Screens ---

  if (screen === "browse") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.header, { backgroundColor: "#EA580C" }]}>
          <Text style={styles.headerTitleWhite}>Available Deliveries</Text>
          <Text style={styles.headerSubtitleWhite}>
            Mumbai → Delhi (12951 Rajdhani)
          </Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 20 }}>
          {/* Stats Banner */}
          <View
            style={[
              styles.card,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderColor: "#FDBA74",
                borderWidth: 1,
                backgroundColor: "#FFF7ED",
              },
            ]}
          >
            <View>
              <Text style={{ color: "#4B5563" }}>Potential Earnings Today</Text>
              <Text
                style={{ fontSize: 24, fontWeight: "bold", color: "#111827" }}
              >
                ₹520
              </Text>
            </View>
            <TrendingUp size={32} color="#EA580C" />
          </View>

          {/* List */}
          {deliveryRequests.map((req) => (
            <TouchableOpacity
              key={req.id}
              style={styles.card}
              onPress={() => {
                setSelectedRequest(req);
                setScreen("details");
              }}
            >
              <View style={styles.rowBetween}>
                <View>
                  <View style={styles.row}>
                    <Text style={styles.cardTitle}>{req.itemType}</Text>
                    {req.verified && (
                      <CheckCircle
                        size={16}
                        color="#2563EB"
                        style={{ marginLeft: 5 }}
                      />
                    )}
                  </View>
                  <Text style={styles.subText}>{req.senderName}</Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#16A34A",
                    }}
                  >
                    ₹{req.compensation}
                  </Text>
                  <StatusBadge
                    label={req.urgency}
                    color={req.urgency === "Express" ? "#DC2626" : "#2563EB"}
                  />
                </View>
              </View>

              <View style={styles.routeContainer}>
                <View style={styles.rowBetween}>
                  <View style={styles.row}>
                    <MapPin size={14} color="#16A34A" />
                    <Text style={{ marginLeft: 4 }}>{req.pickupStation}</Text>
                  </View>
                  <Text style={styles.subText}>{req.distance}</Text>
                </View>
                <View
                  style={{
                    height: 2,
                    backgroundColor: "#E5E7EB",
                    marginVertical: 8,
                  }}
                />
                <View style={styles.rowBetween}>
                  <View style={styles.row}>
                    <MapPin size={14} color="#DC2626" />
                    <Text style={{ marginLeft: 4 }}>{req.destStation}</Text>
                  </View>
                  <Text style={styles.subText}>{req.time}</Text>
                </View>
              </View>

              <View style={styles.rowBetween}>
                <View style={styles.row}>
                  <Star size={14} color="#CA8A04" fill="#CA8A04" />
                  <Text style={{ marginLeft: 4, color: "#CA8A04" }}>
                    {req.rating}
                  </Text>
                </View>
                <StatusBadge
                  label={`${req.routeMatch}% Match`}
                  color="#16A34A"
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === "details") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setScreen("browse")}>
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Delivery Details</Text>
        </View>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <View
            style={[
              styles.card,
              { backgroundColor: "#16A34A", alignItems: "center" },
            ]}
          >
            <Text style={{ color: "white", opacity: 0.9 }}>You'll Earn</Text>
            <Text style={{ color: "white", fontSize: 32, fontWeight: "bold" }}>
              ₹{selectedRequest?.compensation}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Route</Text>
            <View style={{ gap: 15 }}>
              <View style={styles.row}>
                <View
                  style={[styles.iconCircle, { backgroundColor: "#DCFCE7" }]}
                >
                  <MapPin size={20} color="#16A34A" />
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.label}>Pickup</Text>
                  <Text style={styles.value}>
                    {selectedRequest?.pickupStation}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View
                  style={[styles.iconCircle, { backgroundColor: "#FEE2E2" }]}
                >
                  <MapPin size={20} color="#DC2626" />
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.label}>Dropoff</Text>
                  <Text style={styles.value}>
                    {selectedRequest?.destStation}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Sender</Text>
            <View style={styles.row}>
              <View style={[styles.avatar, { backgroundColor: "#3B82F6" }]}>
                <Text style={{ color: "white" }}>AP</Text>
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.value}>{selectedRequest?.senderName}</Text>
                <View style={styles.row}>
                  <Star size={14} color="#CA8A04" fill="#CA8A04" />
                  <Text style={{ marginLeft: 5, color: "#CA8A04" }}>
                    {selectedRequest?.rating}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => setScreen("accept")}
          >
            <Text style={styles.primaryBtnText}>Accept Request</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === "accept") {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: "#F0FDF4" }]}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            padding: 20,
            alignItems: "center",
          }}
        >
          <CheckCircle size={80} color="#16A34A" />
          <Text
            style={{ fontSize: 24, fontWeight: "bold", marginVertical: 10 }}
          >
            Accepted!
          </Text>
          <Text
            style={{ textAlign: "center", color: "#4B5563", marginBottom: 30 }}
          >
            Pickup at {selectedRequest?.pickupStation}
          </Text>

          <View style={[styles.card, { width: "100%" }]}>
            <Text style={styles.sectionTitle}>Sender Contact</Text>
            <View style={[styles.row, { marginBottom: 20 }]}>
              <View style={[styles.avatar, { backgroundColor: "#3B82F6" }]}>
                <Text style={{ color: "white" }}>AP</Text>
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.value}>{selectedRequest?.senderName}</Text>
                <Text style={styles.subText}>+91 9XX-XXX-7823</Text>
              </View>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={[
                  styles.actionBtn,
                  { backgroundColor: "#2563EB", marginRight: 10 },
                ]}
              >
                <Phone size={20} color="white" />
                <Text style={styles.btnText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: "#16A34A" }]}
              >
                <MessageCircle size={20} color="white" />
                <Text style={styles.btnText}>Chat</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.primaryBtn,
              { width: "100%", backgroundColor: "#EA580C" },
            ]}
            onPress={() => setScreen("pickup")}
          >
            <Text style={styles.primaryBtnText}>Start Pickup</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Simplified Pickup Screen
  if (screen === "pickup") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Pickup Verification</Text>
        </View>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <View style={styles.card}>
            <Text style={styles.label}>Enter Pickup OTP from Sender</Text>
            <TextInput
              style={styles.otpInput}
              placeholder="• • • •"
              keyboardType="numeric"
              maxLength={4}
              textAlign="center"
            />
          </View>
          <TouchableOpacity style={styles.uploadBox}>
            <Camera size={32} color="#9CA3AF" />
            <Text style={{ color: "#6B7280", marginTop: 10 }}>
              Take Photo of Parcel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: "#16A34A" }]}
            onPress={() => setScreen("transit")}
          >
            <Text style={styles.primaryBtnText}>Confirm Pickup</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // In-Transit Screen
  if (screen === "transit") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.header, { backgroundColor: "#7C3AED" }]}>
          <Text style={styles.headerTitleWhite}>Onboard: 12951 Rajdhani</Text>
          <Text style={styles.headerSubtitleWhite}>
            Next Stop: Vadodara (2h 15m)
          </Text>
        </View>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <View style={[styles.card, { backgroundColor: "#16A34A" }]}>
            <View style={styles.rowBetween}>
              <Text style={{ color: "white" }}>Total Earnings</Text>
              <Wallet size={24} color="white" />
            </View>
            <Text style={{ fontSize: 32, fontWeight: "bold", color: "white" }}>
              ₹{selectedRequest?.compensation || 250}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Active Parcels</Text>
          <View style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={{ fontWeight: "bold" }}>PT-2411-8734</Text>
              <StatusBadge label="In Transit" color="#2563EB" />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.subText}>
                Dest: {selectedRequest?.destStation}
              </Text>
              <Text style={styles.subText}>Receiver: +91 9XX-XXX-2916</Text>
            </View>
            <View style={[styles.row, { marginTop: 15 }]}>
              <TouchableOpacity
                style={[styles.smBtn, { backgroundColor: "#DBEAFE" }]}
              >
                <Text style={{ color: "#1E40AF" }}>Call Receiver</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: "#7C3AED" }]}
            onPress={() => setScreen("deliver")}
          >
            <Text style={styles.primaryBtnText}>Arrive at Destination</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Delivery Screen (OTP & Handoff)
  if (screen === "deliver") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.header, { backgroundColor: "#16A34A" }]}>
          <Text style={styles.headerTitleWhite}>Deliver Item</Text>
          <Text style={styles.headerSubtitleWhite}>
            PT-2411-8734 → New Delhi
          </Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 20 }}>
          {/* Receiver Info */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Receiver Information</Text>
            <View style={[styles.row, { marginBottom: 15 }]}>
              <View style={[styles.avatar, { backgroundColor: "#7C3AED" }]}>
                <Text style={{ color: "white" }}>RS</Text>
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.value}>Rahul Sharma</Text>
                <Text style={styles.subText}>+91 9XX-XXX-2916</Text>
              </View>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={[
                  styles.actionBtn,
                  { backgroundColor: "#2563EB", marginRight: 10 },
                ]}
              >
                <Phone size={20} color="white" />
                <Text style={styles.btnText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: "#16A34A" }]}
              >
                <MessageCircle size={20} color="white" />
                <Text style={styles.btnText}>Chat</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Verification */}
          <View style={[styles.card, { marginTop: 15 }]}>
            <Text style={styles.sectionTitle}>Delivery Verification</Text>

            <View style={{ alignItems: "center", paddingVertical: 10 }}>
              <QrCode size={100} color="#374151" />
              <Text style={{ marginTop: 10, color: "#6B7280" }}>
                Scan Receiver QR
              </Text>
            </View>

            <Text
              style={[
                styles.subText,
                { textAlign: "center", marginVertical: 10 },
              ]}
            >
              - OR -
            </Text>

            <Text style={styles.label}>Enter Delivery OTP from Receiver</Text>
            <TextInput
              style={styles.otpInput}
              placeholder="• • • •"
              keyboardType="numeric"
              maxLength={4}
              textAlign="center"
            />
          </View>

          {/* Proof Photo */}
          <TouchableOpacity style={styles.uploadBox}>
            <Camera size={32} color="#9CA3AF" />
            <Text style={{ color: "#6B7280", marginTop: 10 }}>
              Take Handoff Photo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: "#16A34A" }]}
            onPress={() => setScreen("earnings")}
          >
            <Text style={styles.primaryBtnText}>Confirm Delivery Complete</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Earnings Screen
  if (screen === "earnings") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.header, { backgroundColor: "#EA580C" }]}>
          <Text style={styles.headerTitleWhite}>Earnings & Wallet</Text>
          <Text style={styles.headerSubtitleWhite}>Your travel income</Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 20 }}>
          {/* Wallet Balance */}
          <View
            style={[
              styles.card,
              { backgroundColor: "#16A34A", padding: 24, marginBottom: 20 },
            ]}
          >
            <View style={styles.rowBetween}>
              <View>
                <Text style={{ color: "white", opacity: 0.9, marginBottom: 5 }}>
                  Available Balance
                </Text>
                <Text
                  style={{ fontSize: 40, fontWeight: "bold", color: "white" }}
                >
                  ₹{250 + (selectedRequest?.compensation || 0)}
                </Text>
              </View>
              <Wallet size={48} color="rgba(255,255,255,0.5)" />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text style={{ color: "#166534", fontWeight: "bold" }}>
                Withdraw to Bank
              </Text>
            </TouchableOpacity>
          </View>

          {/* Recent Earnings */}
          <View style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.sectionTitle}>Recent Earnings</Text>
              <Text style={{ color: "#2563EB" }}>View All</Text>
            </View>

            <View style={[styles.rowBetween, { marginTop: 15 }]}>
              <View>
                <Text style={{ fontWeight: "600", color: "#111827" }}>
                  Mumbai → Delhi
                </Text>
                <Text style={styles.subText}>Today</Text>
              </View>
              <Text style={{ color: "#16A34A", fontWeight: "bold" }}>
                +₹{selectedRequest?.compensation || 250}
              </Text>
            </View>

            <View
              style={{
                height: 1,
                backgroundColor: "#E5E7EB",
                marginVertical: 15,
              }}
            />

            <View style={styles.rowBetween}>
              <View>
                <Text style={{ fontWeight: "600", color: "#111827" }}>
                  Surat → Vadodara
                </Text>
                <Text style={styles.subText}>Yesterday</Text>
              </View>
              <Text style={{ color: "#16A34A", fontWeight: "bold" }}>
                +₹150
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: "#EA580C" }]}
            onPress={() => setScreen("browse")}
          >
            <Text style={styles.primaryBtnText}>Find More Deliveries</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <View>
      <Text>Error: Unknown Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#111827" },
  headerTitleWhite: { fontSize: 20, fontWeight: "bold", color: "white" },
  headerSubtitleWhite: { fontSize: 14, color: "rgba(255,255,255,0.8)" },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowOpacity: 0.05,
  },
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#111827" },
  subText: { fontSize: 14, color: "#6B7280" },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#374151",
  },
  row: { flexDirection: "row", alignItems: "center" },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  routeContainer: {
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
  },
  primaryBtn: {
    backgroundColor: "#EA580C",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  primaryBtnText: { color: "white", fontSize: 16, fontWeight: "600" },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  label: { fontSize: 12, color: "#6B7280" },
  value: { fontSize: 16, fontWeight: "500", color: "#111827" },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  actionBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    alignItems: "center",
  },
  btnText: { color: "white", fontWeight: "500" },
  otpInput: {
    fontSize: 32,
    letterSpacing: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
  },
  uploadBox: {
    height: 120,
    borderWidth: 1,
    borderColor: "#9CA3AF",
    borderStyle: "dashed",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  smBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 10,
  },
});
