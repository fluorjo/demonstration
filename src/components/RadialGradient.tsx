import { StyleSheet, View } from "react-native";

import {
  Defs,
  Path,
  Stop,
  Svg,
  RadialGradient as SVGRadialGradient,
} from "react-native-svg";

export function RadialGradient() {
  return (
    <View style={styles.beforeGBody}>
      <Svg
        height="50"
        width="50"
        style={{
          position: "absolute",
        }}
      >
        <Path
          d="M0 0H375V279C375 283.418 371.418 287 367 287H8C3.58172 287 0 283.418 0 279V0Z"
          fill="url(#grad)"
        />
        <Defs>
          <SVGRadialGradient
            id="grad"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(25 25) rotate(360) scale(50 50)"
          >
            <Stop stopColor={"#eebb64"} offset={0.2} />
            <Stop stopColor={"#d1a16d"} offset={0.3} />
            <Stop stopColor={"#905602"} offset={0.5} />
          </SVGRadialGradient>
        </Defs>
      </Svg>
    </View>
  );
}
const styles = StyleSheet.create({
  beforeGBody: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    left: "56.6%",
    top: "46%",
    zIndex: 2,
    transform: [{ scaleX: 2 }],
    overflow: "hidden",
  },
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
