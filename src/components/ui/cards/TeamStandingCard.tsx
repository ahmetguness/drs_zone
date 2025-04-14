import {
  StyleSheet,
  Text,
  View,
  Linking,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import { TeamStanding } from "../../../types/models/StandingModels/TeamStanding";
import { teamStandingData } from "../../../data/data";
import { colors } from "../../../constants/colors";

const TeamStandingCard: React.FC<TeamStanding> = ({
  teamId,
  position,
  points,
  wins,
  team,
}) => {
  const logoUrl = teamStandingData[teamId];

  return (
    <Pressable
      onPress={() => Linking.openURL(team.url)}
      style={({ pressed }) => [styles.card, { opacity: pressed ? 0.9 : 1 }]}
    >
      <View style={styles.header}>
        <View style={styles.positionContainer}>
          <Text style={styles.position}>{position}#</Text>
        </View>
        <Image
          source={{ uri: logoUrl }}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.pointsContainer}>
          <Text style={styles.points}>{points}</Text>
          <Text style={styles.pointsLabel}>PTS</Text>
        </View>
      </View>

      <Text style={styles.teamName}>{team.teamName}</Text>

      <View style={styles.divider} />

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Country:</Text>
          <Text style={styles.detailValue}>{team.country}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>First Appearance:</Text>
          <Text style={styles.detailValue}>{team.firstAppareance}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Constructors' Titles:</Text>
          <Text style={styles.detailValue}>
            {team.constructorsChampionships ?? 0}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Drivers' Titles:</Text>
          <Text style={styles.detailValue}>
            {team.driversChampionships ?? 0}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Season Wins:</Text>
          <Text style={[styles.detailValue, { color: colors.accent }]}>
            {wins ?? 0}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default TeamStandingCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  positionContainer: {
    backgroundColor: colors.highlight,
    borderRadius: 12,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  position: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  logo: {
    height: 48,
    width: 120,
    resizeMode: "contain",
  },
  pointsContainer: {
    alignItems: "center",
  },
  points: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.accent,
  },
  pointsLabel: {
    fontSize: 10,
    color: colors.secondaryText,
    fontWeight: "600",
    marginTop: -2,
  },
  teamName: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primaryText,
    textAlign: "center",
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#e9ecef",
    marginVertical: 8,
  },
  details: {
    marginTop: 8,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 13,
    color: colors.secondaryText,
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 13,
    color: colors.primaryText,
    fontWeight: "600",
  },
});
