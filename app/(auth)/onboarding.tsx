import { useRouter } from "expo-router";
import {
  CheckCircle,
  ChevronDown,
  DollarSign,
  MapPin,
  Phone,
  Shield,
  TrainFront,
  Upload,
  User,
} from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function OnboardingScreen() {
  const router = useRouter();
  const [screen, setScreen] = useState<
    "splash" | "slides" | "signup" | "otp" | "role" | "kyc"
  >("splash");
  const [slideIndex, setSlideIndex] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [selectedRole, setSelectedRole] = useState("");

  // KYC State
  const [kycData, setKycData] = useState({
    fullName: "",
    idType: "",
    idNumber: "",
  });
  const [showIdDropdown, setShowIdDropdown] = useState(false);

  const otpRefs = useRef<Array<TextInput | null>>([]);

  // Navigation Logic based on Role
  const handleCompleteOnboarding = () => {
    switch (selectedRole) {
      case "sender":
        router.replace("/(flows)/sender");
        break;
      case "traveler":
        router.replace("/(flows)/traveler");
        break;
      case "receiver":
        router.replace("/(flows)/receiver");
        break;
      case "shopkeeper":
        router.replace("/(flows)/shopkeeper");
        break;
      default:
        router.replace("/(tabs)");
    }
  };

  const slides = [
    {
      icon: <TrainFront size={64} color="white" />,
      title: "Send parcels via verified travelers",
      desc: "Connect with travelers on train journeys to deliver your parcels safely and affordably.",
      color: "#3B82F6",
    },
    {
      icon: <Shield size={64} color="white" />,
      title: "Safe handoffs",
      desc: "Every user is verified with KYC. Track handoffs with OTP verification and photo proof.",
      color: "#22C55E",
    },
    {
      icon: <MapPin size={64} color="white" />,
      title: "Real-time tracking",
      desc: "Know exactly where your parcel is throughout the journey with live GPS tracking.",
      color: "#A855F7",
    },
    {
      icon: <DollarSign size={64} color="white" />,
      title: "Compensation to travelers",
      desc: "Travelers earn money for deliveries they make along their existing routes.",
      color: "#F97316",
    },
  ];

  const roles = [
    {
      id: "sender",
      label: "Sender",
      desc: "I want to send parcels",
      icon: "📦",
    },
    {
      id: "traveler",
      label: "Traveler",
      desc: "I travel and can deliver",
      icon: "🚆",
    },
    {
      id: "receiver",
      label: "Receiver",
      desc: "I receive parcels",
      icon: "📥",
    },
    {
      id: "shopkeeper",
      label: "Shopkeeper Partner",
      desc: "I can hold parcels temporarily",
      icon: "🏪",
    },
  ];

  const idTypes = ["Aadhaar Card", "PAN Card", "Driving License", "Passport"];

  // --- Screens ---

  if (screen === "splash") {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <View style={styles.splashBg}>
          {/* Gradient simulation with View */}
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: "#4F46E5", opacity: 0.9 },
            ]}
          />
        </View>

        <View style={styles.contentCenter}>
          <View
            style={[styles.splashIcon, { transform: [{ rotate: "-12deg" }] }]}
          >
            <TrainFront size={48} color="#4F46E5" />
          </View>
          <Text style={styles.splashTitle}>ParcelTravel</Text>
          <Text style={styles.splashSubtitle}>
            Smart parcel delivery via train travelers
          </Text>
          <TouchableOpacity
            style={styles.whiteBtn}
            onPress={() => setScreen("slides")}
          >
            <Text style={styles.blueBtnText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (screen === "slides") {
    const slide = slides[slideIndex];
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={[styles.slideCard, { backgroundColor: slide.color }]}>
            {slide.icon}
          </View>

          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.desc}>{slide.desc}</Text>

          <View style={styles.dotsContainer}>
            {slides.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === slideIndex && styles.activeDot]}
              />
            ))}
          </View>

          <View style={styles.row}>
            {slideIndex > 0 && (
              <TouchableOpacity
                onPress={() => setSlideIndex((i) => i - 1)}
                style={styles.secondaryBtn}
              >
                <Text style={styles.secondaryBtnText}>Back</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.primaryBtn, { flex: 1, marginLeft: 10 }]}
              onPress={() =>
                slideIndex < 3
                  ? setSlideIndex((i) => i + 1)
                  : setScreen("signup")
              }
            >
              <Text style={styles.primaryBtnText}>
                {slideIndex < 3 ? "Next" : "Sign Up"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => setScreen("signup")}
            style={{ marginTop: 20 }}
          >
            <Text style={{ color: "#6B7280", textAlign: "center" }}>Skip</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (screen === "signup") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.iconCircle}>
            <Phone size={32} color="#2563EB" />
          </View>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.desc}>
            Enter your phone number to get started
          </Text>

          <View style={styles.inputLabelContainer}>
            <Text style={styles.inputLabel}>Phone Number</Text>
          </View>
          <View style={styles.inputRow}>
            <View style={styles.prefixBox}>
              <Text style={styles.prefixText}>+91</Text>
            </View>
            <TextInput
              style={styles.phoneInput}
              placeholder="98765 43210"
              keyboardType="phone-pad"
              maxLength={10}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.primaryBtn,
              phoneNumber.length !== 10 && styles.disabledBtn,
            ]}
            disabled={phoneNumber.length !== 10}
            onPress={() => setScreen("otp")}
          >
            <Text style={styles.primaryBtnText}>Send OTP</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            By continuing, you agree to our Terms & Privacy Policy
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (screen === "otp") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={[styles.iconCircle, { backgroundColor: "#DCFCE7" }]}>
            <CheckCircle size={32} color="#16A34A" />
          </View>
          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.desc}>
            Enter the 6-digit code sent to{"\n"}+91 {phoneNumber}
          </Text>

          <View style={styles.otpRow}>
            {otp.map((digit, idx) => (
              <TextInput
                key={idx}
                ref={(ref) => (otpRefs.current[idx] = ref)}
                style={styles.otpBox}
                maxLength={1}
                keyboardType="numeric"
                value={digit}
                onChangeText={(val) => {
                  const newOtp = [...otp];
                  newOtp[idx] = val;
                  setOtp(newOtp);
                  if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
                }}
              />
            ))}
          </View>

          <TouchableOpacity
            style={[
              styles.primaryBtn,
              otp.some((d) => !d) && styles.disabledBtn,
            ]}
            disabled={otp.some((d) => !d)}
            onPress={() => setScreen("role")}
          >
            <Text style={styles.primaryBtnText}>Verify & Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginTop: 20 }}>
            <Text style={{ color: "#2563EB", textAlign: "center" }}>
              Resend OTP (00:45)
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (screen === "role") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ padding: 20 }}>
          <Text style={[styles.title, { marginTop: 20 }]}>
            Choose Your Role
          </Text>
          <Text style={[styles.desc, { marginBottom: 30 }]}>
            You can change this later in settings
          </Text>

          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            {roles.map((r) => (
              <TouchableOpacity
                key={r.id}
                style={[
                  styles.roleCard,
                  selectedRole === r.id && styles.roleCardActive,
                ]}
                onPress={() => setSelectedRole(r.id)}
              >
                <View style={styles.row}>
                  <Text style={{ fontSize: 24, marginRight: 15 }}>
                    {r.icon}
                  </Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.roleTitle}>{r.label}</Text>
                    <Text style={styles.roleDesc}>{r.desc}</Text>
                  </View>
                  {selectedRole === r.id && (
                    <CheckCircle size={24} color="#2563EB" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={[styles.primaryBtn, !selectedRole && styles.disabledBtn]}
            disabled={!selectedRole}
            onPress={() => setScreen("kyc")}
          >
            <Text style={styles.primaryBtnText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (screen === "kyc") {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <View style={{ alignItems: "center", marginBottom: 30 }}>
            <View style={[styles.iconCircle, { backgroundColor: "#F3E8FF" }]}>
              <Shield size={32} color="#9333EA" />
            </View>
            <Text style={[styles.title, { marginTop: 15 }]}>
              Verify Your Identity
            </Text>
            <Text style={styles.desc}>
              This helps us keep the community safe and trusted
            </Text>
          </View>

          {/* Full Name */}
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={kycData.fullName}
              onChangeText={(t) => setKycData({ ...kycData, fullName: t })}
            />
          </View>

          {/* ID Type Dropdown */}
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>ID Type</Text>
            <TouchableOpacity
              style={[
                styles.input,
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                },
              ]}
              onPress={() => setShowIdDropdown(!showIdDropdown)}
            >
              <Text
                style={{
                  color: kycData.idType ? "black" : "#9CA3AF",
                  fontSize: 16,
                }}
              >
                {kycData.idType || "Select ID type"}
              </Text>
              <ChevronDown size={20} color="#6B7280" />
            </TouchableOpacity>

            {showIdDropdown && (
              <View style={styles.dropdownList}>
                {idTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setKycData({ ...kycData, idType: type });
                      setShowIdDropdown(false);
                    }}
                  >
                    <Text>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* ID Number */}
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>ID Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter ID number"
              value={kycData.idNumber}
              onChangeText={(t) => setKycData({ ...kycData, idNumber: t })}
            />
          </View>

          {/* Upload ID Photo */}
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Upload ID Photo</Text>
            <TouchableOpacity style={styles.uploadBox}>
              <Upload size={32} color="#9CA3AF" />
              <Text style={styles.uploadTextMain}>
                Tap to upload ID document
              </Text>
              <Text style={styles.uploadTextSub}>Max size 5MB (JPEG, PNG)</Text>
            </TouchableOpacity>
          </View>

          {/* Selfie */}
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Selfie with ID</Text>
            <TouchableOpacity style={styles.uploadBox}>
              <User size={32} color="#9CA3AF" />
              <Text style={styles.uploadTextMain}>
                Take a selfie holding your ID
              </Text>
              <Text style={styles.uploadTextSub}>
                For verification purposes
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              🔒 Your data is encrypted and secure. We use it only for
              verification purposes.
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.primaryBtn, { marginTop: 10 }]}
            onPress={handleCompleteOnboarding}
          >
            <Text style={styles.primaryBtnText}>Submit for Verification</Text>
          </TouchableOpacity>

          <Text style={styles.footerNote}>
            Verification typically takes 24-48 hours
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  splashBg: { ...StyleSheet.absoluteFillObject, backgroundColor: "#4F46E5" },
  contentCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    zIndex: 10,
  },
  splashIcon: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  splashTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  splashSubtitle: {
    color: "#E0E7FF",
    fontSize: 16,
    marginBottom: 40,
    textAlign: "center",
  },
  whiteBtn: {
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
  },
  blueBtnText: { color: "#4F46E5", fontWeight: "bold", fontSize: 16 },

  contentContainer: { padding: 24, flex: 1, justifyContent: "center" },
  slideCard: {
    padding: 48,
    borderRadius: 24,
    marginBottom: 24,
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 12,
  },
  desc: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D1D5DB",
    marginHorizontal: 4,
  },
  activeDot: { backgroundColor: "#2563EB", width: 32 },

  primaryBtn: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
  },
  primaryBtnText: { color: "white", fontWeight: "bold", fontSize: 16 },
  secondaryBtn: {
    padding: 16,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    width: 100,
    alignItems: "center",
  },
  secondaryBtnText: { color: "#374151", fontWeight: "600" },
  disabledBtn: { backgroundColor: "#9CA3AF" },

  iconCircle: {
    width: 64,
    height: 64,
    backgroundColor: "#DBEAFE",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  inputLabelContainer: { alignSelf: "flex-start", width: "100%" },
  inputRow: { flexDirection: "row", marginBottom: 24 },
  prefixBox: {
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRightWidth: 0,
  },
  prefixText: { fontSize: 16, color: "#374151" },
  phoneInput: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    fontSize: 16,
  },
  footerText: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 24,
    fontSize: 14,
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  otpBox: {
    width: 48,
    height: 56,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 24,
    backgroundColor: "white",
    color: "#111827",
  },

  roleCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  roleCardActive: { borderColor: "#2563EB", backgroundColor: "#EFF6FF" },
  row: { flexDirection: "row", alignItems: "center" },
  roleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  roleDesc: { fontSize: 14, color: "#6B7280" },

  formGroup: { marginBottom: 20 },
  input: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#111827",
  },
  uploadBox: {
    height: 140,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  uploadTextMain: { color: "#4B5563", marginTop: 12, fontWeight: "500" },
  uploadTextSub: { color: "#9CA3AF", fontSize: 13, marginTop: 4 },
  infoBox: {
    backgroundColor: "#EFF6FF",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    marginBottom: 24,
  },
  infoText: { color: "#1E40AF", fontSize: 13, lineHeight: 20 },
  footerNote: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 16,
    fontSize: 13,
  },

  dropdownList: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    marginTop: 4,
    zIndex: 100,
    elevation: 5,
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
});
