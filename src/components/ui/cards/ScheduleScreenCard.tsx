import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Race } from "../../../types/models/StandingModels/CurrentYear";
import { circuitData } from "../../../data/data";
import CountryFlag from "react-native-country-flag";
import { colors, fonts, spacing } from "../../../constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getTodayDate } from "../../../utils/date";

interface ScheduleScreenCardProps extends Race {
  onPress: () => void;
}

const ScheduleScreenCard: React.FC<ScheduleScreenCardProps> = ({
  raceName,
  circuit,
  schedule,
  onPress,
}) => {
  const circuitInfo = circuitData[circuit.circuitId];
  const today = getTodayDate();
  const isPastRace = schedule.race.date ? schedule.race.date < today : false;
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  return (
    <TouchableOpacity
      style={[styles.card, isPastRace && styles.pastCard]}
      onPress={onPress}
    >
      <View style={styles.flagContainer}>
        <CountryFlag isoCode={circuitInfo.flag} size={24} />
        <Text style={[styles.countryText, isPastRace && styles.pastText]}>
          {circuit.country}
        </Text>
      </View>

      <View style={styles.circuitInfo}>
        <Text style={[styles.raceName, isPastRace && styles.pastText]}>
          {raceName}
        </Text>
        <Text style={[styles.circuitName, isPastRace && styles.pastText]}>
          {circuit.circuitName}
        </Text>
      </View>

      <View style={styles.imageContainer}>
        {circuitInfo && (
          <Image
            style={[styles.circuitImage, isPastRace && styles.pastImage]}
            source={{ uri: circuitInfo.image }}
            resizeMode="cover"
          />
        )}
      </View>

      <View style={styles.rightContainer}>
        <View style={styles.dateContainer}>
          <Text style={[styles.dateText, isPastRace && styles.pastDateText]}>
            {schedule.race.date}
          </Text>
          <Text style={[styles.timeText, isPastRace && styles.pastText]}>
            {schedule.race.time}
          </Text>
        </View>

        {!isPastRace && (
          <TouchableOpacity
            onPress={toggleNotifications}
            style={styles.notificationButton}
          >
            <Ionicons
              name={
                notificationsEnabled ? "notifications" : "notifications-off"
              }
              size={24}
              color={notificationsEnabled ? colors.primary : colors.gray}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ScheduleScreenCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.large,
    marginVertical: spacing.small,
    marginHorizontal: spacing.medium,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 120,
  },
  pastCard: {
    opacity: 0.6,
    backgroundColor: colors.grayLight,
  },
  flagContainer: {
    alignItems: "center",
    width: 60,
  },
  countryText: {
    marginTop: spacing.xsmall,
    fontSize: fonts.size.xsmall,
    fontFamily: fonts.family.medium,
    color: colors.grayDark,
  },
  pastText: {
    color: colors.gray,
  },
  circuitInfo: {
    flex: 1,
    marginLeft: spacing.medium,
    justifyContent: "center",
  },
  raceName: {
    fontSize: fonts.size.medium,
    fontFamily: fonts.family.bold,
    color: colors.black,
    marginBottom: spacing.xxsmall,
  },
  circuitName: {
    fontSize: fonts.size.small,
    fontFamily: fonts.family.regular,
    color: colors.gray,
  },
  imageContainer: {
    width: 80,
    height: 60,
    borderRadius: 8,
    overflow: "hidden",
    marginHorizontal: spacing.small,
  },
  circuitImage: {
    width: "100%",
    height: "100%",
  },
  rightContainer: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: "100%",
  },
  dateContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
  },
  dateText: {
    fontSize: fonts.size.small,
    fontFamily: fonts.family.bold,
    color: colors.primary,
    marginBottom: spacing.xxsmall,
  },
  pastDateText: {
    color: colors.gray,
  },
  timeText: {
    fontSize: fonts.size.xsmall,
    fontFamily: fonts.family.medium,
    color: colors.grayDark,
  },
  notificationButton: {
    padding: spacing.xsmall,
    marginTop: spacing.small,
  },
  pastImage: {
    opacity: 0.6,
  },
});
