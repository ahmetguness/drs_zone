import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../constants/theme";
import { Session } from "../../types/models/StandingModels/Sessions";

interface SessionComponentProps extends Session {
  style?: object;
  isSelected: boolean;
  onPress: () => void;
}

const SessionComponent: React.FC<SessionComponentProps> = ({
  name,
  style,
  isSelected,
  onPress,
}) => (
  <TouchableOpacity
    style={[
      styles.root,
      style,
      isSelected && { backgroundColor: colors.primary },
    ]}
    onPress={onPress}
  >
    <Text style={[styles.text, isSelected && { color: colors.white }]}>
      {name}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.8,
    backgroundColor: colors.grayLight,
  },
  text: {
    fontWeight: "bold",
  },
});

export default SessionComponent;
