import React, { useEffect } from "react";
import { View, FlatList } from "react-native";
import { styles } from "./styles";
import { f1ApiClient } from "../../api/f1api/httpClient";
import DriverStandingCard from "../../components/ui/DriverStandingCard";
import { DriverStanding } from "../../types/models/StandingModels/DriverStanding";

const DriverStandingsScreen = () => {
  const [driverStandings, setDriverStandings] = React.useState<
    DriverStanding[]
  >([]);

  const fetchDriverStandings = async () => {
    try {
      const driverStandings = await f1ApiClient.get<{
        drivers_championship: DriverStanding[];
      }>("/current/drivers-championship");
      setDriverStandings(driverStandings.drivers_championship);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    fetchDriverStandings();
  }, []);

  return (
    <View style={styles.root}>
      <FlatList
        data={driverStandings}
        renderItem={({ item }) => (
          <DriverStandingCard
            driver={item.driver}
            points={item.points}
            position={item.position}
            team={item.team}
          />
        )}
      />
    </View>
  );
};

export default DriverStandingsScreen;
