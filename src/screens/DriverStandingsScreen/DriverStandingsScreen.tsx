import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { f1ApiClient } from "../../api/f1api/httpClient";
import DriverStandingCard from "../../components/ui/cards/DriverStandingCard";
import { DriverStanding } from "../../types/models/StandingModels/DriverStanding";

const DriverStandingsScreen = () => {
  const [driverStandings, setDriverStandings] = useState<DriverStanding[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDriverStandings = async () => {
    try {
      const driverStandings = await f1ApiClient.get<{
        drivers_championship: DriverStanding[];
      }>("/current/drivers-championship");
      setDriverStandings(driverStandings.drivers_championship);
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDriverStandings();
  }, []);

  return (
    <View style={styles.root}>
      {loading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator animating={loading} />
        </View>
      ) : (
        <FlatList
          data={driverStandings}
          renderItem={({ item }) => <DriverStandingCard {...item} />}
          keyExtractor={(item) => item.classificationId.toString()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeparatorComponent} />
          )}
        />
      )}
    </View>
  );
};

export default DriverStandingsScreen;
