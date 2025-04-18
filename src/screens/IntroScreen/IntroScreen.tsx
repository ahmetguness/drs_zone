import { Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { GeneralNavigationProp } from "../../types/navigation/Navigation";
import { Audio } from "expo-av";

const IntroScreen = () => {
  const navigation = useNavigation<GeneralNavigationProp>();

  const handlePress = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/intro.mp3")
    );
    await sound.playAsync();

    // sound.setOnPlaybackStatusUpdate((status) => {
    //   if (status.isLoaded && status.didJustFinish) {
    //     navigation.navigate("HomeScreen");
    //   }
    // });

    navigation.navigate("HomeScreen");
  };

  return (
    <ImageBackground
      style={styles.root}
      source={require("../../assets/background/bg_logo.jpg")}
    >
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Text style={styles.text}>Lets Race</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default IntroScreen;
