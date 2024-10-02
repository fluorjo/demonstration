import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function Flame() {
  return (
    <>
      <View style={styles.thread}></View>
      <View style={styles.glow}></View>
      <LinearGradient
        style={styles.flame}
        colors={["#ffffff", "#ffffff3d"]}
      ></LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  flame: {
    left: "50%",
    top: "50%",
    position: "relative",
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
