import { useRouter } from "expo-router";
import { ArrowRight, Zap } from "lucide-react-native";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DevMenu() {
  const router = useRouter();

  const menuItems = [
    { label: "Onboarding Flow", route: "/(auth)/onboarding", color: "#2563EB" },
    { label: "Sender Flow", route: "/(flows)/sender", color: "#16A34A" },
    { label: "Traveler Flow", route: "/(flows)/traveler", color: "#EA580C" },
    { label: "Receiver Flow", route: "/(flows)/receiver", color: "#7C3AED" },
    {
      label: "Shopkeeper Flow",
      route: "/(flows)/shopkeeper",
      color: "#D97706",
    },
    // FIXED: Added '/common' to the path because it is inside the 'common' folder
    {
      label: "Trust & Safety",
      route: "/(flows)/common/trust-safety",
      color: "#DC2626",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Zap color="#F59E0B" size={28} />
        <Text style={styles.headerTitle}>YatriDrop Dev Menu</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subHeader}>Select a flow to test:</Text>

        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { borderLeftColor: item.color }]}
            onPress={() => router.push(item.route as any)}
          >
            <View>
              <Text style={styles.cardTitle}>{item.label}</Text>
              <Text style={styles.cardSubtitle}>Tap to launch</Text>
            </View>
            <ArrowRight color="#9CA3AF" size={20} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  header: {
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#111827" },
  scrollContent: { padding: 20 },
  subHeader: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 15,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderLeftWidth: 5,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#1F2937" },
  cardSubtitle: { fontSize: 12, color: "#9CA3AF", marginTop: 2 },
});
