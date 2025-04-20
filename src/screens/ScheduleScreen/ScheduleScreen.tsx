import { Text, FlatList } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../hooks/redux_toolkit/store";
import ScheduleScreenCard from "../../components/ui/cards/ScheduleScreenCard";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation/Navigation";
import { setSelectedRaceInfo } from "../../hooks/redux_toolkit/Slices/RaceSlice";
import { Circuit } from "../../types/models/StandingModels/CurrentYear";

const ScheduleScreen = () => {
  const currentYearRaces = useSelector(
    (state: RootState) => state.race.currentYearRaces
  );
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatcher = useDispatch();

  const handleRaceDetails = (
    year: string,
    round: string,
    circuitInfo: Circuit
  ) => {
    dispatcher(
      setSelectedRaceInfo({
        year: year,
        round: round,
        circuitInfo: circuitInfo,
        haveSprint:
          currentYearRaces[parseInt(round)-1]?.schedule?.sprintQualy?.date ===
          null
            ? false
            : true,
      })
    );
    navigation.navigate("RaceDetailsScreen");
  };

  console.log("aaa", currentYearRaces[0].schedule.sprintQualy.date);

  return (
    <FlatList
      data={currentYearRaces}
      renderItem={({ item }) => (
        <ScheduleScreenCard
          {...item}
          onPress={() =>
            handleRaceDetails("2025", item.round.toString(), item.circuit)
          }
        />
      )}
      ItemSeparatorComponent={() => <Text style={{ height: 10 }} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ScheduleScreen;
