import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { f1ApiClient } from "../../api/f1api/httpClient";
import { Race } from "../../types/models/StandingModels/CurrentYear";
import { filterRacesThisWeek, getNextRace } from "../../utils/date";
import { circuitData } from "../../data/data";
import CountryFlag from "react-native-country-flag";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format, parseISO } from "date-fns";
import { styles } from "./styles";
import { useDispatch } from "react-redux";
import { setCurrentYearRaces } from "../../hooks/redux_toolkit/Slices/RaceSlice";

const CurrentWeekInfo = () => {
  const [loading, setLoading] = useState(true);
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [isThisWeek, setIsThisWeek] = useState<boolean>(false);
  const dispatcher = useDispatch();

  const fetchCurrentYearData = async () => {
    try {
      const response = await f1ApiClient.get<{ races: Race[] }>("/2025");
      const races = response.races;
      dispatcher(setCurrentYearRaces(races));
      const thisWeekRace = filterRacesThisWeek(races);
      console.log("bu", response);
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

  const formatTime = (
    dateString: string | undefined,
    timeString: string | undefined
  ): string => {
    if (!dateString || !timeString) return "N/A";
    const dateTime: string = `${dateString}T${timeString}`;
    return format(parseISO(dateTime), "PPpp");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading race data...</Text>
      </View>
    );
  }

  if (!selectedRace) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>No upcoming races found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {isThisWeek ? "THIS WEEK'S RACE" : "NEXT RACE"}
        </Text>
        <Text style={styles.raceName}>{selectedRace.raceName}</Text>
        <View style={styles.locationContainer}>
          <CountryFlag
            isoCode={circuitData[selectedRace.circuit.circuitId]?.flag || "au"}
            size={20}
          />
          <Text style={styles.locationText}>
            {selectedRace.circuit.city}, {selectedRace.circuit.country}
          </Text>
        </View>
      </View>

      {/* Circuit Image */}
      <Image
        style={styles.circuitImage}
        source={{
          uri:
            circuitData[selectedRace.circuit.circuitId]?.image ||
            "https://via.placeholder.com/400x200",
        }}
      />

      {/* Race Info Cards */}
      <View style={styles.infoCardsContainer}>
        {/* Race Date Card */}
        <View style={styles.infoCard}>
          <MaterialCommunityIcons
            name="racing-helmet"
            size={24}
            color="#e10600"
          />
          <Text style={styles.infoCardTitle}>Race</Text>
          <Text style={styles.infoCardValue}>
            {formatTime(
              selectedRace.schedule.race.date ?? undefined,
              selectedRace.schedule.race.time ?? undefined
            )}
          </Text>
        </View>

        {/* Qualifying Card */}
        <View style={styles.infoCard}>
          <MaterialCommunityIcons name="timer" size={24} color="#e10600" />
          <Text style={styles.infoCardTitle}>Qualifying</Text>
          <Text style={styles.infoCardValue}>
            {formatTime(
              selectedRace.schedule.qualy.date ?? undefined,
              selectedRace.schedule.qualy.time ?? undefined
            )}
          </Text>
        </View>
      </View>

      {/* Practice Sessions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Practice Sessions</Text>
        <View style={styles.practiceContainer}>
          <View style={styles.practiceSession}>
            <Text style={styles.practiceTitle}>FP1</Text>
            <Text style={styles.practiceTime}>
              {formatTime(
                selectedRace.schedule.fp1.date ?? undefined,
                selectedRace.schedule.fp1.time ?? undefined
              )}
            </Text>
          </View>
          <View style={styles.practiceSession}>
            <Text style={styles.practiceTitle}>FP2</Text>
            <Text style={styles.practiceTime}>
              {formatTime(
                selectedRace.schedule.fp2.date ?? undefined,
                selectedRace.schedule.fp2.time ?? undefined
              )}
            </Text>
          </View>
          <View style={styles.practiceSession}>
            <Text style={styles.practiceTitle}>FP3</Text>
            <Text style={styles.practiceTime}>
              {formatTime(
                selectedRace.schedule.fp3.date ?? undefined,
                selectedRace.schedule.fp3.time ?? undefined
              )}
            </Text>
          </View>
        </View>
      </View>

      {/* Circuit Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Circuit Info</Text>
        <View style={styles.circuitInfoContainer}>
          <View style={styles.circuitInfoRow}>
            <Text style={styles.circuitInfoLabel}>Circuit Name:</Text>
            <Text style={styles.circuitInfoValue}>
              {selectedRace.circuit.circuitName}
            </Text>
          </View>
          <View style={styles.circuitInfoRow}>
            <Text style={styles.circuitInfoLabel}>Length:</Text>
            <Text style={styles.circuitInfoValue}>
              {selectedRace.circuit.circuitLength}
            </Text>
          </View>
          <View style={styles.circuitInfoRow}>
            <Text style={styles.circuitInfoLabel}>Laps:</Text>
            <Text style={styles.circuitInfoValue}>{selectedRace.laps}</Text>
          </View>
          <View style={styles.circuitInfoRow}>
            <Text style={styles.circuitInfoLabel}>Lap Record:</Text>
            <Text style={styles.circuitInfoValue}>
              {selectedRace.circuit.lapRecord}
            </Text>
          </View>
        </View>
      </View>

      {/* Last Winner */}
      {selectedRace.winner && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Last Winner</Text>
          <View style={styles.winnerContainer}>
            <Image
              style={styles.driverImage}
              source={{
                uri:
                  selectedRace.winner.url || "https://via.placeholder.com/80",
              }}
            />
            <View style={styles.winnerInfo}>
              <Text style={styles.winnerName}>
                {selectedRace.winner.name} {selectedRace.winner.surname}
              </Text>
              {selectedRace.teamWinner && (
                <Text style={styles.winnerTeam}>
                  {selectedRace.teamWinner.teamName}
                </Text>
              )}
              {selectedRace.fast_lap && (
                <Text style={styles.winnerFastLap}>
                  Fastest Lap: {selectedRace.fast_lap.fast_lap}
                </Text>
              )}
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};
export default CurrentWeekInfo;
