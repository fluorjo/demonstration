import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { Shadow } from "react-native-shadow-2";
export default function Flame() {
  const flameScale = useRef(new Animated.Value(1)).current;
  const flameOpacity = useRef(new Animated.Value(1)).current;
  const flameMove = useRef(new Animated.Value(0)).current;

  const getRandom = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(flameScale, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(flameScale, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(flameOpacity, {
            toValue: 0.9,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(flameOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(flameMove, {
            toValue: -10, // 위로 10px 이동
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(flameMove, {
            toValue: 10, // 아래로 10px 이동
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, [flameScale, flameOpacity, flameMove]);

  return (
    <Animated.View
      style={[
        styles.flameContainer,
        // {
        //   transform: [{ scale: flameScale },{translateY:flameMove}],
        //   opacity: flameOpacity,
        // },
      ]}
    >
      {/* <View style={styles.thread}></View> */}
      {/* <View style={styles.glow}></View> */}
      <Shadow
        offset={[0, -4]}
        startColor="#f75f00a4"
        endColor="#f780004b"
        style={extra_styles.flameShadow}
        distance={3}
      >
        <LinearGradient
          style={styles.flame}
          colors={["#ffffff", "#ffffff3d"]}
        />
      </Shadow>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  flameContainer: {
    position: "absolute",
    left: 40,
    top: 40,
  },
  flame: {
    position: "absolute",

    width: 24,
    height: 120,
    zIndex: 3,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  thread: {},
  glow: {},
});

const extra_styles = StyleSheet.create({
  flameShadow: {
    // ...styles.flame,
  },
});
