import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F6F4",
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 30,
    fontWeight: "800",
    color: "#17212B",
  },
  subtitle: {
    fontSize: 14,
    color: "#4F5D6C",
    marginTop: 2,
  },
  logoutLink: {
    color: "#2E6775",
    fontWeight: "700",
  },
  balanceCard: {
    backgroundColor: "#17212B",
    borderRadius: 24,
    padding: 18,
    gap: 16,
  },
  balanceLabel: {
    color: "#B8C3CF",
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  balanceAmount: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "800",
  },
  kpiRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  kpiBox: {
    flex: 1,
    gap: 4,
  },
  kpiDivider: {
    width: 1,
    alignSelf: "stretch",
    backgroundColor: "#324356",
    marginHorizontal: 10,
  },
  kpiTitle: {
    color: "#A8B8C8",
    fontSize: 12,
  },
  kpiValue: {
    fontSize: 17,
    fontWeight: "700",
  },
  incomeColor: {
    color: "#68D8B8",
  },
  expenseColor: {
    color: "#F3A5A5",
  },
  quickActions: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  actionButton: {
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  expenseAction: {
    backgroundColor: "#FFD9D9",
  },
  incomeAction: {
    backgroundColor: "#D7F6EC",
  },
  actionText: {
    color: "#22313F",
    fontWeight: "700",
    fontSize: 14,
  },
  sectionHeader: {
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E2A36",
  },
  sectionLink: {
    color: "#1E6A7D",
    fontWeight: "700",
  },
  listCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#E4EAF0",
  },
  listItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F6",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A2733",
  },
  itemType: {
    marginTop: 2,
    color: "#738191",
    fontSize: 13,
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: "700",
  },
  fabButton: {
    position: "absolute",
    right: 20,
    bottom: 28,
    backgroundColor: "#1F7A6F",
    borderRadius: 28,
    minWidth: 112,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
    shadowColor: "#124A42",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 8,
  },
  fabText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 15,
  },
});

export default styles;
