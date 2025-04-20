import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, Text, Image } from "react-native";
import { useSelector } from "react-redux";
import CountryFlag from "react-native-country-flag";
import { RootState } from "../../hooks/redux_toolkit/store";
import { f1ApiClient } from "../../api/f1api/httpClient";
import { RaceDetails } from "../../types/models/StandingModels/RaceDetails";
import {
  circuitData,
  getMainSessions,
  getPracticeSessions,
  SPRINT_SESSIONS,
} from "../../data/data";
import RaceDetailsCard from "../../components/ui/cards/RaceDetailsCard";
import LoadingComponent from "../../components/common/LoadingComponent";
import SessionComponent from "../../components/common/SessionComponent";
import { calculateLayoutValues, LAYOUT } from "../../constants/layout";
import { styles } from "./styles";
import {
  Session,
  SessionType,
} from "../../types/models/StandingModels/Sessions";

const RaceDetailsScreen = () => {
  const selectedRace = useSelector(
    (state: RootState) => state.race.selectedRaceInfo
  );
  const [loading, setLoading] = useState(true);
  const [selectedRaceData, setSelectedRaceData] = useState<RaceDetails[]>();
  const [selectedSession, setSelectedSession] = useState<SessionType>("race");
  const [selectedFpSession, setSelectedFpSession] = useState("fp1");
  const [selectedSprintSession, setSelectedSprintSession] =
    useState("sprintQuali");

  const mainSessions = getMainSessions(selectedRace.haveSprint);
  const practiceSessions = getPracticeSessions(selectedRace.haveSprint);

  const fetchSelectedRaceData = useCallback(async () => {
    try {
      const response = await f1ApiClient.get<{
        races: { results: RaceDetails[] };
      }>(`/${selectedRace.year}/${selectedRace.round}/race`);

      setSelectedRaceData(response.races.results);
    } catch (error) {
      console.error("Error fetching race data:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedRace]);

  useEffect(() => {
    fetchSelectedRaceData();
  }, [fetchSelectedRaceData]);

  const { itemWidth, gapWidth, containerPadding, borderRadius } =
    calculateLayoutValues();

  const renderSessionSelector = (
    sessions: Session[],
    selectedId: string,
    onSelect: (id: string) => void
  ) => (
    <FlatList
      data={sessions}
      renderItem={({ item }) => (
        <SessionComponent
          {...item}
          isSelected={item.id === selectedId}
          style={{
            width: itemWidth,
            height: LAYOUT.ITEM.HEIGHT,
            borderRadius,
          }}
          onPress={() => onSelect(item.id)}
        />
      )}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ width: gapWidth }} />}
      snapToInterval={itemWidth + gapWidth}
      decelerationRate="fast"
    />
  );

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

      <View
        style={[
          styles.sessionContainer,
          { paddingHorizontal: containerPadding },
        ]}
      >
        {renderSessionSelector(mainSessions, selectedSession, (id: string) =>
          setSelectedSession(id as SessionType)
        )}
      </View>

      {selectedSession === "fp" && (
        <View
          style={[
            styles.sessionContainer,
            { paddingHorizontal: containerPadding },
          ]}
        >
          {renderSessionSelector(
            practiceSessions,
            selectedFpSession,
            (id: string) => setSelectedFpSession(id)
          )}
        </View>
      )}

      {selectedSession === "sprint" && (
        <View
          style={[
            styles.sessionContainer,
            { paddingHorizontal: containerPadding },
          ]}
        >
          {renderSessionSelector(
            SPRINT_SESSIONS,
            selectedSprintSession,
            (id: string) => setSelectedSprintSession(id)
          )}
        </View>
      )}
    </View>
  );

  if (loading) {
    return <LoadingComponent title="Loading Race Data..." />;
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
