import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Driver, Team } from "../../types/models/StandingModels/DriverStanding";

interface DriverStandingCardProps {
  position: number;
  driver: Driver;
  team: Team;
  points: number;
}

const DriverStandingCard: React.FC<DriverStandingCardProps> = ({
  position,
  driver,
  team,
  points,
}) => {
  return (
    <View style={styles.root}>
      <Text>
        {position} {driver.name} {driver.surname} {driver.nationality} {points}
      </Text>
    </View>
  );
};

export default DriverStandingCard;

const styles = StyleSheet.create({
  root: {
    width: "98%",
    marginHorizontal: "1%",
    backgroundColor: "red",
  },
});
