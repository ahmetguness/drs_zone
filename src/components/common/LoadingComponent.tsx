import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

interface LoadingComponentProps {
  title: string;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({ title }) => {
  return (
    <View style={styles.root}>
      <ActivityIndicator size="large" color="black" />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default LoadingComponent;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: "5%",
    color: "black",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
  },
});
