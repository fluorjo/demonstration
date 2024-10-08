import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
export default function Flame() {
  const flameScale = useRef(new Animated.Value(1)).current;
  const flameOpacity = useRef(new Animated.Value(1)).current;
  const flameMove = useRef(new Animated.Value(0)).current;
  const scaleY = useRef(new Animated.Value(1)).current;
  const spinValue = useRef(new Animated.Value(0)).current;
  const skewXValue = useRef(new Animated.Value(0)).current;

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
            toValue: 0.7,
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
            toValue: -1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(flameMove, {
            toValue: 3,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        Animated.loop(
          Animated.sequence([
            Animated.timing(spinValue, {
              toValue: 1,
              duration: 1500,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(spinValue, {
              toValue: -1,
              duration: 1500,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(spinValue, {
              toValue: 0,
              duration: 1500,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(skewXValue, {
              toValue: 1,
              duration: 1500,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(skewXValue, {
              toValue: -1,
              duration: 1500,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(skewXValue, {
              toValue: 0,
              duration: 1500,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        ),
      ])
    ).start();
  }, [flameScale, flameOpacity, flameMove, spinValue]);
  const spin = spinValue.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-1deg", "1deg"],
  });
  const skewX = skewXValue.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-5deg", "5deg"],
  });
  return (
    <Animated.View
      style={[
        {
          transform: [
            //   // { scale: scale },
            //   { scaleY: scaleY },
            //   {
            //     translateY: scaleY.interpolate({
            //       inputRange: [1, 1.1],
            //       outputRange: [0, -10],
            //     }),
            //   },
            // { translateY:250 },
            // {
            //   rotate: spin,
            // },
            // { translateY: -250 },

            // { skewX: skewX },
            // { translateX: flameMove },
          ],
          transformOrigin: "top",
          // opacity: flameOpacity,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.flameContainer,
          //   {
          //     transform: [
          //       // { scale: scale },
          //       { scaleY: scaleY },
          //       {
          //         translateY: scaleY.interpolate({
          //           inputRange: [1, 1.1],
          //           outputRange: [0, -10],
          //         }),
          //       },
          //     ],
          //     opacity: flameOpacity,
          //   },
        ]}
      >
        {/* <View style={styles.thread}></View> */}
        {/* <View style={styles.glow}></View> */}

        <LinearGradient
          style={styles.flame}
          colors={["#f81919", "#fd17173c"]}
        />
      </Animated.View>
      <Animated.View
        style={[
          extra_styles.flameContainer2,
          //   {
          //     transform: [
          //       // { scale: scale },
          //       { scaleY: scaleY },
          //       {
          //         translateY: scaleY.interpolate({
          //           inputRange: [1, 1.1],
          //           outputRange: [0, -10],
          //         }),
          //       },
          //     ],
          //     opacity: flameOpacity,
          //   },
        ]}
      >
        {/* <View style={styles.thread}></View> */}
        {/* <View style={styles.glow}></View> */}

        <LinearGradient
          style={extra_styles.flame2}
          colors={["#f81919", "#fd17173c"]}
        />
      </Animated.View>
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
    width: 36,
    height: 90,
    zIndex: 3,
    borderTopLeftRadius: 600,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 120,
    backgroundColor: "#fff",
    transform: [{ scaleX: 0.25 }],
    borderStyle: "solid",
  },

  thread: {},
  glow: {},
});

const extra_styles = StyleSheet.create({
  flame2: {
    ...styles.flame,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 600,
    borderBottomRightRadius: 120,
    borderBottomLeftRadius: 0,
  },
  flameContainer2: {
    ...styles.flameContainer,
    left: 49,
  },
});
