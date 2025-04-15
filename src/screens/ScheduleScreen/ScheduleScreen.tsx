import { Text, FlatList } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../hooks/redux_toolkit/store";
import ScheduleScreenCard from "../../components/ui/cards/ScheduleScreenCard";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation/Navigation";
import { setSelectedRaceInfo } from "../../hooks/redux_toolkit/Slices/RaceSlice";

const ScheduleScreen = () => {
  const currentYearRaces = useSelector(
    (state: RootState) => state.race.currentYearRaces
  );
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatcher = useDispatch();

  const handleRaceDetails = (year: string, round: string) => {
    dispatcher(
      setSelectedRaceInfo({
        year: year,
        round: round,
      })
    );
    navigation.navigate("RaceDetailsScreen");
  };

  return (
    <FlatList
      data={currentYearRaces}
      renderItem={({ item }) => (
        <ScheduleScreenCard
          {...item}
          onPress={() => handleRaceDetails("2025", item.round.toString())}
        />
      )}
      ItemSeparatorComponent={() => <Text style={{ height: 10 }} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ScheduleScreen;
