import React, { useEffect, useState } from "react";
import { Animated, Easing } from "react-native";
import Svg, { Ellipse, Path } from "react-native-svg";

const SIZE = 300;

export default function SVG() {
  // 0.5
  const [startPointX, setStartPointX] = useState(0.5);
  // 0.0
  const [startPointY, setStartPointY] = useState(0.0);
  // 0.5
  const [controlPointX1, setControlPointX1] = useState(0.6);
  // 0.0
  const [controlPointY1, setControlPointY1] = useState(0.0);
  // 0.9
  const [controlPointX2, setControlPointX2] = useState(0.75);
  // 1
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
  const bottom_left = [`M 0.5 1`, `Q 0.8 1 0.5 0.7`].join(" ");
  //#f75f00be
  return (
    <Svg
      style={{ width: SIZE, height: SIZE, backgroundColor: "#000000" }}
      viewBox="0 0 1 1"
    >
      <Path
        d={flame_right}
        fill="rgba(255, 123, 0, 0.477)" 
        transform="translate(0.02, 0.02)" 
      />
      <Path
        d={flame_left}
        fill="rgba(255, 123, 0, 0.477)" 
        transform="translate(-0.02, 0.02)" 
      />
      <Path d={flame_right} fill="#ffffff" />
      <Path d={flame_left} fill="#ffffff" />
      {/* <Path d={bottom_left} fill="#002fffcd" />
       */}
      <Ellipse cx="0.5" cy="0.8" rx="0.12" ry="0.2" fill="#0084ff8e" />
      <Ellipse cx="0.5" cy="0.85" rx="0.08" ry="0.15" fill="#0048ff96" />
    </Svg>
  );
}
