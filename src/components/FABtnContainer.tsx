import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import { FABtn4Demo } from "./FABtn4DemoInfo";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const { width, height } = Dimensions.get("window");

const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

const OFFSET = 60;

export default function FloatingActionBtnContainer({ buttons }) {
  const isExpanded = useSharedValue(false);

  const handlePress = () => {
    console.log(isExpanded.value);
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
            <FABtn4Demo
            isExpanded={isExpanded}
              IconName={button.IconName}
              onPress={button.onPress}
              ExtraStyle={button.ExtraStyle}
              key={index}
              index={index + 1}
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
    transform: [
      { translateX: width * 0.5 - 20 }, 
    ],
  },
});

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 80,
    bottom: 20,
    zIndex: 1,
    backgroundColor: "blue",
  },
  shadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -0.5, height: 3.5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
