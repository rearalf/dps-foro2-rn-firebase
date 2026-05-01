import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4FBF8",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 14,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#1B2A25",
  },
  closeLink: {
    color: "#3B6C5F",
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D7EDE5",
    borderRadius: 18,
    padding: 16,
    gap: 12,
  },
  fieldGroup: {
    gap: 6,
  },
  label: {
    color: "#44685C",
    fontWeight: "600",
    fontSize: 13,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CFE6DD",
    borderRadius: 12,
    minHeight: 48,
    paddingHorizontal: 12,
    color: "#1E312C",
    backgroundColor: "#FFFFFF",
  },
  inputArea: {
    paddingTop: 12,
    textAlignVertical: "top",
    minHeight: 96,
  },
  primaryButton: {
    marginTop: 4,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#1F7A6F",
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
  secondaryButton: {
    height: 48,
    borderRadius: 12,
    backgroundColor: "#DFF3ED",
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryText: {
    color: "#2A5A4D",
    fontWeight: "700",
  },
});

export default styles;
