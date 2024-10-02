import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Animated, Easing } from 'react-native';

import { RadialGradient } from "../components/RadialGradient";
const randomValue = (min, max) => Math.random() * (max - min) + min;



export default function CandlePage() {
    
  //빛 번짐 효과 같은 것도 있으면 좋겠다.
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <RadialGradient />
      <LinearGradient
        style={styles.gBody}
        colors={["#ca9800", "#573903", "#000000"]}
      ></LinearGradient>
      <LinearGradient
        colors={["rgba(0, 0, 0, .3)", "rgba(0, 0, 0, .8)", "#fff"]}
        style={styles.afterGBody}
      />
      <View style={styles.gFireBox}>
        <View style={styles.gFire}>
          <View></View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  gBody: {
    left: "50%",
    top: "50%",
    position: "relative",
    width: 100,
    height: 300,
    zIndex: 3,
  },
  afterGBody: {
    position: "absolute",
    width: 4,
    height: 48,
    left: "63%",
    top: "46%",
    transform: [{ translateX: -2 }, { translateY: -24 }], // translate(-50%, -50%)
    borderRadius: 50,
    opacity: 0.7,
    zIndex: 5,
  },
  gFireBox: {
    position: "absolute",
    top: "46%",
    left: "63%",
    width: 80,
    height: 200,
    transform: [{ translateX: -40 }, { translateY: -100 }],
  },
  gFire: {
    position: "absolute",
    top: "46%",
    left: "63%",
    borderRadius: 24,
    borderStyle: "solid",
    borderWidth: 120,
    borderColor: "#000000",
    backgroundColor: "#761b00",
  },
});
