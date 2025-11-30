import { useRouter } from "expo-router";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  FileText,
  Shield,
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

export default function TrustSafetyScreen() {
  const router = useRouter();
  const [screen, setScreen] = useState("overview"); // overview, report, guidelines

  if (screen === "overview") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.header, { backgroundColor: "#4F46E5" }]}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginRight: 10 }}
          >
            <ArrowLeft color="white" size={24} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitleWhite}>Trust & Safety</Text>
            <Text style={styles.headerSubtitleWhite}>
              Your security is our priority
            </Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={{ padding: 20 }}>
          {/* Safety Score */}
          <View style={styles.card}>
            <View style={styles.rowBetween}>
              <View>
                <Text style={styles.cardTitle}>Safety Score</Text>
                <Text style={styles.subText}>You are a verified user</Text>
              </View>
              <Shield size={32} color="#4F46E5" />
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: "95%" }]} />
            </View>
            <Text
              style={{
                textAlign: "right",
                color: "#16A34A",
                fontWeight: "bold",
                marginTop: 5,
              }}
            >
              95%
            </Text>
          </View>

          {/* Menu */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Safety Features</Text>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => setScreen("report")}
            >
              <View style={[styles.iconBox, { backgroundColor: "#FEE2E2" }]}>
                <AlertTriangle size={20} color="#DC2626" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.menuTitle}>Report Issue</Text>
                <Text style={styles.menuDesc}>Safety concerns or problems</Text>
              </View>
              <ArrowRight size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => setScreen("guidelines")}
            >
              <View style={[styles.iconBox, { backgroundColor: "#E0E7FF" }]}>
                <FileText size={20} color="#4F46E5" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.menuTitle}>Safety Guidelines</Text>
                <Text style={styles.menuDesc}>
                  Best practices for travelers
                </Text>
              </View>
              <ArrowRight size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <View style={[styles.menuItem, { borderBottomWidth: 0 }]}>
              <View style={[styles.iconBox, { backgroundColor: "#DCFCE7" }]}>
                <Shield size={20} color="#16A34A" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.menuTitle}>Insurance</Text>
                <Text style={styles.menuDesc}>Covered up to ₹5,000</Text>
              </View>
              <CheckCircle size={20} color="#16A34A" />
            </View>
          </View>

          <View
            style={[
              styles.card,
              {
                backgroundColor: "#EEF2FF",
                borderColor: "#4F46E5",
                borderWidth: 1,
              },
            ]}
          >
            <Text
              style={{ color: "#4F46E5", fontWeight: "600", marginBottom: 5 }}
            >
              Did you know?
            </Text>
            <Text style={{ color: "#374151", fontSize: 13 }}>
              All travelers on our platform undergo a 3-step government ID
              verification process.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === "report") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.header, { backgroundColor: "#DC2626" }]}>
          <TouchableOpacity onPress={() => setScreen("overview")}>
            <ArrowLeft color="white" size={24} />
          </TouchableOpacity>
          <Text style={[styles.headerTitleWhite, { marginLeft: 10 }]}>
            Report Issue
          </Text>
        </View>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Text style={styles.label}>What's the issue?</Text>
          {[
            "Item Damaged",
            "Item Not Received",
            "Unsafe Behavior",
            "Other",
          ].map((issue) => (
            <TouchableOpacity key={issue} style={styles.radioItem}>
              <Text>{issue}</Text>
            </TouchableOpacity>
          ))}

          <Text style={[styles.label, { marginTop: 20 }]}>Description</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            placeholder="Describe what happened..."
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={[
              styles.primaryBtn,
              { backgroundColor: "#DC2626", marginTop: 20 },
            ]}
          >
            <Text style={styles.primaryBtnText}>Submit Report</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === "guidelines") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setScreen("overview")}>
            <ArrowLeft color="#374151" size={24} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { marginLeft: 10 }]}>
            Guidelines
          </Text>
        </View>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>For Senders</Text>
            <View style={styles.bulletItem}>
              <View style={styles.bullet} />
              <Text style={styles.bulletText}>Pack items securely.</Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.bullet} />
              <Text style={styles.bulletText}>
                Verify traveler ID before handoff.
              </Text>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>For Travelers</Text>
            <View style={styles.bulletItem}>
              <View style={styles.bullet} />
              <Text style={styles.bulletText}>
                Do not open sealed packages.
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <View style={styles.bullet} />
              <Text style={styles.bulletText}>
                Only accept items matching description.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#111827" },
  headerTitleWhite: { fontSize: 20, fontWeight: "bold", color: "white" },
  headerSubtitleWhite: { fontSize: 14, color: "rgba(255,255,255,0.8)" },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowOpacity: 0.05,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#111827" },
  subText: { fontSize: 14, color: "#6B7280" },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressBarBg: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    marginTop: 15,
  },
  progressBarFill: { height: 8, backgroundColor: "#16A34A", borderRadius: 4 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 15 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#F3F4F6",
    gap: 15,
  },
  menuTitle: { fontSize: 16, fontWeight: "500" },
  menuDesc: { fontSize: 12, color: "#6B7280" },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#374151",
  },
  radioItem: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  textArea: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 15,
    height: 120,
  },
  primaryBtn: { padding: 16, borderRadius: 30, alignItems: "center" },
  primaryBtnText: { color: "white", fontSize: 16, fontWeight: "600" },
  bulletItem: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#374151",
    marginRight: 10,
  },
  bulletText: { color: "#374151" },
});
