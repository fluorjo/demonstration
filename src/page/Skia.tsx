import {
  Canvas,
  Circle,
  DiscretePathEffect,
  Line2DPathEffect,
  LinearGradient,
  Path,
  Path1DPathEffect,
  processTransform2d,
  RadialGradient,
  RoundedRect,
  Shadow,
  vec,
} from "@shopify/react-native-skia";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Button, Easing, Text, View } from "react-native";

export default function SkiaSVG() {
  const [startPointX, setStartPointX] = useState(50.0); // 50
  const [startPointY, setStartPointY] = useState(0.0); // 0.0
  const [Q1EndX, setQ1EndX] = useState(80.0); // 80
  const [Q1EndY, setQ1EndY] = useState(240.0); // 240
  const [Q1ControlX, setQ1ControlX] = useState(75.0); // 75
  const [Q1ControlY, setQ1ControlY] = useState(20.0); // 20
  const [Q2EndX, setQ2EndX] = useState(Q1EndX - 3);
  const [Q2EndY, setQ2EndY] = useState(355); // 350
  const [Q3StartX, setQ3StartX] = useState(Q2EndX - 60);
  const [Q3StartY, setQ3StartY] = useState(Q2EndY);
  const [Q3EndX, setQ3EndX] = useState(Q1EndX - 63);
  const [Q3EndY, setQ3EndY] = useState(Q1EndY);
  const [Q2ControlX, setQ2ControlX] = useState(Q1EndX); // 80
  const [Q2ControlY, setQ2ControlY] = useState((Q1EndY + Q2EndY) / 2);
  const [Q3ControlX, setQ3ControlX] = useState(15); // 25
  const [Q3ControlY, setQ3ControlY] = useState(295); // 20
  const [Q4ControlX, setQ4ControlX] = useState(25); // 25
  const [Q4ControlY, setQ4ControlY] = useState(20); // 20

  const animatedStartPointX = new Animated.Value(startPointX);
  const animatedStartPointY = new Animated.Value(startPointY);
  const animatedQ1ControlX = new Animated.Value(Q1ControlX);
  const animatedQ1ControlY = new Animated.Value(Q1ControlY);
  const animatedQ1EndX = new Animated.Value(Q1EndX);
  const animatedQ1EndY = new Animated.Value(Q1EndY);
  const animatedQ2ControlX = new Animated.Value(Q2ControlX);
  const animatedQ2ControlY = new Animated.Value(Q2ControlY);
  const animatedQ2EndX = new Animated.Value(Q2EndX);
  const animatedQ2EndY = new Animated.Value(Q2EndY);
  const animatedQ3StartX = new Animated.Value(Q3StartX);
  const animatedQ3StartY = new Animated.Value(Q3StartY);
  const animatedQ3ControlX = new Animated.Value(Q3ControlX);
  const animatedQ3ControlY = new Animated.Value(Q3ControlY);
  const animatedQ3EndX = new Animated.Value(Q3EndX);
  const animatedQ3EndY = new Animated.Value(Q3EndY);
  const animatedQ4ControlX = new Animated.Value(Q4ControlX);
  const animatedQ4ControlY = new Animated.Value(Q4ControlY);

  //toValue는 적당히 가까운 값 집어넣고, addListener로 변화시킬 때 랜덤값 넣어서 변화가 랜덤하게 이뤄지게 할까.
  const transformValue = [{ translateX: 100 }, { translateY: 100 }];

  const [isAnimating, setIsAnimating] = useState(true);
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

 
  const startRandomAnimation = (animatedValue, baseValue, range) => {
    const randomValue = baseValue + (Math.random() * 2 - 1) * range;
    Animated.timing(animatedValue, {
      toValue: randomValue,
      duration: 2000 + Math.random() * 1000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start(() => startRandomAnimation(animatedValue, baseValue, range));
  };
// 의도대로 되긴 했고 여기서 뭔가 왼쪽이면 왼쪽, 오른쪽이면 오른쪽으로 한쪽으로만 움직이게 한다던가 해서 좀 더 세밀한 부분에서 자연스럽게 움직이도록 해야겠다. 
  useEffect(() => {
    startRandomAnimation(animatedStartPointX, 50, 15);
    startRandomAnimation(animatedStartPointY, 0, 10);
    startRandomAnimation(animatedQ1ControlX, 75, 10);
    startRandomAnimation(animatedQ1ControlY, 20, 10);
    startRandomAnimation(animatedQ4ControlX, 25, 10);
    startRandomAnimation(animatedQ4ControlY, 20, 10);

    animatedStartPointX.addListener(({ value }) => setStartPointX(value));
    animatedStartPointY.addListener(({ value }) => setStartPointY(value));
    animatedQ1ControlX.addListener(({ value }) => setQ1ControlX(value));
    animatedQ1ControlY.addListener(({ value }) => setQ1ControlY(value));
    animatedQ4ControlX.addListener(({ value }) => setQ4ControlX(value));
    animatedQ4ControlY.addListener(({ value }) => setQ4ControlY(value));

    return () => {
      animatedStartPointX.removeAllListeners();
      animatedStartPointY.removeAllListeners();
      animatedQ1ControlX.removeAllListeners();
      animatedQ1ControlY.removeAllListeners();
      animatedQ4ControlX.removeAllListeners();
      animatedQ4ControlY.removeAllListeners();
    };
  }, []);

  const pathString = `M ${startPointX} ${startPointY} 
  Q ${Q1ControlX} ${Q1ControlY} ${Q1EndX} ${Q1EndY}  
  Q ${Q2ControlX} ${Q2ControlY} ${Q2EndX} ${Q2EndY}
  L ${Q3StartX} ${Q3StartY}
  Q ${Q3ControlX} ${Q3ControlY} ${Q3EndX} ${Q3EndY}
  Q ${Q4ControlX} ${Q4ControlY} ${startPointX} ${startPointY}
  Z`;

  const points = [
    { x: startPointX, y: startPointY, label: "M" },
    { x: Q1ControlX, y: Q1ControlY, label: "     Q1 Control" },
    { x: Q1EndX, y: Q1EndY, label: "    Q1 end" },
    { x: Q1EndX, y: Q2ControlY, label: "    Q2Control" },
    { x: Q1EndX, y: Q2EndY, label: "    Q2End" },
    { x: Q3StartX, y: Q3StartY, label: "    Q3 Start" },
    { x: Q3ControlX, y: Q3ControlY, label: "    Q3 Control" },
    { x: Q3EndX, y: Q3EndY, label: "Q3 End " },
    { x: Q4ControlX, y: Q4ControlY, label: "Q4 control" },
    { x: startPointX, y: startPointY, label: "Z" },
  ];

  const blueFlame = "#0227ac";
  const yellow = "#ff9500ab";
  const yellowCore = "#ff9500a4";

  const FlameCore = () => {
    return (
      <RoundedRect
        x={Q3StartX - 1}
        y={Q3ControlY + 32}
        width={Q2EndX - Q3StartX + 2}
        height={Q2EndX - Q3StartX - 18}
        r={20}
        color={yellowCore}
        transform={transformValue}
      >
        <Shadow dx={0} dy={0} blur={5} color={yellowCore} shadowOnly={true} />
      </RoundedRect>
    );
  };
  // const startAnimation = () => {
  //   if (animationRef.current) {
  //     animationRef.current.stop();
  //   }
  //   animationRef.current = createAnimation();
  //   animationRef.current?.start();
  // };

  // const stopAnimation = () => {
  //   if (animationRef.current) {
  //     animationRef.current.stop();
  //     animationRef.current = null; 
  //   }
  // };

  // const toggleAnimation = () => {
  //   if (isAnimating) {
  //     stopAnimation();
  //   } else {
  //     startAnimation();
  //   }
  //   setIsAnimating(!isAnimating);
  // };

  // useEffect(() => {
  //   if (isAnimating) {
  //     startAnimation();
  //   }
  //   return () => {
  //     stopAnimation();
  //   };
  // }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* <Button
        title={isAnimating ? "Stop Animation" : "Start Animation"}
        onPress={toggleAnimation}
      /> */}

      <Canvas
        style={{
          flex: 1,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Path path={pathString} color="white" transform={transformValue}>
          <RadialGradient
            c={vec(startPointX, Q3StartY - 20)}
            r={80}
            colors={[yellow, "#ffffff"]}
          />
          <Shadow
            dx={0}
            dy={-15}
            blur={4}
            color="#ff5900cc"
            shadowOnly={false}
          />
          <Shadow dx={1} dy={10} blur={40} color="#ff5900" />
          <Shadow dx={1} dy={30} blur={10} color="#ff8c00d2" />
          <Shadow dx={0} dy={60} blur={40} color="#0227ac" />
        </Path>
        {FlameCore()}
        {FlameCore()}
        {FlameCore()}
        {FlameCore()}
        {FlameCore()}
        {FlameCore()}
        {FlameCore()}

        {/* <Circle
          cx={(Q3StartX + Q2EndX) / 2}
          cy={Q3StartY}
          r={(Q2EndX - Q3StartX) / 2}
          color={yellow}
          transform={transformValue}
        >
          <Shadow dx={0} dy={0} blur={5} color={yellow} shadowOnly={true} />
        </Circle> */}

        {/*양옆 올라오는 파란 불*/}
        <Path
          path={pathString}
          color="white"
          transform={transformValue}
          start={0.53}
          end={0.75}
        >
          <Shadow
            dx={-5}
            dy={45}
            blur={4.3}
            color={blueFlame}
            shadowOnly={true}
          />
        </Path>
        <Path
          path={pathString}
          color="white"
          transform={transformValue}
          start={0.25}
          end={0.47}
        >
          <Shadow
            dx={5}
            dy={40}
            blur={4.3}
            color={blueFlame}
            shadowOnly={true}
          />
        </Path>

        <RoundedRect
          x={Q3StartX}
          y={Q3ControlY + 38}
          width={Q2EndX - Q3StartX + 3}
          height={Q2EndX - Q3StartX + 18}
          r={13}
          color={blueFlame}
          transform={transformValue}
        >
          <RadialGradient
            c={vec(Q3StartX - 70, Q3ControlY - 25)}
            r={40}
            colors={["#000000", "#0000006d"]}
            transform={transformValue}
          />
          <Shadow dx={0} dy={5} blur={0} color="#000000ca" shadowOnly={true} />
          <Shadow dx={0} dy={-2} blur={6} color={blueFlame} shadowOnly={true} />
        </RoundedRect>
        {/*가운데 검은 그림자 */}
        <RoundedRect
          x={Q3StartX + 7}
          y={Q3ControlY + 70}
          width={Q2EndX - Q3StartX - 10}
          height={Q2EndX - Q3StartX - 4}
          r={13}
          color="#000000"
          transform={transformValue}
        >
          <RadialGradient
            c={vec(Q3StartX - 70, Q3ControlY - 25)}
            r={40}
            colors={["#000000ef", "#ff00006e"]}
            transform={transformValue}
          />
          <Shadow dx={0} dy={0} blur={40} color="#0000004f" shadowOnly={true} />
        </RoundedRect>
        {/* 심지 */}
        <RoundedRect
          x={144}
          y={440}
          width={11}
          height={80}
          r={25}
          color="black"
        >
          <DiscretePathEffect length={4} deviation={1.5} />
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
            colors={["#632402a6", "#000000"]}
          />
          <Line2DPathEffect
            width={0.9}
            matrix={processTransform2d([{ scale: 1.4 }])}
          />
          <Shadow dx={0} dy={-10} blur={15} color="#ff000022" />
          <Shadow dx={0} dy={0} blur={0} color="#0000006c" />
        </RoundedRect>
        {/* 심지 윗부분 */}
        <RoundedRect
          x={144}
          y={440}
          width={11}
          height={20}
          r={25}
          color="#ff4000f1"
        >
          <Shadow dx={0} dy={0} blur={1} color="#FF5800" shadowOnly={true} />
          <Shadow dx={0} dy={-4} blur={15} color="#FF5800" shadowOnly={false} />
          <Path1DPathEffect
            path="M 0 0 L 1 1, 4 5, 1 12 Z"
            advance={5}
            phase={15}
            style="rotate"
          />
        </RoundedRect>
        {/* 빛*/}
        <Circle
          cx={startPointX}
          cy={(startPointX + Q3StartY) / 2}
          r={Q3StartY / 2 + 20}
          color="#ffffffc4"
          transform={transformValue}
        >
          <Shadow
            dx={0}
            dy={-100}
            blur={40}
            color="#ff620050"
            shadowOnly={true}
          />
        </Circle>
        {points.map((point, index) => (
          <Circle
            key={index}
            cx={point.x + 100}
            cy={point.y + 100}
            // cx={point.x }
            // cy={point.y }
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
            // left: point.x ,
            // top: point.y ,
          }}
        >
          <Text style={{ color: "green", fontSize: 10 }}>{point.label}</Text>
        </View>
      ))}
    </View>
  );
}
