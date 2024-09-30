import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import { RadialGradient } from "../components/RadialGradient";

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
      <View>
        <View>
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
    zIndex: 1,
  },
  afterGBody: {
    position: "absolute",
    width: 4,
    height: 48,
    left: "50%",
    top: -22,
    transform: [{ translateX: -2 }, { translateY: -24 }], // translate(-50%, -50%)
    borderRadius: 50,
    opacity: 0.7,
    zIndex: 3,
  },
});
