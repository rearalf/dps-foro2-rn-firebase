import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF8F7",
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
    color: "#2B1F1F",
  },
  closeLink: {
    color: "#8C5454",
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F0DEDB",
    borderRadius: 18,
    padding: 16,
    gap: 12,
  },
  fieldGroup: {
    gap: 6,
  },
  label: {
    color: "#6B4A4A",
    fontWeight: "600",
    fontSize: 13,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8D2CF",
    borderRadius: 12,
    minHeight: 48,
    paddingHorizontal: 12,
    color: "#301F1F",
    backgroundColor: "#FFFEFE",
  },
  inputArea: {
    paddingTop: 12,
    textAlignVertical: "top",
    minHeight: 96,
  },
  errorText: {
    color: "#B33131",
    fontWeight: "600",
    fontSize: 13,
  },
  primaryButton: {
    marginTop: 4,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#C24747",
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
    backgroundColor: "#F5E7E5",
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryText: {
    color: "#714949",
    fontWeight: "700",
  },
});

export default styles;
