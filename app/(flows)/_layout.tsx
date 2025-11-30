import { Stack, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

export default function FlowsLayout() {
  const router = useRouter();

  const renderBackBtn = () => (
    <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
      <ArrowLeft size={24} color="#111827" />
    </TouchableOpacity>
  );

  return (
    <Stack
      screenOptions={{
        headerShown: false, // We usually use custom headers in the screens
        contentStyle: { backgroundColor: "#F9FAFB" },
      }}
    >
      <Stack.Screen name="sender/index" options={{ title: "Sender Flow" }} />
      <Stack.Screen
        name="traveler/index"
        options={{ title: "Traveler Flow" }}
      />
      <Stack.Screen
        name="receiver/index"
        options={{ title: "Receiver Flow" }}
      />
      <Stack.Screen
        name="shopkeeper/index"
        options={{ title: "Shopkeeper Flow" }}
      />
      <Stack.Screen
        name="common/trust-safety"
        options={{ title: "Trust & Safety" }}
      />
    </Stack>
  );
}
