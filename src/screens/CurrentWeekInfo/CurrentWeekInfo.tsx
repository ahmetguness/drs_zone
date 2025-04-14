import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { f1ApiClient } from "../../api/f1api/httpClient";
import { Race } from "../../types/models/StandingModels/CurrentYear";
import { filterRacesThisWeek, getNextRace } from "../../utils/date";

const CurrentWeekInfo = () => {
  const [currentYearData, setCurrentYearData] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [isThisWeek, setIsThisWeek] = useState<boolean>(false);

  const fetchCurrentYearData = async () => {
    try {
      const response = await f1ApiClient.get<{ races: Race[] }>("/2025");
      const races = response.races;
      setCurrentYearData(races);

      const thisWeekRace = filterRacesThisWeek(races);
      if (thisWeekRace.length > 0) {
        setSelectedRace(thisWeekRace[0]);
        setIsThisWeek(true);
      } else {
        const nextRace = getNextRace(races);
        setSelectedRace(nextRace);
        setIsThisWeek(false);
      }
    } catch (error) {
      console.error("Error fetching races:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentYearData();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!selectedRace) {
    return <Text>No upcoming races found.</Text>;
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
        {isThisWeek ? "This Week's Race" : "Next Race"}
      </Text>
      <Text style={{ fontSize: 16, fontWeight: "600" }}>
        {selectedRace.raceName}
      </Text>
      <Text>Date: {selectedRace.schedule.race.date}</Text>
      <Text>Time: {selectedRace.schedule.race.time}</Text>
      <Text>
        Location: {selectedRace.circuit.city}, {selectedRace.circuit.country}
      </Text>
    </View>
  );
};

export default CurrentWeekInfo;
