import { View, FlatList, Text, Image, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../hooks/redux_toolkit/store";
import { f1ApiClient } from "../../api/f1api/httpClient";
import { RaceDetails } from "../../types/models/StandingModels/RaceDetails";
import RaceDetailsCard from "../../components/ui/cards/RaceDetailsCard";
import { circuitData } from "../../data/data";
import CountryFlag from "react-native-country-flag";
import { styles } from "./styles";
import LoadingComponent from "../../components/common/LoadingComponent";

const RaceDetailsScreen = () => {
  const selectedRace = useSelector(
    (state: RootState) => state.race.selectedRaceInfo
  );
  const [loading, setLoading] = React.useState(true);
  const [selectedRaceData, setSelectedRaceData] =
    React.useState<RaceDetails[]>();

  const fetchSelectedRaceData = async () => {
    try {
      const selectedYearData = await f1ApiClient.get<{
        races: {
          results: RaceDetails[];
        };
      }>(`/${selectedRace.year}/${selectedRace.round}/race`);

      setSelectedRaceData(selectedYearData.races.results);
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSelectedRaceData();
  }, []);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.gradient}>
        <Text style={styles.circuitName}>
          {selectedRace.circuitInfo.circuitName}
        </Text>
      </View>

      <Image
        style={styles.circuitImage}
        source={{
          uri: circuitData[selectedRace.circuitInfo.circuitId].image,
        }}
      />

      <View style={styles.locationContainer}>
        <CountryFlag
          isoCode={circuitData[selectedRace.circuitInfo.circuitId].flag}
          size={24}
          style={styles.flag}
        />
        <Text style={styles.countryText}>
          {selectedRace.circuitInfo.country}
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return <LoadingComponent title={`Loading Race Data...`} />;
  }

  return (
    <FlatList
      data={selectedRaceData}
      renderItem={({ item }) => <RaceDetailsCard {...item} />}
      keyExtractor={(_, index) => index.toString()}
      ListHeaderComponent={renderHeader}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default RaceDetailsScreen;
