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
import React from "react";
import { Text, View } from "react-native";

export default function SkiaSVG() {
  const pathString = `M 50 0 
  Q 75 20 80 140
  V 350
  H 20
  V 140
  Q 25 20 50 0
  Z`;
  const bottomPathString = `M 50 200 
  Q 75 20 80 140
  V 350
  H 20
  V 140
  Q 25 20 50 0
  Z`;

  const points = [
    { x: 50, y: 0, label: "M" },
    { x: 75, y: 20, label: "     Q1 Control" },
    { x: 80, y: 140, label: "    Q1 end" },
    { x: 80, y: 350, label: "    V1 end" },
    { x: 20, y: 350, label: "    H end" },
    { x: 20, y: 140, label: "Q2 start " },
    { x: 25, y: 20, label: "Q2 control" },
    { x: 50, y: 0, label: "Z" },
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
          y={420}
          width={60}
          height={80}
          r={30}
          color="#0015ff88"
        >
          <RadialGradient
            c={vec(150, 458)}
            r={40}
            colors={["#0b0060f9", "#6d84e870"]}
          />
          <Shadow dx={0} dy={-10} blur={30} color="#ffd900" />
          <Shadow dx={0} dy={0} blur={20} color="#0000ff" />
        </RoundedRect>
        <RoundedRect
          x={144}
          y={420}
          width={11}
          height={80}
          r={25}
          color="black"
        >
          <DiscretePathEffect length={4} deviation={1.5} />
          <LinearGradient
            start={{ x: 144, y: 410 }}
            end={{ x: 144, y: 580 }}
            colors={["#000000", "#a963375b"]}
          />
          <Shadow dx={0} dy={-10} blur={15} color="#000000" />
          <Shadow dx={0} dy={0} blur={20} color="#0000ff" />
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
