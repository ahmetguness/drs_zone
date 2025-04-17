import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { TeamStanding } from "../../types/models/StandingModels/TeamStanding";
import { f1ApiClient } from "../../api/f1api/httpClient";
import TeamStandingCard from "../../components/ui/cards/TeamStandingCard";
import { styles } from "./styles";
import LoadingComponent from "../../components/common/LoadingComponent";

const TeamStandingsScreen = () => {
  const [teamStanding, setTeamStanding] = useState<TeamStanding[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTeamStandings = async () => {
    try {
      const TeamStanding = await f1ApiClient.get<{
        constructors_championship: TeamStanding[];
      }>("/current/constructors-championship");
      setTeamStanding(TeamStanding.constructors_championship);
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamStandings();
  }, []);

  return (
    <View style={styles.root}>
      {loading ? (
        <LoadingComponent title="Loading Constructor Data..." />
      ) : (
        <FlatList
          data={teamStanding}
          renderItem={({ item }: { item: TeamStanding }) => (
            <TeamStandingCard {...item} />
          )}
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

export default TeamStandingsScreen;
