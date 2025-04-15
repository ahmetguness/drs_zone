import { View, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../hooks/redux_toolkit/store";
import { f1ApiClient } from "../../api/f1api/httpClient";
import { RaceDetails } from "../../types/models/StandingModels/RaceDetails";
import RaceDetailsCard from "../../components/ui/cards/RaceDetailsCard";

const RaceDetailsScreen = () => {
  const selectedRace = useSelector(
    (state: RootState) => state.race.selectedRaceInfo
  );

  const [selectedRaceData, setSelectedRaceData] =
    React.useState<RaceDetails[]>();

  const fetchSelectedRaceData = async () => {
    try {
      const selectedYearData = await f1ApiClient.get<{
        races: {
          results: RaceDetails[];
          [key: string]: any;
        };
        [key: string]: any;
      }>(`/${selectedRace.year}/${selectedRace.round}/race`);

      console.log("results", selectedYearData.races.results);
      setSelectedRaceData(selectedYearData.races.results);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    fetchSelectedRaceData();
  }, []);

  return (
    <View>
      <View></View>
      <View style={{ marginBottom: "10%", marginTop: "5%" }}>
        <FlatList
          data={selectedRaceData}
          renderItem={({ item }) => <RaceDetailsCard {...item} />}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default RaceDetailsScreen;
