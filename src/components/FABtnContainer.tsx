import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useState } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  StretchInY,
  StretchOutY,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { FABtn4Demo } from "./FABtn4DemoInfo";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const { width } = Dimensions.get("window");
const animatedContainerWidth = 300;
const plusButtonSize = 40;

export default function FloatingActionBtnContainer({ buttons }) {
  const isExpanded = useSharedValue(false);
  const rotation = useSharedValue(0);
  const [show, setShow] = useState(false);

  const handlePress = () => {
    isExpanded.value = !isExpanded.value;
    rotation.value = isExpanded.value ? 0 : 45;
    setShow(!isExpanded.value);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: width/2-plusButtonSize/2 },
        { rotateZ: withTiming(`${rotation.value}deg`) },
      ],
    };
  });
  return (
    <View style={styles.buttonContainer}>
      {/* <Animated.View style={styles.wrapper}> */}
        <AnimatedPressable
          onPress={handlePress}
          style={[styles.shadow, mainButtonStyles.button, animatedStyle]}
        >
          <FontAwesome name="plus" size={24} color="white" />
        </AnimatedPressable>
      {/* </Animated.View> */}

      {/* {show && (
        <Animated.View
          style={[styles.animatedContainer]}
          entering={StretchInY}
          exiting={StretchOutY}
        ></Animated.View>
      )} */}

      {buttons.map((button, index) => (
        <FABtn4Demo
          isExpanded={isExpanded}
          IconName={button.IconName}
          onPress={button.onPress}
          // ExtraStyle={button.ExtraStyle}
          key={index}
          index={index + 1}
          disabled={button.disabled}
        />
      ))}
    </View>
  );
}

const mainButtonStyles = StyleSheet.create({
  button: {
    zIndex: 5,
    height: plusButtonSize,
    width: plusButtonSize,
    borderRadius: 100,
    backgroundColor: "#2a2a2a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor:'#bebebe',
    borderWidth:0.3,

  },
});

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: 0,
    height: 30,
    bottom: 20,
    zIndex: 1,
    // backgroundColor:'red'
  },
  // wrapper: {
  //   position: "relative",
  //   transform: [{ translateX: width * 0.5 - 20 }],
  // },
  shadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -0.5, height: 3.5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  // animatedContainer: {
  //   backgroundColor: '#00000000',
  //   height: plusButtonSize-5,
  //   width: animatedContainerWidth,
  //   left: width * 0.5 - animatedContainerWidth / 2,
  //   position: "absolute",
  //   display: "flex",
  //   flexDirection: "row",
  //   alignItems: "center",
  //   zIndex: -4,
  //   borderRadius: 15,
  //   borderWidth:0.3,
  //   borderColor:'#bebebe'

  // },
});
