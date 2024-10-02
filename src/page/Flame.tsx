import { BlurView } from "expo-blur";
import React from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
export default function Flame() {
return (
<View style={styles.flame}>

</View>
)
}

const styles = StyleSheet.create({
    flame: {
      left: "50%",
      top: "50%",
      position: "relative",
      width: 24,
      height: 120,
      zIndex: 3,
      backgroundColor:'red',
      borderTopEndRadius:50,
      borderTopStartRadius:50,
      borderBottomRightRadius:20,
      borderBottomLeftRadius:20,

    },
  });
  