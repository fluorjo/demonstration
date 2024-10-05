import { Canvas, Circle, Group, Skia } from "@shopify/react-native-skia";

import { useState } from "react";

export default function SkiaSVG() {


  const r = 128;
  const svg = Skia.SVG.MakeFromString(
    `<svg viewBox='0 0 290 500' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='31' cy='325' r='120px' fill='#c02aaa'/>
    </svg>`
  )!;
  return (
    <Canvas style={{ flex: 1 }}>
      <Circle cx={r} cy={r} r={r} color="#51AFED" />
      {/* The paint is inherited by the following sibling and descendants. */}
      <Group color="lightblue" style="stroke" strokeWidth={10}>
        <Circle cx={r} cy={r} r={r / 2} />
        <Circle cx={r} cy={r} r={r / 3} color="white" />
      </Group>
    </Canvas>
  );
}
