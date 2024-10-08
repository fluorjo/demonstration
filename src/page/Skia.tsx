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
import React, { useState } from "react";
import { Text, View } from "react-native";

export default function SkiaSVG() {
  // 50
  const [startPointX, setStartPointX] = useState(50.0);
  // 0.0
  const [startPointY, setStartPointY] = useState(0.0);
  // 75
  const [Q1ControlX, setQ1ControlX] = useState(75.0);
  // 20
  const [Q1ControlY, setQ1ControlY] = useState(20.0);
  // 80
  const [Q1EndX, setQ1EndX] = useState(80.0);
  // 140
  const [Q1EndY, setQ1EndY] = useState(140.0);
  // 350
  const [V1, setV1] = useState(350);
  // 20
  const [H1, setH1] = useState(20);
  // 140
  const [V2, setV2] = useState(140);
  // 25
  const [Q2ControlX, setQ2ControlX] = useState(25);
  // 20
  const [Q2ControlY, setQ2ControlY] = useState(20);

  const pathString = `M ${startPointX} ${startPointY} 
  Q ${Q1ControlX} ${Q1ControlY} ${Q1EndX} ${Q1EndY}
  V ${V1}
  H ${H1}
  V ${V2}
  Q ${Q2ControlX} ${Q2ControlY} ${startPointX} ${startPointY}
  Z`;

  const points = [
    { x: startPointX, y: startPointY, label: "M" },
    { x: Q1ControlX, y: Q1ControlY, label: "     Q1 Control" },
    { x: Q1EndX, y: Q1EndY, label: "    Q1 end" },
    { x: Q1EndX, y: V1, label: "    V1 end" },
    { x: H1, y: V1, label: "    H end" },
    { x: H1, y: V2, label: "Q2 start " },
    { x: Q2ControlX, y: Q2ControlY, label: "Q2 control" },
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
          color="#ffea00e3"
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
            start={{ x: 144, y: 450 }}
            end={{ x: 144, y: 580 }}
            colors={["#000000", "#ff5900ee"]}
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
