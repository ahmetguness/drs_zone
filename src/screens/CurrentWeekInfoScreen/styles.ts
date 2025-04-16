import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#333",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#e10600",
    marginBottom: 5,
    letterSpacing: 1,
  },
  raceName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 8,
  },
  countdownContainer: {
    marginTop: 15,
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  countdownLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  countdownTimer: {
    color: "#e10600",
    fontSize: 24,
    fontWeight: "bold",
  },
  circuitImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  infoCardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    flexWrap: "wrap",
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    width: "48%",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    color: "#333",
  },
  infoCardValue: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    textAlign: "center",
  },
  section: {
    backgroundColor: "#fff",
    marginTop: 10,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  practiceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  practiceSession: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    width: "30%",
    marginBottom: 10,
    alignItems: "center",
  },
  practiceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e10600",
  },
  practiceTime: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    textAlign: "center",
  },
  circuitInfoContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 15,
  },
  circuitInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  circuitInfoLabel: {
    fontSize: 15,
    color: "#666",
  },
  circuitInfoValue: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },
  winnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 15,
  },
  driverImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  winnerInfo: {
    flex: 1,
  },
  winnerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  winnerTeam: {
    fontSize: 16,
    color: "#666",
    marginTop: 3,
  },
  winnerFastLap: {
    fontSize: 14,
    color: "#e10600",
    marginTop: 5,
    fontWeight: "500",
  },
});
