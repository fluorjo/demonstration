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
            gradientTransform="translate(8.5 8.5) rotate(360) scale(17 17)"
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
    width: 17,
    height: 17,
    borderRadius:25,
    left: "61%",
    top: "48.5%",
    zIndex:5,
    transform: [{ scaleX: 6 }],
    overflow: "hidden",
  },
});
