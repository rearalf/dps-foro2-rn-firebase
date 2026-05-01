import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 14,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#16202A",
  },
  subtitle: {
    color: "#5B6775",
    marginTop: -2,
    marginBottom: 4,
  },
  summaryRow: {
    flexDirection: "row",
    gap: 10,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6ECF2",
    borderRadius: 16,
    padding: 12,
    gap: 6,
  },
  summaryLabel: {
    color: "#647382",
    fontSize: 12,
  },
  incomeValue: {
    color: "#1F7A6F",
    fontSize: 18,
    fontWeight: "700",
  },
  expenseValue: {
    color: "#C24747",
    fontSize: 18,
    fontWeight: "700",
  },
  listCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6ECF2",
    borderRadius: 16,
    paddingHorizontal: 14,
  },
  itemRow: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F6",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftColumn: {
    gap: 3,
  },
  itemTitle: {
    color: "#1A2733",
    fontWeight: "700",
    fontSize: 15,
  },
  itemMeta: {
    color: "#758292",
    fontSize: 13,
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: "800",
  },
});

export default styles;
