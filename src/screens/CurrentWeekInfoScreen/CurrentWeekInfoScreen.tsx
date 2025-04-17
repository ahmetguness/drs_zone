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

const CurrentWeekInfo = () => {
  const [loading, setLoading] = useState(true);
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [isThisWeek, setIsThisWeek] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<string>("");
  const [nextEvent, setNextEvent] = useState<{
    name: string;
    date: Date;
  } | null>(null);
  const dispatcher = useDispatch();

  const fetchCurrentYearData = async () => {
    try {
      const response = await f1ApiClient.get<Response>("/2025");
      const races = response.races;
      dispatcher(setCurrentYearRaces(races));
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

  const updateCountdown = () => {
    if (!selectedRace) return;

    const now = new Date();
    const events = [
      {
        name: "FP1",
        date: parseISO(
          `${selectedRace.schedule.fp1.date}T${selectedRace.schedule.fp1.time}`
        ),
      },
      {
        name: "FP2",
        date: parseISO(
          `${selectedRace.schedule.fp2.date}T${selectedRace.schedule.fp2.time}`
        ),
      },
      {
        name: "FP3",
        date: parseISO(
          `${selectedRace.schedule.fp3.date}T${selectedRace.schedule.fp3.time}`
        ),
      },
      {
        name: "Sprint Qualifying",
        date: parseISO(
          `${selectedRace.schedule.sprintQualy.date}T${selectedRace.schedule.sprintQualy.time}`
        ),
      },
      {
        name: "Sprint Race",
        date: parseISO(
          `${selectedRace.schedule.sprintRace.date}T${selectedRace.schedule.sprintRace.time}`
        ),
      },
      {
        name: "Qualifying",
        date: parseISO(
          `${selectedRace.schedule.qualy.date}T${selectedRace.schedule.qualy.time}`
        ),
      },
      {
        name: "Race",
        date: parseISO(
          `${selectedRace.schedule.race.date}T${selectedRace.schedule.race.time}`
        ),
      },
    ].filter((event) => event.date.toString() !== "Invalid Date");

    let nextEvent = null;
    for (const event of events) {
      if (event.date > now) {
        nextEvent = event;
        break;
      }
    }

    if (!nextEvent) {
      setCountdown("Event in progress");
      setNextEvent(null);
      return;
    }

    setNextEvent(nextEvent);

    const diffInSeconds = differenceInSeconds(nextEvent.date, now);
    if (diffInSeconds <= 0) {
      setCountdown("Starting soon");
      return;
    }

    const days = Math.floor(diffInSeconds / (3600 * 24));
    const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = diffInSeconds % 60;

    setCountdown(
      `${days > 0 ? `${days}d ` : ""}${
        hours > 0 || days > 0 ? `${hours}h ` : ""
      }${minutes}m ${seconds}s`
    );
  };

  useEffect(() => {
    fetchCurrentYearData();
  }, []);

  useEffect(() => {
    if (selectedRace) {
      updateCountdown();
      const timer = setInterval(updateCountdown, 1000);
      return () => clearInterval(timer);
    }
  }, [selectedRace]);

  const formatTime = (
    dateString: string | null,
    timeString: string | null
  ): string => {
    if (!dateString || !timeString) return "N/A";
    const dateTime: string = `${dateString}T${timeString}`;
    return format(parseISO(dateTime), "PPpp");
  };

  const hasSprintEvents = () => {
    return (
      selectedRace?.schedule.sprintQualy.date &&
      selectedRace?.schedule.sprintRace.date
    );
  };

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
          <View style={styles.countdownContainer}>
            <Text style={styles.countdownLabel}>
              {nextEvent ? `Next: ${nextEvent.name} in` : "Starting soon"}
            </Text>
            <Text style={styles.countdownTimer}>{countdown}</Text>
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
        <View style={styles.infoCard}>
          <MaterialCommunityIcons
            name="racing-helmet"
            size={24}
            color="#e10600"
          />
          <Text style={styles.infoCardTitle}>Race</Text>
          <Text style={styles.infoCardValue}>
            {formatTime(
              selectedRace.schedule.race.date,
              selectedRace.schedule.race.time
            )}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <MaterialCommunityIcons name="timer" size={24} color="#e10600" />
          <Text style={styles.infoCardTitle}>Qualifying</Text>
          <Text style={styles.infoCardValue}>
            {formatTime(
              selectedRace.schedule.qualy.date,
              selectedRace.schedule.qualy.time
            )}
          </Text>
        </View>

        {hasSprintEvents() && (
          <>
            <View style={styles.infoCard}>
              <MaterialCommunityIcons
                name="timer-sand"
                size={24}
                color="#e10600"
              />
              <Text style={styles.infoCardTitle}>Sprint Qualy</Text>
              <Text style={styles.infoCardValue}>
                {formatTime(
                  selectedRace.schedule.sprintQualy.date,
                  selectedRace.schedule.sprintQualy.time
                )}
              </Text>
            </View>

            <View style={styles.infoCard}>
              <MaterialCommunityIcons
                name="flag-checkered"
                size={24}
                color="#e10600"
              />
              <Text style={styles.infoCardTitle}>Sprint Race</Text>
              <Text style={styles.infoCardValue}>
                {formatTime(
                  selectedRace.schedule.sprintRace.date,
                  selectedRace.schedule.sprintRace.time
                )}
              </Text>
            </View>
          </>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Practice Sessions</Text>
        <View style={styles.practiceContainer}>
          <View style={styles.practiceSession}>
            <Text style={styles.practiceTitle}>FP1</Text>
            <Text style={styles.practiceTime}>
              {formatTime(
                selectedRace.schedule.fp1.date,
                selectedRace.schedule.fp1.time
              )}
            </Text>
          </View>
          {selectedRace.schedule.fp2.date && (
            <View style={styles.practiceSession}>
              <Text style={styles.practiceTitle}>FP2</Text>
              <Text style={styles.practiceTime}>
                {formatTime(
                  selectedRace.schedule.fp2.date,
                  selectedRace.schedule.fp2.time
                )}
              </Text>
            </View>
          )}
          {selectedRace.schedule.fp3.date && (
            <View style={styles.practiceSession}>
              <Text style={styles.practiceTitle}>FP3</Text>
              <Text style={styles.practiceTime}>
                {formatTime(
                  selectedRace.schedule.fp3.date,
                  selectedRace.schedule.fp3.time
                )}
              </Text>
            </View>
          )}
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
