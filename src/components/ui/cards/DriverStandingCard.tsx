import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { DriverStanding } from "../../../types/models/StandingModels/DriverStanding";
import { colors } from "../../../constants/colors";

const DriverStandingCard: React.FC<DriverStanding> = ({
  position,
  driver,
  team,
  points,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const lastWordOfSurname = driver.surname
      .trim()
      .split(" ")
      .pop()
      ?.toUpperCase();
    const url = `https://media.formula1.com/content/dam/fom-website/drivers/2025Drivers/${lastWordOfSurname}.jpg.transform/2col/image.jpg`;
    setImageUrl(url);
  }, [driver.surname]);

  const imageSource = imageUrl
    ? { uri: imageUrl }
    : require("../../../assets/avatar/default.png");

  return (
    <View style={styles.card}>
      <View style={styles.positionContainer}>
        <Text style={styles.position}>{position}#</Text>
      </View>
      <Image source={imageSource} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.name}>
          {driver.name} {driver.surname}
        </Text>
        <Text style={styles.team}>{team.teamName}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>🌍</Text>
            <Text style={styles.statText}>{driver.nationality}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>🏆</Text>
            <Text style={styles.statText}>{points} pts</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DriverStandingCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  positionContainer: {
    backgroundColor: colors.highlight,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  position: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 16,
    borderWidth: 2,
    borderColor: "#f1f3f5",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primaryText,
    marginBottom: 4,
  },
  team: {
    fontSize: 14,
    color: colors.secondaryText,
    marginBottom: 8,
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statIcon: {
    fontSize: 14,
  },
  statText: {
    fontSize: 13,
    color: colors.secondaryText,
    fontWeight: "500",
  },
});
