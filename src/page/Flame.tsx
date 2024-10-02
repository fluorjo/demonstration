import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet,View } from "react-native";
import { Shadow } from "react-native-shadow-2";
export default function Flame() {
  return (
    <View style={styles.flameContainer}>
      {/* <View style={styles.thread}></View> */}
      {/* <View style={styles.glow}></View> */}
      <Shadow
        offset={[0, -7]}
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
    </View>
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
