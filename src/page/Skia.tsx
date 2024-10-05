import { Canvas, Path, Shadow, Skia } from "@shopify/react-native-skia";

export default function SkiaSVG() {
  const r = 128;
  const svg = Skia.SVG.MakeFromString(
    `<svg viewBox='0 0 300 500' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='31' cy='325' r='120px' fill='#c02aaa'/>
    </svg>`
  )!;
  return (
    <Canvas style={{ flex: 1, backgroundColor:'black' }}>
  <Path
    path="M 50 0 
          C 100 180 90 150 50 300 
          C 10 150 0 180 50 0 Z" 
    color="white"  
  />
      <Shadow dx={0} dy={-15} blur={4} color="#ff5900cc"  shadowOnly={false}/>
      <Shadow dx={1} dy={20} blur={40} color="#ff5900"  />
    </Canvas>
  );
}
