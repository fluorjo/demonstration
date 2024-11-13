import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
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

const FloatingActionButton = ({
  isExpanded,
  index,
  icon,
  onPress,
  backgroundColor,
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
      style={[
        animatedStyles,
        styles.shadow,
        styles.button,
        { backgroundColor: backgroundColor },
      ]}
      onPress={onPress}
    >
      <Image source={icon} style={{ width: 30, height: 30 }} />
    </AnimatedPressable>
  );
};

export default function FloatingActionBtn({ toggleFilter, filteredType }) {
  const isExpanded = useSharedValue(false);
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    isExpanded.value = !isExpanded.value;
    setExpanded(!expanded);
  };

  const getBackgroundColor = (type) => {
    return filteredType.includes(type) ? "#ffffff" : "#7d7d7d";
  };

  return (
    <View style={styles.buttonContainer}>
      <AnimatedPressable
        onPress={handlePress}
        style={[
          styles.shadow,
          mainButtonStyles.button,
          { opacity: expanded ? 0.7 : 1 },
        ]}
      >
        <MaterialIcons
          name={expanded ? "filter-alt-off" : "filter-alt"}
          size={32}
          color="white"
        />
      </AnimatedPressable>
      <FloatingActionButton
        isExpanded={isExpanded}
        index={1}
        icon={require("../../assets/Building.png")}
        onPress={() => toggleFilter("민간개방화장실")}
        backgroundColor={getBackgroundColor("민간개방화장실")}
      />
      <FloatingActionButton
        isExpanded={isExpanded}
        index={2}
        icon={require("../../assets/Government.png")}
        onPress={() => toggleFilter("공공청사")}
        backgroundColor={getBackgroundColor("공공청사")}
      />
      <FloatingActionButton
        isExpanded={isExpanded}
        index={3}
        icon={require("../../assets/Subway.png")}
        onPress={() => toggleFilter("지하철")}
        backgroundColor={getBackgroundColor("지하철")}
      />
      <FloatingActionButton
        isExpanded={isExpanded}
        index={4}
        icon={require("../../assets/PublicToilet.png")}
        onPress={() => toggleFilter("공중")}
        backgroundColor={getBackgroundColor("공중")}
      />
    </View>
  );
}

const mainButtonStyles = StyleSheet.create({
  button: {
    zIndex: 2,
    height: 56,
    width: 56,
    borderRadius: 100,
    backgroundColor: "#000000",
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
    width: 56,
    height: 56,
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
});
