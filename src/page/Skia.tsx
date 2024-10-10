import {
  Canvas,
  Circle,
  DiscretePathEffect,
  LinearGradient,
  Path,
  RadialGradient,
  RoundedRect,
  Shadow,
  vec,
} from "@shopify/react-native-skia";
import React, { useEffect, useState } from "react";
import { Animated, Easing, Text, View } from "react-native";

export default function SkiaSVG() {
  const [startPointX, setStartPointX] = useState(50.0); // 50
  const [startPointY, setStartPointY] = useState(0.0); // 0.0
  const [Q1ControlX, setQ1ControlX] = useState(75.0); // 75
  const [Q1ControlY, setQ1ControlY] = useState(20.0); // 20
  const [Q2ControlX, setQ2ControlX] = useState(25); // 25
  const [Q2ControlY, setQ2ControlY] = useState(20); // 20
  const [Q1EndX, setQ1EndX] = useState(80.0); // 80
  const [Q1EndY, setQ1EndY] = useState(240.0); // 240
  const [Q2End, setQ2End] = useState(350); // 350
  const [H1, setH1] = useState(20); // 20
  const [V2, setV2] = useState(240); // 240
  const [Q2Control, setQ2Control] = useState((Q1EndY + Q2End) / 2);
  const [Q3ControlX, setQ3ControlX] = useState(15); // 25
  const [Q3ControlY, setQ3ControlY] = useState(20); // 20
  const animatedStartPointX = new Animated.Value(50);
  const animatedStartPointY = new Animated.Value(0);
  const animatedQ1ControlX = new Animated.Value(75);
  const animatedQ1ControlY = new Animated.Value(20);
  const animatedQ2ControlX = new Animated.Value(25);
  const animatedQ2ControlY = new Animated.Value(20);
  const animatedQ1EndX = new Animated.Value(80);
  const animatedQ1EndY = new Animated.Value(140);

  //toValue는 적당히 가까운 값 집어넣고, addListener로 변화시킬 때 랜덤값 넣어서 변화가 랜덤하게 이뤄지게 할까.

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(animatedStartPointX, {
            toValue: 50,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedStartPointX, {
            toValue: 48,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedStartPointX, {
            toValue: 52,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ]),
        Animated.sequence([
          Animated.timing(animatedStartPointY, {
            toValue: 0,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedStartPointY, {
            toValue: -5,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedStartPointY, {
            toValue: 5,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ]),
        Animated.sequence([
          Animated.timing(animatedQ1ControlX, {
            toValue: 85,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedQ1ControlX, {
            toValue: 65,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedQ1ControlX, {
            toValue: 85,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedQ1ControlX, {
            toValue: 75,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ]),
        Animated.sequence([
          Animated.timing(animatedQ1ControlY, {
            toValue: 30,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedQ1ControlY, {
            toValue: 10,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedQ1ControlY, {
            toValue: 30,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedQ1ControlY, {
            toValue: 20,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ]),
        Animated.sequence([
          Animated.timing(animatedQ1ControlX, {
            toValue: 85,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedQ1ControlX, {
            toValue: 65,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedQ1ControlX, {
            toValue: 85,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedQ1ControlX, {
            toValue: 75,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ]),
        Animated.sequence([
          Animated.timing(animatedQ1ControlY, {
            toValue: 30,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedQ1ControlY, {
            toValue: 10,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedQ1ControlY, {
            toValue: 30,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedQ1ControlY, {
            toValue: 20,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ]),
        // Q2
        Animated.sequence([
          Animated.timing(animatedQ2ControlX, {
            toValue: 15,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedQ2ControlX, {
            toValue: 35,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedQ2ControlX, {
            toValue: 15,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedQ2ControlX, {
            toValue: 25,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ]),
        Animated.sequence([
          Animated.timing(animatedQ2ControlY, {
            toValue: 30,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedQ2ControlY, {
            toValue: 10,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedQ2ControlY, {
            toValue: 30,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedQ2ControlY, {
            toValue: 20,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ]),
        // Q1 End X
        Animated.sequence([
          Animated.timing(animatedQ1EndX, {
            toValue: 82,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedQ1EndX, {
            toValue: 78,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedQ1EndX, {
            toValue: 82,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedQ1EndX, {
            toValue: 80,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ]),
      ])
    ).start();

    // animatedStartPointX.addListener(({ value }) => {
    //   const newStartPointX = value;
    //   setStartPointX(newStartPointX);
    //   // const newQ1ControlY = xx + value * random?;
    //   // setQ1ControlY(newQ1ControlY);
    // });
    // animatedStartPointY.addListener(({ value }) => {
    //   const newStartPointY = value;
    //   setStartPointY(newStartPointY);
    //   // const newQ1ControlY = xx + value * random?;
    //   // setQ1ControlY(newQ1ControlY);
    // });
    // animatedQ1ControlX.addListener(({ value }) => {
    //   const newQ1ControlX = value;
    //   setQ1ControlX(newQ1ControlX);
    //   // const newQ1ControlY = xx + value * random?;
    //   // setQ1ControlY(newQ1ControlY);
    // });
    // animatedQ1ControlY.addListener(({ value }) => {
    //   const newQ1ControlY = value;
    //   setQ1ControlY(newQ1ControlY);
    //   // const newQ1ControlY = xx + value * random?;
    //   // setQ1ControlY(newQ1ControlY);
    // });
    // animatedQ2ControlX.addListener(({ value }) => {
    //   const newQ2ControlX = value;
    //   setQ2ControlX(newQ2ControlX);
    //   // const newQ2ControlY = xx + value * random?;
    //   // setQ2ControlY(newQ2ControlY);
    // });
    // animatedQ2ControlY.addListener(({ value }) => {
    //   const newQ2ControlY = value;
    //   setQ2ControlY(newQ2ControlY);
    //   // const newQ2ControlY = xx + value * random?;
    //   // setQ2ControlY(newQ2ControlY);
    // });
    // animatedQ1EndX.addListener(({ value }) => {
    //   const newQ1EndX = value;
    //   setQ1EndX(newQ1EndX);
    //   // const newQ2ControlY = xx + value * random?;
    //   // setQ2ControlY(newQ2ControlY);
    // });

    return () => {
      animatedStartPointX.removeAllListeners();
      animatedStartPointY.removeAllListeners();
      animatedQ1ControlX.removeAllListeners();
      animatedQ1ControlY.removeAllListeners();
      animatedQ2ControlX.removeAllListeners();
      animatedQ2ControlY.removeAllListeners();
    };
  }, []);

  const pathString = `M ${startPointX} ${startPointY} 
  Q ${Q1ControlX} ${Q1ControlY} ${Q1EndX} ${Q1EndY}  
  Q ${Q1EndX} ${Q2Control} ${Q1EndX - 3} ${Q2End}
  L ${Q1EndX - 60} ${Q2End}
  Q ${Q3ControlX} ${Q2Control} ${Q1EndX - 63} ${Q1EndY}
  Q ${Q2ControlX} ${Q2ControlY} ${startPointX} ${startPointY}
  Z`;

  const points = [
    { x: startPointX, y: startPointY, label: "M" },
    { x: Q1ControlX, y: Q1ControlY, label: "     Q1 Control" },
    { x: Q1EndX, y: Q1EndY, label: "    Q1 end" },
    { x: Q1EndX, y: Q2Control, label: "    Q2Control" },
    { x: Q1EndX, y: Q2End, label: "    Q2End" },
    { x: H1, y: Q2End, label: "    Q3 Start" },
    { x: Q3ControlX, y: Q2Control, label: "    Q3 Control" },
    { x: H1, y: V2, label: "Q4 start " },
    { x: Q2ControlX, y: Q2ControlY, label: "Q4 control" },
    { x: startPointX, y: startPointY, label: "Z" },
  ];

  return (
    <View style={{ flex: 1 }}>
      <Canvas
        style={{
          flex: 1,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Path
          path={pathString}
          color="white"
          transform={[{ translateX: 100 }, { translateY: 100 }]}
        >
          <LinearGradient
            start={{ x: 50, y: 290 }}
            end={{ x: 50, y: 360 }}
            colors={["#ffffff", "#2924c595"]}
          />
          <RadialGradient
            c={vec(50, 340)}
            r={60}
            colors={["#ffdd00c4", "#ffffff"]}
          />
          <Shadow
            dx={0}
            dy={-15}
            blur={4}
            color="#ff5900cc"
            shadowOnly={false}
          />
          <Shadow dx={1} dy={10} blur={40} color="#ff5900" />
          <Shadow dx={1} dy={30} blur={20} color="#ff8c00" />
          <Shadow dx={0} dy={60} blur={40} color="#111dff8c" />
        </Path>
        <RoundedRect
          x={120}
          y={400}
          width={60}
          height={60}
          r={24}
          color="#ffb300f9"
        >
          <Shadow dx={0} dy={0} blur={4} color="#ffa406" shadowOnly={true} />
        </RoundedRect>
        <RoundedRect
          x={118}
          y={420}
          width={65}
          height={80}
          r={10}
          color="#0015ffe3"
        >
          <RadialGradient
            c={vec(150, 458)}
            r={40}
            colors={["#0b0060f9", "#6d84e870"]}
          />
          <Shadow dx={0} dy={5} blur={0} color="#000000" shadowOnly={true} />
          <Shadow dx={0} dy={0} blur={10} color="#000fb7" shadowOnly={true} />
        </RoundedRect>
        <RoundedRect
          x={144}
          y={440}
          width={11}
          height={80}
          r={25}
          color="black"
        >
          <DiscretePathEffect length={4} deviation={1.5} />
          <LinearGradient
            start={{ x: 144, y: 410 }}
            end={{ x: 144, y: 580 }}
            colors={["#632402bd", "#000000"]}
          />
          <Shadow dx={0} dy={-10} blur={15} color="#ff8400" />
          <Shadow dx={0} dy={0} blur={25} color="#0227acf5" />
        </RoundedRect>
        {points.map((point, index) => (
          <Circle
            key={index}
            cx={point.x + 100}
            cy={point.y + 100}
            r={3}
            color="red"
          />
        ))}
      </Canvas>
      {points.map((point, index) => (
        <View
          key={index}
          style={{
            position: "absolute",
            left: point.x + 100 - 10,
            top: point.y + 100 - 10,
          }}
        >
          <Text style={{ color: "green", fontSize: 10 }}>{point.label}</Text>
        </View>
      ))}
    </View>
  );
}
