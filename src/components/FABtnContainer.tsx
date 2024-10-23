import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import FloatingButton from "./FloatingButton";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function FloatingActionBtnContainer({ buttons }) {
  const isExpanded = useSharedValue(false);

  const handlePress = () => {
    isExpanded.value = !isExpanded.value;
  };

  return (
    <View style={styles.buttonContainer}>
      <AnimatedPressable
        onPress={handlePress}
        style={[styles.shadow, mainButtonStyles.button]}
      >
       <FontAwesome name="plus" size={24} color="black" />
      </AnimatedPressable>

      {buttons.map((button, index) => (
        <FloatingButton
          IconName={button.IconName}
          onPress={button.onPress}
          ExtraStyle={button.ExtraStyle}
        />
      ))}
    </View>
  );
}

const mainButtonStyles = StyleSheet.create({
  button: {
    zIndex: 2,
    height: 40,
    width: 40,
    borderRadius: 100,
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    top: 20,
    right: 20,
    zIndex: 1,
    backgroundColor:'blue'
  },
  shadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -0.5, height: 3.5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
