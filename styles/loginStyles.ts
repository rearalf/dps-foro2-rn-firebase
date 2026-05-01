import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F5EF",
  },
  backgroundOrbTop: {
    position: "absolute",
    width: 340,
    height: 340,
    borderRadius: 170,
    backgroundColor: "#FFD27A",
    top: -110,
    right: -120,
    opacity: 0.38,
  },
  backgroundOrbBottom: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "#6BCFC0",
    bottom: -140,
    left: -90,
    opacity: 0.24,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    gap: 20,
  },
  brandBlock: {
    gap: 8,
  },
  appName: {
    fontSize: 42,
    fontWeight: "800",
    color: "#1E2430",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    color: "#4D5461",
    maxWidth: 300,
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ECE7DC",
    gap: 14,
    shadowColor: "#927F57",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.09,
    shadowRadius: 18,
    elevation: 3,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E2430",
    marginBottom: 4,
  },
  fieldGroup: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4D5461",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D9DEE7",
    borderRadius: 14,
    height: 50,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#1E2430",
    backgroundColor: "#FDFEFF",
  },
  primaryButton: {
    marginTop: 8,
    backgroundColor: "#1F7A6F",
    borderRadius: 14,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
  footerLine: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  footerText: {
    color: "#5A6372",
    fontSize: 14,
  },
  footerLink: {
    color: "#1F7A6F",
    fontWeight: "700",
    fontSize: 14,
  },
});

export default styles;
