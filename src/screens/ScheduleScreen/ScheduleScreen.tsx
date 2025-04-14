import { Text, FlatList } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../hooks/redux_toolkit/store";
import ScheduleScreenCard from "../../components/ui/cards/ScheduleScreenCard";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation/Navigation";

const ScheduleScreen = () => {
  const currentYearRaces = useSelector(
    (state: RootState) => state.race.currentYearRaces
  );
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <FlatList
      data={currentYearRaces}
      renderItem={({ item }) => (
        <ScheduleScreenCard
          {...item}
          onPress={() => navigation.navigate("RaceDetailsScreen")}
        />
      )}
      ItemSeparatorComponent={() => <Text style={{ height: 10 }} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ScheduleScreen;
