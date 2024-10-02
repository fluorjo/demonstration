import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { Shadow } from "react-native-shadow-2";
export default function Flame() {
  const flameScale = useRef(new Animated.Value(1)).current;
  const flameOpacity = useRef(new Animated.Value(1)).current;
  const flameMove = useRef(new Animated.Value(0)).current;
  const scaleY = useRef(new Animated.Value(1)).current;

  const getRandom = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scaleY, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleY, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(flameScale, {
            toValue: 1.1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(flameScale, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(flameOpacity, {
            toValue: 0.9,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(flameOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(flameMove, {
            toValue: 1.5,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(flameMove, {
            toValue: 1,
            duration: 500,
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
        {
          transform: [
            // { scale: scale },
            
            { scaleY: scaleY },
            {
                translateY: scaleY.interpolate({
                  inputRange: [1, 1.1],
                  outputRange: [0, -10],
                }),
              },
          ],
          transformOrigin: "0%",
          opacity: flameOpacity,
        },
        ,
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
