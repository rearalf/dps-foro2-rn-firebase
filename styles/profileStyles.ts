import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F8F7",
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 14,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#17212B",
  },
  subtitle: {
    color: "#5D6A79",
    marginTop: -4,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5EBF1",
    borderRadius: 18,
    padding: 18,
    alignItems: "center",
    gap: 6,
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#D6F0EA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1F7A6F",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1B2733",
  },
  email: {
    color: "#667586",
  },
  errorText: {
    color: "#B42318",
    fontSize: 13,
    fontWeight: "600",
  },
  successText: {
    color: "#067647",
    fontSize: 13,
    fontWeight: "600",
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5EBF1",
    borderRadius: 14,
    padding: 14,
    gap: 10,
  },
  sectionTitle: {
    color: "#20303E",
    fontSize: 16,
    fontWeight: "700",
  },
  fieldGroup: {
    gap: 6,
  },
  fieldLabel: {
    color: "#4E5D6D",
    fontSize: 13,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D6DEE8",
    borderRadius: 14,
    height: 48,
    paddingHorizontal: 12,
    color: "#1D2A37",
    backgroundColor: "#FDFEFF",
  },
  primaryButton: {
    marginTop: 2,
    backgroundColor: "#1F7A6F",
    borderRadius: 12,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  dangerCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F3D8D8",
    borderRadius: 14,
    padding: 14,
    gap: 10,
  },
  dangerHint: {
    color: "#8A2F2F",
    fontSize: 13,
    lineHeight: 18,
  },
  deleteButton: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#C24747",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF6F6",
  },
  deleteText: {
    color: "#B42318",
    fontWeight: "700",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  logoutButton: {
    height: 50,
    borderRadius: 12,
    backgroundColor: "#C24747",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
});

export default styles;
