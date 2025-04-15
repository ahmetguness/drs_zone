import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RaceDetails } from "../../../types/models/StandingModels/RaceDetails";
import { getDriverImageUrl } from "../../../utils/getDriverImageUrl";
import { LinearGradient } from "expo-linear-gradient";

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

  const getPositionColor = () => {
    if (position === 1) return "#FFD700";
    if (position === 2) return "#C0C0C0";
    if (position === 3) return "#CD7F32";
    return "#e10600";
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#f8f8f8", "#ffffff"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View
          style={[
            styles.positionContainer,
            { backgroundColor: getPositionColor() },
          ]}
        >
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
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  gradient: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 100,
  },
  positionContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  positionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  imageContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  driverImage: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#EEEEEE",
    borderRadius: 30,
  },
  driverInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  driverName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 4,
  },
  driverTeam: {
    fontSize: 13,
    color: "#666666",
    fontStyle: "italic",
  },
  timeContainer: {
    backgroundColor: "rgba(225, 6, 0, 0.1)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(225, 6, 0, 0.2)",
  },
  timeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#e10600",
  },
});

export default RaceDetailsCard;
