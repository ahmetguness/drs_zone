import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 20,
  },
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  circuitName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  circuitImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    borderRadius: 8,
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  flag: {
    marginRight: 10,
    borderRadius: 3,
  },
  countryText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 20,
  },
  listContent: {
    paddingBottom: 30,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#333",
  },
  sessionContainer: {
    width: "100%",
    marginTop: "3%",
    alignItems: "center",
  },
});
