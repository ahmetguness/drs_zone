import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { f1ApiClient } from "../../api/f1api/httpClient";
import { Race } from "../../types/models/StandingModels/CurrentYear";
import { filterRacesThisWeek, getNextRace } from "../../utils/date";
import { circuitData } from "../../data/data";
import CountryFlag from "react-native-country-flag";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format, parseISO, differenceInSeconds } from "date-fns";
import { useDispatch } from "react-redux";
import { setCurrentYearRaces } from "../../hooks/redux_toolkit/Slices/RaceSlice";
import { Response } from "../../types/models/StandingModels/Response";
import { styles } from "./styles";
import LoadingComponent from "../../components/common/LoadingComponent";

type RaceEvent = {
  name: string;
  date: Date;
  duration: number;
  completed?: boolean;
  inProgress?: boolean;
};

const CurrentWeekInfo = () => {
  const [loading, setLoading] = useState(true);
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [isThisWeek, setIsThisWeek] = useState(false);
  const [countdown, setCountdown] = useState("");
  const [nextEvent, setNextEvent] = useState<RaceEvent | null>(null);
  const [raceEvents, setRaceEvents] = useState<RaceEvent[]>([]);
  const dispatch = useDispatch();

  const fetchCurrentYearData = async () => {
    try {
      const response = await f1ApiClient.get<Response>("/2025");
      const races = response.races;
      dispatch(setCurrentYearRaces(races));

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

  const prepareRaceEvents = (race: Race): RaceEvent[] => {
    if (!race) return [];

    return [
      {
        name: "FP1",
        date: parseISO(`${race.schedule.fp1.date}T${race.schedule.fp1.time}`),
        duration: 60 * 60 * 1000,
      },
      {
        name: "FP2",
        date: parseISO(`${race.schedule.fp2.date}T${race.schedule.fp2.time}`),
        duration: 60 * 60 * 1000,
      },
      {
        name: "FP3",
        date: parseISO(`${race.schedule.fp3.date}T${race.schedule.fp3.time}`),
        duration: 60 * 60 * 1000,
      },
      {
        name: "Sprint Qualifying",
        date: parseISO(
          `${race.schedule.sprintQualy.date}T${race.schedule.sprintQualy.time}`
        ),
        duration: 60 * 60 * 1000,
      },
      {
        name: "Sprint Race",
        date: parseISO(
          `${race.schedule.sprintRace.date}T${race.schedule.sprintRace.time}`
        ),
        duration: 45 * 60 * 1000,
      },
      {
        name: "Qualifying",
        date: parseISO(
          `${race.schedule.qualy.date}T${race.schedule.qualy.time}`
        ),
        duration: 60 * 60 * 1000,
      },
      {
        name: "Race",
        date: parseISO(`${race.schedule.race.date}T${race.schedule.race.time}`),
        duration: 90 * 60 * 1000,
      },
    ].filter((event) => event.date.toString() !== "Invalid Date");
  };

  const updateRaceStatus = () => {
    if (!selectedRace) return;

    const now = new Date();
    const updatedEvents = prepareRaceEvents(selectedRace).map((event) => {
      const startTime = event.date;
      const endTime = new Date(startTime.getTime() + event.duration);

      return {
        ...event,
        completed: endTime < now,
        inProgress: startTime <= now && now <= endTime,
        progressPercentage:
          startTime <= now && now <= endTime
            ? Math.min(
                100,
                ((now.getTime() - startTime.getTime()) / event.duration) * 100
              )
            : 0,
      };
    });

    setRaceEvents(updatedEvents);

    const currentEvent = updatedEvents.find((event) => event.inProgress);
    const upcomingEvent = updatedEvents.find(
      (event) => event.date > now && !event.completed
    );

    if (currentEvent) {
      const startedSeconds = differenceInSeconds(now, currentEvent.date);
      const startedMinutes = Math.floor(startedSeconds / 60);

      setCountdown(
        `Live: ${currentEvent.name} - Started ${startedMinutes}m ago`
      );
      setNextEvent(currentEvent);
    } else if (upcomingEvent) {
      const diffSeconds = differenceInSeconds(upcomingEvent.date, now);
      const days = Math.floor(diffSeconds / (3600 * 24));
      const hours = Math.floor((diffSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((diffSeconds % 3600) / 60);

      let countdownText = `Next: ${upcomingEvent.name} in `;
      if (days > 0) countdownText += `${days}d `;
      if (hours > 0 || days > 0) countdownText += `${Math.floor(hours)}h `;
      countdownText += `${minutes}m`;

      setCountdown(countdownText);
      setNextEvent(upcomingEvent);
    } else {
      setCountdown("All sessions completed");
      setNextEvent(null);
    }
  };

  const formatEventTime = (date: Date): string => {
    return format(date, "PPpp");
  };

  const hasSprintEvents = () => {
    return raceEvents.some(
      (event) =>
        event.name === "Sprint Qualifying" || event.name === "Sprint Race"
    );
  };

  useEffect(() => {
    fetchCurrentYearData();
  }, []);

  useEffect(() => {
    if (selectedRace) {
      updateRaceStatus();
      const timer = setInterval(updateRaceStatus, 1000);
      return () => clearInterval(timer);
    }
  }, [selectedRace]);

  if (loading) {
    return <LoadingComponent title="Loading Race Data..." />;
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

        {countdown && (
          <View
            style={
              countdown.startsWith("Live:")
                ? styles.liveContainer
                : styles.countdownContainer
            }
          >
            <Text
              style={
                countdown.startsWith("Live:")
                  ? styles.liveText
                  : styles.countdownLabel
              }
            >
              {countdown.split(" - ")[0]}
            </Text>
            {countdown.includes(" - ") && (
              <Text
                style={
                  countdown.startsWith("Live:")
                    ? styles.liveTimer
                    : styles.countdownTimer
                }
              >
                {countdown.split(" - ")[1]}
              </Text>
            )}
          </View>
        )}
      </View>

      <Image
        style={styles.circuitImage}
        source={{
          uri:
            circuitData[selectedRace.circuit.circuitId]?.image ||
            "https://via.placeholder.com/400x200",
        }}
      />

      <View style={styles.infoCardsContainer}>
        {raceEvents
          .filter((event: RaceEvent) =>
            ["Race", "Qualifying", "Sprint Qualifying", "Sprint Race"].includes(
              event.name
            )
          )
          .map((event: RaceEvent) => (
            <View
              key={event.name}
              style={[
                styles.infoCard,
                event.completed && styles.completedSession,
                event.inProgress && styles.inProgressSession,
              ]}
            >
              <MaterialCommunityIcons
                name={
                  event.name === "Race"
                    ? "racing-helmet"
                    : event.name.includes("Qualifying")
                    ? "timer"
                    : "flag-checkered"
                }
                size={24}
                color={
                  event.inProgress
                    ? "#fff"
                    : event.completed
                    ? "#4caf50"
                    : "#e10600"
                }
              />
              <Text
                style={[
                  styles.infoCardTitle,
                  event.inProgress && { color: "#fff" },
                  event.completed && { color: "#4caf50" },
                ]}
              >
                {event.name}
              </Text>
              <Text
                style={[
                  styles.infoCardValue,
                  event.inProgress && { color: "#fff" },
                  event.completed && { color: "#4caf50" },
                ]}
              >
                {formatEventTime(event.date)}
              </Text>
              {event.completed && (
                <Text style={styles.completedText}>Completed</Text>
              )}
              {event.inProgress && (
                <Text style={styles.inProgressText}>Live</Text>
              )}
            </View>
          ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Practice Sessions</Text>
        <View style={styles.practiceContainer}>
          {raceEvents
            .filter((event) => ["FP1", "FP2", "FP3"].includes(event.name))
            .map((event) => (
              <View
                key={event.name}
                style={[
                  styles.practiceSession,
                  event.completed && styles.completedSession,
                  event.inProgress && styles.inProgressSession,
                ]}
              >
                <Text
                  style={[
                    styles.practiceTitle,
                    event.inProgress && { color: "#fff" },
                    event.completed && { color: "#4caf50" },
                  ]}
                >
                  {event.name}
                </Text>
                <Text
                  style={[
                    styles.practiceTime,
                    event.inProgress && { color: "#fff" },
                    event.completed && { color: "#4caf50" },
                  ]}
                >
                  {formatEventTime(event.date)}
                </Text>
                {event.completed && (
                  <Text style={styles.completedText}>Completed</Text>
                )}
                {event.inProgress && (
                  <Text style={styles.inProgressText}>Live</Text>
                )}
              </View>
            ))}
        </View>
      </View>

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

      {selectedRace.winner && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Last Winner</Text>
          <View style={styles.winnerContainer}>
            <Image
              style={styles.driverImage}
              source={{
                uri: selectedRace.winner.url || "https://placehold.co/600x400",
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
