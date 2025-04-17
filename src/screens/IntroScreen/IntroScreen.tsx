import { View, Text, Button } from "react-native";
import React from "react";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { GeneralNavigationProp } from "../../types/navigation/Navigation";
import LoadingComponent from "../../components/common/LoadingComponent";

const IntroScreen = () => {
  const navigation = useNavigation<GeneralNavigationProp>();

  return (
    <View style={styles.root}>
      <Button
        title="GO NEXT"
        onPress={() => navigation.navigate("HomeScreen")}
      />

      {/* <LoadingComponent /> */}
    </View>
  );
};

export default IntroScreen;
