import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F8F7",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 14,
  },
  title: {
    fontSize: 30,
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
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5EBF1",
    borderRadius: 14,
    padding: 12,
    gap: 4,
  },
  statLabel: {
    color: "#6D7C8D",
    fontSize: 12,
  },
  statValue: {
    color: "#1B2733",
    fontSize: 22,
    fontWeight: "800",
  },
  menuCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5EBF1",
    borderRadius: 14,
    overflow: "hidden",
  },
  menuItem: {
    minHeight: 52,
    justifyContent: "center",
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F6",
  },
  menuText: {
    color: "#2D3A47",
    fontWeight: "600",
  },
  logoutButton: {
    marginTop: "auto",
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
