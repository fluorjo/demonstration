import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

const OFFSET = 60;

interface FloatingButtonProps {
  IconName: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
  ExtraStyle?: ViewStyle;
  isExpanded: any;
  index: number;
}

export const FABtn4Demo: React.FC<FloatingButtonProps> = ({
  index,
  onPress,
  IconName,
  ExtraStyle,
  isExpanded,
}) => {
  const animatedStyles = useAnimatedStyle(() => {
    const moveValue = isExpanded.value ? OFFSET * index : 0;
    const scaleValue = isExpanded.value ? 1 : 0;
    const translateValue = withSpring(moveValue, SPRING_CONFIG);
    const delay = index * 10;

    return {
      transform: [
        { translateY: translateValue },
        {
          scale: withDelay(delay, withTiming(scaleValue)),
        },
      ],
    };
  });

  return (
    <AnimatedPressable
      style={[animatedStyles, styles.shadow, styles.button]}
      onPress={onPress}
    >
      <MaterialIcons
        name={IconName}
        color="black"
        style={styles.floatingbtnIcon}
      />
    </AnimatedPressable>
  );
};

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
  content: {
    fontSize: 24,
    color: "#f8f9ff",
  },
});

const styles = StyleSheet.create({
  mainContainer: {
    position: "relative",
    height: 260,
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: "#7d7d7d",
    position: "absolute",
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -2,
    flexDirection: "row",
  },
  buttonContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  shadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -0.5, height: 3.5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  content: {
    color: "#f8f9ff",
    fontWeight: 500,
  },
  floatingbtn: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 100,
    zIndex: 1,
  },
  floatingbtnIcon: {
    fontSize: 30,
  },
});
