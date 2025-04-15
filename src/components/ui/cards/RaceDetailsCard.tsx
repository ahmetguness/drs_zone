import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RaceDetails } from "../../../types/models/StandingModels/RaceDetails";
import { getDriverImageUrl } from "../../../utils/getDriverImageUrl";

const RaceDetailsCard: React.FC<RaceDetails> = ({
  position,
  driver,
  time,
  team,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const url = getDriverImageUrl(driver.surname);
    setImageUrl(url);
  }, [driver.surname]);

  return (
    <View style={styles.root}>
      <View style={styles.positionContainer}>
        <Text style={styles.positionText}>{position}</Text>
      </View>

      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image
            style={styles.driverImage}
            source={{ uri: imageUrl }}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
      </View>

      <View style={styles.driverInfo}>
        <Text style={styles.driverName}>
          {driver.name} {driver.surname}
        </Text>
        <Text style={styles.driverTeam}>
          {team.teamName || "Team not specified"}
        </Text>
      </View>

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{time || "No time"}</Text>
      </View>
    </View>
  );
};

export default RaceDetailsCard;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  positionContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  positionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  imageContainer: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  driverImage: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#EEEEEE",
    borderRadius: 40,
  },
  driverInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  driverName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222222",
    marginBottom: 4,
  },
  driverTeam: {
    fontSize: 14,
    color: "#666666",
    fontStyle: "italic",
  },
  timeContainer: {
    backgroundColor: "#F8F8F8",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  timeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#444444",
  },
});
