import { View, Text, StyleSheet } from "react-native";
import React from "react";

interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  return (
    <View style={styles.root}>
      <Text>{title}</Text>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
  },
});
