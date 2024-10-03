import React, { useEffect, useState } from "react";
import { Animated, Easing } from "react-native";
import Svg, { Path } from "react-native-svg";

const SIZE = 300;

export default function SVG() {
  const [startPointX, setStartPointX] = useState(0.5);
  const [startPointY, setStartPointY] = useState(0.0);
  const [controlPointX1, setControlPointX1] = useState(0.5);
  const [controlPointY1, setControlPointY1] = useState(0.0);
  const [controlPointX2, setControlPointX2] = useState(0.9);
  const [controlPointY2, setControlPointY2] = useState(1);

  const animatedValue0 = new Animated.Value(0);
  const animatedValue1 = new Animated.Value(0);
  const animatedValue2 = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(animatedValue0, {
            toValue: 1,
            duration: 200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedValue0, {
            toValue: 0,
            duration: 200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ]),
        Animated.sequence([
          Animated.timing(animatedValue1, {
            toValue: 1,
            duration: 200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedValue1, {
            toValue: 0,
            duration: 200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ]),
        Animated.sequence([
          Animated.timing(animatedValue2, {
            toValue: 1,
            duration: 200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedValue2, {
            toValue: 0,
            duration: 200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ]),
      ])
    ).start();
    
    // animatedValue0.addListener(({ value }) => {
    //   const newStartPointX = 0.5 - value * 0.1;
    //   setStartPointX(newStartPointX);
    //   const newStartPointY = 0 + value * 0.1;
    //   setStartPointY(newStartPointY);
    // });
    // animatedValue1.addListener(({ value }) => {
    //   const newControlPointX1 = 0.5 + value * 0.1;
    //   setControlPointX1(newControlPointX1);
    //   const newControlPointY1 = 0 + value * 0.1;
    //   setControlPointY1(newControlPointY1);
    // });
    // animatedValue2.addListener(({ value }) => {
    //   const newControlPointX2 = 0.9 - value * 0.1;
    //   setControlPointX2(newControlPointX2);
    //   const newControlPointY2 = 1 - value * 0.1;
    //   setControlPointY2(newControlPointY2);
    // });

    return () => {
      animatedValue0.removeAllListeners();
      animatedValue1.removeAllListeners();
      animatedValue2.removeAllListeners();
    };
  }, []);

  const flame_right = [
    `M ${startPointX} ${startPointY}`,
    `C ${controlPointX1} ${controlPointY1}, ${controlPointX2} ${controlPointY2}, 0.5 1`,
  ].join(" ");

  const flame_left = [
    `M ${startPointX} ${startPointY}`,
    `C ${1 - controlPointX1} ${controlPointY1}, ${
      1 - controlPointX2
    } ${controlPointY2}, 0.5 1`,
  ].join(" ");

  return (
    <Svg style={{ width: SIZE, height: SIZE }} viewBox="0 0 1 1">
      <Path d={flame_right} fill="#ff0000" />
      <Path d={flame_left} fill="#ff0000" />
    </Svg>
  );
}
