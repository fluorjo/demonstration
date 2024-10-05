import {
  Canvas,
  Circle,
  LinearGradient,
  Oval,
  Path,
  Shadow,
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
            start={{ x: 50, y: 200 }}
            end={{ x: 50, y: 350 }}
            colors={["#ffffff", "#3724c56f"]}
          />
          <Shadow
            dx={0}
            dy={-15}
            blur={4}
            color="#ff5900cc"
            shadowOnly={false}
          />
          <Shadow dx={1} dy={20} blur={40} color="#ff5900" />
        </Path>
        <Oval x={120} y={380} width={60} height={90} color="#1100ff25">
          <LinearGradient
            start={{ x: 112, y: 300 }}
            end={{ x: 0, y: 380 }}
            colors={["#65657879", "#000000"]}
          />
        </Oval>
        <Oval x={112} y={360} width={75} height={110} color="#2b24ff33">
          <LinearGradient
            start={{ x: 112, y: 300 }}
            end={{ x: 0, y: 360 }}
            colors={["#0000ff55", "#ffffff59"]}
          />
        </Oval>
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
