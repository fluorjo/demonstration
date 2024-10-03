import React, { useEffect, useState } from "react";
import { Animated, Easing } from "react-native";
import Svg, { Path } from "react-native-svg";

const SIZE = 300;

export default function SVG() {
  const [startPointX, setControlPointX] = useState(0.1);
  const [startPointY, setControlPointY] = useState(0.0);
  const [controlPointX1, setControlPointX1] = useState(0.5);
  const [controlPointY1, setControlPointY1] = useState(0.0);
  const [controlPointX2, setControlPointX2] = useState(0.9);
  const [controlPointY2, setControlPointY2] = useState(1);

  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    ).start();

    animatedValue.addListener(({ value }) => {
      //   const newControlPointX = 0.9 - value * 0.1;
      //   setControlPointX(newControlPointX);
      //   const newControlPointY = 1 - value * 0.1;
      //   setControlPointY(newControlPointY);
    });

    return () => {
      animatedValue.removeAllListeners();
    };
  }, []);

  const flame_right = [
    `M ${startPointX} ${startPointY}`,
    `C ${controlPointX1} ${controlPointY1}, ${controlPointX2} ${controlPointY2}, 0.5 1`,
  ].join(" ");

  const flame_left = [
    `M ${startPointX} ${startPointY}`,
    `C ${controlPointX1} ${controlPointY1}, ${
      1 - controlPointX2
    } ${controlPointY2}, 0.5 1`,
  ].join(" ");
  
  const mask_left = [
    `M ${startPointX} ${startPointY}`,
    `C ${0.3} ${0.0}, ${0.3} ${0.3}, 0.3 0.5`,
  ].join(" ");
  return (
    <Svg style={{ width: SIZE, height: SIZE }} viewBox="0 0 1 1">
      {/* <Path d={flame_right} fill="#ff0000" /> */}
      <Path d={flame_left} fill="#ff0000" />
      <Path d={mask_left} fill="#ffffff" />
    </Svg>
  );
}
