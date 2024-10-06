import {
  Canvas,
  Circle,
  LinearGradient,
  Oval,
  Path,
  RoundedRect,
  Shadow,
  DiscretePathEffect
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
            start={{ x: 50, y: 300 }}
            end={{ x: 50, y: 350 }}
            colors={["#ffffff", "#2924c525"]}
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
          <Shadow dx={0} dy={60} blur={40} color="#111dff8e" />
        </Path>

        <Oval
          x={118}
          y={390}
          width={65}
          height={110}
          color="#ffc40065"
          style="fill"
          strokeJoin="bevel"
        >
          <LinearGradient
            start={{ x: 112, y: 390 }}
            end={{ x: 112, y: 520 }}
            colors={["#f288067a", "#0014f4a1"]}
          />
          <Shadow dx={0} dy={0} blur={10} color="#000000" shadowOnly={false} />
        </Oval>
        <Oval x={120} y={410} width={60} height={90} color="#2b00ff4f">
          <LinearGradient
            start={{ x: 120, y: 300 }}
            end={{ x: 120, y: 410 }}
            colors={["#00000022", "#00000048"]}
          />
        </Oval>
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
