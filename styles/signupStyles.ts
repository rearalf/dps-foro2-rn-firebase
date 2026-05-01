import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#E9F3F9",
  },
  gridPattern: {
    position: "absolute",
    inset: 0,
    borderColor: "rgba(30, 36, 48, 0.05)",
    borderWidth: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    gap: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#10222F",
  },
  subtitle: {
    fontSize: 15,
    color: "#446072",
    marginBottom: 8,
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    gap: 12,
    borderWidth: 1,
    borderColor: "#D8E4ED",
  },
  fieldGroup: {
    gap: 5,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#365063",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D0DCE8",
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 14,
    backgroundColor: "#FDFEFF",
    color: "#10222F",
  },
  primaryButton: {
    marginTop: 8,
    backgroundColor: "#0D5C8D",
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
  footerLine: {
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  footerText: {
    color: "#4E6A7D",
  },
  footerLink: {
    color: "#0D5C8D",
    fontWeight: "700",
  },
});

export default styles;
