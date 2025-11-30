import { useRouter } from "expo-router";
import {
  ArrowLeft,
  CheckCircle,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  Star,
  Upload,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Mock Image component for fallback
const ImageWithFallback = ({ src, alt, style }) => (
  <View style={[style, { backgroundColor: "#ddd", overflow: "hidden" }]}>
    {src ? (
      <Image source={{ uri: src }} style={{ width: "100%", height: "100%" }} />
    ) : (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 10 }}>{alt}</Text>
      </View>
    )}
  </View>
);

export default function SenderFlow() {
  const router = useRouter();
  const [screen, setScreen] = useState<
    "create" | "matches" | "confirm" | "handoff" | "tracking" | "completion"
  >("create");
  const [itemType, setItemType] = useState("Parcel");
  const [urgency, setUrgency] = useState("Standard");
  const [selectedTraveler, setSelectedTraveler] = useState<any>(null);
  const [deliveryStatus, setDeliveryStatus] = useState("assigned");

  const travelerMatches = [
    {
      id: 1,
      name: "Rajesh Kumar",
      rating: 4.8,
      completedTrips: 47,
      verified: true,
      route: "Mumbai → Delhi",
      trainNo: "12951 Mumbai Rajdhani",
      departureTime: "4:25 PM Today",
      badges: ["Verified ID", "Top Rated", "Insurance"],
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
    {
      id: 2,
      name: "Priya Sharma",
      rating: 4.9,
      completedTrips: 63,
      verified: true,
      route: "Mumbai → Delhi",
      trainNo: "12953 August Kranti Raj",
      departureTime: "5:10 PM Today",
      badges: ["Verified ID", "Premium", "Quick Response"],
      photo:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    },
  ];

  // --- Screens ---

  if (screen === "create") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Send Package</Text>
        </View>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Text style={styles.sectionLabel}>Item Type</Text>
          <View style={styles.row}>
            {["Parcel", "Documents", "Small Goods"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[styles.chip, itemType === type && styles.chipActive]}
                onPress={() => setItemType(type)}
              >
                <Text
                  style={[
                    styles.chipText,
                    itemType === type && styles.chipTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.uploadBox}>
            <Upload size={32} color="#9CA3AF" />
            <Text style={{ color: "#6B7280", marginTop: 10 }}>
              Upload Photo
            </Text>
          </TouchableOpacity>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pickup Station</Text>
            <TextInput style={styles.input} placeholder="e.g. Mumbai Central" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Destination Station</Text>
            <TextInput style={styles.input} placeholder="e.g. New Delhi" />
          </View>

          <Text style={styles.sectionLabel}>Urgency</Text>
          <View style={styles.row}>
            {["Standard", "Express", "Urgent"].map((u) => (
              <TouchableOpacity
                key={u}
                style={[styles.chip, urgency === u && styles.chipActive]}
                onPress={() => setUrgency(u)}
              >
                <Text
                  style={[
                    styles.chipText,
                    urgency === u && styles.chipTextActive,
                  ]}
                >
                  {u}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Offer Price (₹)</Text>
            <TextInput
              style={styles.input}
              placeholder="300"
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => setScreen("matches")}
          >
            <Text style={styles.primaryBtnText}>Find Travelers</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === "matches") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setScreen("create")}>
            <ArrowLeft size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Available Travelers</Text>
        </View>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          {travelerMatches.map((traveler) => (
            <View key={traveler.id} style={styles.card}>
              <View style={styles.row}>
                <ImageWithFallback
                  src={traveler.photo}
                  alt={traveler.name}
                  style={styles.avatarPlaceholder}
                />
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <View style={styles.row}>
                    <Text style={styles.name}>{traveler.name}</Text>
                    {traveler.verified && (
                      <CheckCircle
                        size={16}
                        color="#2563EB"
                        style={{ marginLeft: 5 }}
                      />
                    )}
                  </View>
                  <View style={styles.row}>
                    <Star size={14} color="#CA8A04" fill="#CA8A04" />
                    <Text style={{ marginLeft: 5, color: "#6B7280" }}>
                      {traveler.rating} • {traveler.completedTrips} Trips
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.infoBox}>
                <Text style={{ fontWeight: "bold" }}>{traveler.route}</Text>
                <Text style={{ color: "#6B7280" }}>
                  Departs: {traveler.departureTime}
                </Text>
                <Text style={{ color: "#6B7280" }}>
                  Train: {traveler.trainNo}
                </Text>
              </View>

              <View style={[styles.row, { flexWrap: "wrap", gap: 5 }]}>
                {traveler.badges.map((badge) => (
                  <View
                    key={badge}
                    style={{
                      backgroundColor: "#DCFCE7",
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 12,
                    }}
                  >
                    <Text
                      style={{
                        color: "#166534",
                        fontSize: 12,
                        fontWeight: "500",
                      }}
                    >
                      {badge}
                    </Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => {
                  setSelectedTraveler(traveler);
                  setScreen("confirm");
                }}
              >
                <Text style={styles.primaryBtnText}>Select Traveler</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Confirm Traveler Screen (Traveler Profile & Match Details)
  if (screen === "confirm") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setScreen("matches")}>
            <ArrowLeft size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Confirm Traveler</Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 20 }}>
          {/* Traveler Summary */}
          <View style={styles.card}>
            <View style={styles.row}>
              <ImageWithFallback
                src={selectedTraveler?.photo}
                alt={selectedTraveler?.name}
                style={[styles.avatarPlaceholder, { width: 60, height: 60 }]}
              />
              <View style={{ marginLeft: 15, flex: 1 }}>
                <View style={[styles.row, { marginBottom: 4 }]}>
                  <Text style={[styles.name, { fontSize: 20 }]}>
                    {selectedTraveler?.name}
                  </Text>
                  <CheckCircle
                    size={18}
                    color="#2563EB"
                    style={{ marginLeft: 5 }}
                  />
                </View>
                <View style={styles.row}>
                  <Star size={16} color="#CA8A04" fill="#CA8A04" />
                  <Text style={{ marginLeft: 5, color: "#6B7280" }}>
                    {selectedTraveler?.rating} •{" "}
                    {selectedTraveler?.completedTrips} trips
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#EFF6FF",
                padding: 15,
                borderRadius: 12,
                marginTop: 15,
              }}
            >
              <Text style={{ color: "#374151", marginBottom: 5 }}>
                Route Compatibility
              </Text>
              <View style={[styles.row, { marginBottom: 5 }]}>
                <MapPin size={16} color="#16A34A" />
                <Text style={{ marginLeft: 8, fontWeight: "500" }}>
                  Mumbai Central
                </Text>
              </View>
              <View
                style={{
                  height: 15,
                  borderLeftWidth: 2,
                  borderColor: "#D1D5DB",
                  marginLeft: 7,
                  marginVertical: 2,
                }}
              />
              <View style={styles.row}>
                <MapPin size={16} color="#DC2626" />
                <Text style={{ marginLeft: 8, fontWeight: "500" }}>
                  New Delhi
                </Text>
              </View>
            </View>
          </View>

          {/* Delivery Details */}
          <View style={[styles.card, { marginTop: 15 }]}>
            <Text style={styles.sectionLabel}>Delivery Details</Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Tracking ID</Text>
              <Text style={styles.detailValue}>PT-2411-8734</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Contact Number</Text>
              <Text style={[styles.detailValue, { color: "#2563EB" }]}>
                +91 9XX-XXX-4523 (Masked)
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#FEFCE8",
                padding: 12,
                borderRadius: 8,
                marginTop: 10,
                borderWidth: 1,
                borderColor: "#FEF08A",
              }}
            >
              <Text style={{ color: "#854D0E", fontSize: 13 }}>
                📱 Contact number is masked for privacy. You can call/message
                through the app.
              </Text>
            </View>
          </View>

          {/* Payment Summary */}
          <View style={[styles.card, { marginTop: 15 }]}>
            <Text style={styles.sectionLabel}>Payment Summary</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Compensation to traveler</Text>
              <Text style={styles.detailValue}>₹250</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Platform fee</Text>
              <Text style={styles.detailValue}>₹25</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Insurance</Text>
              <Text style={styles.detailValue}>₹15</Text>
            </View>
            <View
              style={[
                styles.detailRow,
                { borderTopWidth: 1, borderColor: "#E5E7EB", paddingTop: 10 },
              ]}
            >
              <Text style={[styles.detailLabel, { fontWeight: "bold" }]}>
                Total
              </Text>
              <Text style={[styles.detailValue, { fontWeight: "bold" }]}>
                ₹290
              </Text>
            </View>

            <View
              style={[
                styles.row,
                {
                  backgroundColor: "#F0FDF4",
                  padding: 10,
                  borderRadius: 8,
                  marginTop: 10,
                },
              ]}
            >
              <Shield size={16} color="#16A34A" />
              <Text
                style={{
                  marginLeft: 8,
                  color: "#166534",
                  fontSize: 13,
                  fontWeight: "500",
                }}
              >
                Protected with ₹5000 insurance
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footerAction}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => setScreen("handoff")}
          >
            <Text style={styles.primaryBtnText}>
              Confirm & Proceed to Handoff
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Handoff Screen (OTP & Pickup)
  if (screen === "handoff") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Handoff to Traveler</Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 20 }}>
          {/* Traveler Info */}
          <View style={styles.card}>
            <View style={styles.row}>
              <ImageWithFallback
                src={selectedTraveler?.photo}
                alt={selectedTraveler?.name}
                style={[styles.avatarPlaceholder, { width: 50, height: 50 }]}
              />
              <View style={{ marginLeft: 15 }}>
                <Text style={styles.name}>{selectedTraveler?.name}</Text>
                <Text style={{ color: "#6B7280", fontSize: 13 }}>
                  Train departs at 4:25 PM
                </Text>
              </View>
            </View>

            <View style={[styles.row, { marginTop: 15, gap: 10 }]}>
              <TouchableOpacity
                style={[
                  styles.actionBtn,
                  { backgroundColor: "#2563EB", flex: 1 },
                ]}
              >
                <Phone size={18} color="white" />
                <Text style={styles.actionBtnText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.actionBtn,
                  { backgroundColor: "#16A34A", flex: 1 },
                ]}
              >
                <MessageCircle size={18} color="white" />
                <Text style={styles.actionBtnText}>Chat</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Pickup Location */}
          <View style={[styles.card, { marginTop: 15 }]}>
            <Text style={styles.sectionLabel}>Pickup Location</Text>
            <View style={styles.mapPlaceholder}>
              <MapPin size={32} color="#DC2626" />
              <Text
                style={{
                  marginTop: 10,
                  fontWeight: "bold",
                  color: "#374151",
                }}
              >
                Mumbai Central Station
              </Text>
              <Text style={{ color: "#6B7280", fontSize: 12 }}>
                Platform 3, Near Coach B3
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.actionBtn,
                {
                  backgroundColor: "#DBEAFE",
                  marginTop: 10,
                  borderColor: "transparent",
                },
              ]}
            >
              <Text style={{ color: "#1E40AF", fontWeight: "600" }}>
                Open in Maps
              </Text>
            </TouchableOpacity>
          </View>

          {/* Pickup OTP */}
          <View style={[styles.card, { marginTop: 15 }]}>
            <Text style={styles.sectionLabel}>Pickup Verification</Text>
            <View
              style={{
                backgroundColor: "#EFF6FF",
                borderWidth: 2,
                borderColor: "#BFDBFE",
                borderRadius: 12,
                padding: 20,
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <Text style={{ color: "#374151", marginBottom: 10 }}>
                Share this OTP with traveler
              </Text>
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: "bold",
                  color: "#2563EB",
                  letterSpacing: 8,
                }}
              >
                8374
              </Text>
              <Text style={{ color: "#6B7280", fontSize: 12, marginTop: 10 }}>
                Do not share until you meet the traveler
              </Text>
            </View>

            <View style={{ gap: 15 }}>
              <View style={styles.row}>
                <View style={styles.stepNum}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>1</Text>
                </View>
                <Text style={styles.stepText}>
                  Verify traveler's identity (check ID)
                </Text>
              </View>
              <View style={styles.row}>
                <View style={styles.stepNum}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>2</Text>
                </View>
                <Text style={styles.stepText}>
                  Hand over the parcel to traveler
                </Text>
              </View>
              <View style={styles.row}>
                <View style={styles.stepNum}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>3</Text>
                </View>
                <Text style={styles.stepText}>
                  Share OTP after successful handoff
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.card, { marginTop: 15, marginBottom: 100 }]}>
            <Text style={styles.sectionLabel}>Can't make it?</Text>
            <Text style={{ color: "#6B7280", marginBottom: 15 }}>
              We can send a delivery partner to pickup from your location
            </Text>
            <TouchableOpacity
              style={[
                styles.actionBtn,
                {
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: "#2563EB",
                },
              ]}
            >
              <Text style={{ color: "#2563EB", fontWeight: "600" }}>
                Request Delivery Partner
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.footerAction}>
          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: "#16A34A" }]}
            onPress={() => {
              setDeliveryStatus("in-transit");
              setScreen("tracking");
            }}
          >
            <Text style={styles.primaryBtnText}>Confirm Handoff Complete</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Tracking Screen
  if (screen === "tracking") {
    const statusSteps = [
      { id: "assigned", label: "Assigned", completed: true },
      { id: "picked", label: "Item Picked", completed: true },
      {
        id: "in-transit",
        label: "In Transit",
        completed:
          deliveryStatus === "in-transit" ||
          deliveryStatus === "arriving" ||
          deliveryStatus === "delivered",
      },
      {
        id: "arriving",
        label: "Arriving Soon",
        completed:
          deliveryStatus === "arriving" || deliveryStatus === "delivered",
      },
      {
        id: "delivered",
        label: "Delivered",
        completed: deliveryStatus === "delivered",
      },
    ];

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Track Delivery</Text>
          <Text style={{ color: "#6B7280" }}>Tracking ID: PT-2411-8734</Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 20 }}>
          {/* Status Timeline */}
          <View style={styles.card}>
            <Text style={[styles.sectionLabel, { marginBottom: 20 }]}>
              Delivery Status
            </Text>
            <View style={{ gap: 0 }}>
              {statusSteps.map((step, idx) => (
                <View key={step.id} style={{ flexDirection: "row" }}>
                  <View style={{ alignItems: "center", marginRight: 15 }}>
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        backgroundColor: step.completed ? "#16A34A" : "#E5E7EB",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1,
                      }}
                    >
                      {step.completed && (
                        <CheckCircle size={14} color="white" />
                      )}
                    </View>
                    {idx < statusSteps.length - 1 && (
                      <View
                        style={{
                          width: 2,
                          height: 40,
                          backgroundColor: step.completed
                            ? "#16A34A"
                            : "#E5E7EB",
                          marginVertical: -2,
                        }}
                      />
                    )}
                  </View>
                  <View style={{ paddingBottom: 20 }}>
                    <Text
                      style={{
                        fontWeight: step.completed ? "600" : "400",
                        color: step.completed ? "#111827" : "#9CA3AF",
                        fontSize: 16,
                      }}
                    >
                      {step.label}
                    </Text>
                    {step.completed && step.id === "in-transit" && (
                      <Text style={{ color: "#6B7280", fontSize: 12 }}>
                        Traveling on {selectedTraveler?.trainNo}
                      </Text>
                    )}
                  </View>
                </View>
              ))}
            </View>

            <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => setDeliveryStatus("arriving")}
                style={{
                  padding: 8,
                  backgroundColor: "#DBEAFE",
                  borderRadius: 8,
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#1E40AF", fontSize: 12 }}>
                  Simulate Arriving
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setDeliveryStatus("delivered")}
                style={{
                  padding: 8,
                  backgroundColor: "#DCFCE7",
                  borderRadius: 8,
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#166534", fontSize: 12 }}>
                  Simulate Delivered
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Live Map Placeholder */}
          <View style={[styles.card, { marginTop: 15 }]}>
            <View style={styles.row}>
              <MapPin size={20} color="#2563EB" />
              <Text
                style={[
                  styles.sectionLabel,
                  { marginBottom: 0, marginLeft: 8 },
                ]}
              >
                Live Location
              </Text>
            </View>
            <View
              style={{
                height: 200,
                backgroundColor: "#EFF6FF",
                borderRadius: 12,
                marginTop: 15,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: "#DBEAFE",
                  borderRadius: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 4,
                  borderColor: "white",
                }}
              >
                <MapPin size={30} color="#2563EB" />
              </View>
              <Text
                style={{
                  marginTop: 10,
                  fontWeight: "600",
                  color: "#1E40AF",
                }}
              >
                Approaching Surat Station
              </Text>
              <Text style={{ color: "#6B7280", fontSize: 12 }}>
                ETA: 45 minutes
              </Text>
            </View>
          </View>

          {/* Actions */}
          <View style={[styles.card, { marginTop: 15, marginBottom: 100 }]}>
            <Text style={styles.sectionLabel}>Quick Actions</Text>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => setScreen("completion")}
            >
              <Text style={styles.menuText}>📋 View Delivery Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>⚠️ Report Issue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.footerAction}>
          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: "#2563EB" }]}
            onPress={() => setScreen("completion")}
          >
            <Text style={styles.primaryBtnText}>View Completion Screen →</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Completion Screen
  if (screen === "completion") {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            padding: 20,
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100%",
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: "#16A34A",
              borderRadius: 40,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <CheckCircle size={40} color="white" />
          </View>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#111827" }}>
            Delivered Successfully!
          </Text>
          <Text
            style={{
              color: "#6B7280",
              textAlign: "center",
              marginTop: 10,
              marginBottom: 30,
            }}
          >
            Your parcel has been delivered to the receiver
          </Text>

          <View style={[styles.card, { width: "100%" }]}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Tracking ID</Text>
              <Text style={styles.detailValue}>PT-2411-8734</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Delivered by</Text>
              <Text style={styles.detailValue}>{selectedTraveler?.name}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Time Taken</Text>
              <Text style={styles.detailValue}>16 hours</Text>
            </View>
          </View>

          <View style={[styles.card, { width: "100%", marginTop: 15 }]}>
            <Text style={[styles.sectionLabel, { textAlign: "center" }]}>
              Rate Your Experience
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 10,
                marginVertical: 15,
              }}
            >
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={32} color="#FACC15" fill="#FACC15" />
              ))}
            </View>
            <TextInput
              placeholder="Share your feedback..."
              style={[styles.input, { height: 80, textAlignVertical: "top" }]}
              multiline
            />
          </View>

          <TouchableOpacity
            style={[styles.primaryBtn, { width: "100%", marginTop: 20 }]}
            onPress={() => setScreen("create")}
          >
            <Text style={styles.primaryBtnText}>Send Another Parcel</Text>
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
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 10,
    color: "#374151",
  },
  row: { flexDirection: "row", alignItems: "center" },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginRight: 8,
  },
  chipActive: { backgroundColor: "#EFF6FF", borderColor: "#2563EB" },
  chipText: { color: "#374151" },
  chipTextActive: { color: "#2563EB", fontWeight: "600" },
  uploadBox: {
    height: 100,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#9CA3AF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#F9FAFB",
  },
  inputGroup: { marginVertical: 10 },
  label: { marginBottom: 5, color: "#374151", fontWeight: "500" },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  primaryBtn: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  primaryBtnText: { color: "white", fontSize: 16, fontWeight: "600" },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  name: { fontSize: 16, fontWeight: "600", color: "#111827" },
  infoBox: {
    backgroundColor: "#F3F4F6",
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: { color: "#6B7280" },
  detailValue: { fontWeight: "500", color: "#111827" },
  footerAction: {
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
  },
  actionBtn: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  actionBtnText: { color: "white", fontWeight: "600" },
  mapPlaceholder: {
    height: 150,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  stepNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  stepText: { color: "#374151" },
  menuItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#F3F4F6",
  },
  menuText: { fontSize: 16, color: "#374151" },
});
