import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { DriverStanding } from "../../types/models/StandingModels/DriverStanding";
import { getWikipediaImageUrl } from "../../utils/wikipediaHelpers";

const DriverStandingCard: React.FC<DriverStanding> = ({
  position,
  driver,
  team,
  points,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const url = await getWikipediaImageUrl(driver.url);
      if (url) {
        setImageUrl(url);
      }
    };
    fetchImage();
  }, [driver.url]);

  const imageSource = imageUrl
    ? { uri: imageUrl }
    : require("../../assets/avatar/default.png");

  return (
    <View style={styles.card}>
      <Image source={imageSource} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={styles.position}>#{position}</Text>
          <Text style={styles.name}>
            {driver.name} {driver.surname}
          </Text>
        </View>
        <Text style={styles.details}>🏁 {team.teamName}</Text>
        <Text style={styles.details}>🌍 {driver.nationality}</Text>
        <Text style={styles.points}>🏆 {points} pts</Text>
      </View>
    </View>
  );
};

export default DriverStandingCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 12,
    backgroundColor: "#ccc",
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  position: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e63946",
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1d3557",
    flexShrink: 1,
  },
  details: {
    fontSize: 14,
    color: "#495057",
    marginTop: 2,
  },
  points: {
    marginTop: 6,
    fontWeight: "bold",
    fontSize: 14,
    color: "#2a9d8f",
  },
});
