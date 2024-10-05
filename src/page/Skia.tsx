import { Canvas, Path, Shadow, Skia } from "@shopify/react-native-skia";

export default function SkiaSVG() {
  const r = 128;
  const svg = Skia.SVG.MakeFromString(
    `<svg viewBox='0 0 300 500' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='31' cy='325' r='120px' fill='#c02aaa'/>
    </svg>`
  )!;
  return (
    <Canvas style={{ flex: 1 }}>
      <Path path="M 50 0 C 100 180 90 150 50 300" color="lightblue" />
      <Shadow dx={12} dy={12} blur={25} color="#ff5900" />
      <Path path="M 50 0 C 0 180 10 150 50 300" color="red" />
      <Shadow dx={-12} dy={-12} blur={25} color="#9500ff" />
    </Canvas>
  );
}
