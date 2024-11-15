import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Animated, { useSharedValue, useAnimatedReaction, runOnJS } from "react-native-reanimated";

const screenWidth = Math.round(Dimensions.get("window").width);
const Images = [
  {
    num: 1,
    imageSource: require("/Users/fluor/Documents/c/demo-expo/assets/appManual/map.png"),
  },
  {
    num: 2,
    imageSource: require("/Users/fluor/Documents/c/demo-expo/assets/appManual/info.png"),
  },
  {
    num: 3,
    imageSource: require("/Users/fluor/Documents/c/demo-expo/assets/appManual/candle.png"),
  },
];

interface IndicatorProps {
  focused: boolean;
}

const Indicator: React.FC<IndicatorProps> = ({ focused }) => {
  return (
    <View
      style={[styles.Indicator, focused ? styles.focused : styles.unfocused]}
    />
  );
};

const AppInfoPage = () => {
  const [index, setIndex] = useState(0);
  const carouselWidth = 350;
  const carouselHeight = 518;
  const progress = useSharedValue(0);

  useAnimatedReaction(
    () => Math.round(-progress.value / carouselWidth), 
    (calculatedIndex) => {
      if (calculatedIndex !== index) {
        runOnJS(setIndex)(calculatedIndex);
      }
    }
  );

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={carouselWidth}
        height={carouselHeight}
        autoPlay={false}
        data={Images}
        scrollAnimationDuration={500}
        onProgressChange={(progressValue) => {
          progress.value = progressValue; 
        }}
        style={styles.carousel}
        renderItem={({ item: { imageSource } }) => (
          <Image
            style={{
              flex: 1,
              borderWidth: 0,
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
            source={imageSource}
            resizeMode="contain"
          />
        )}
      />
      <View style={[styles.IndicatorWrapper]}>
        {Array.from({ length: Images.length }, (_, i) => i).map((i) => (
          <Indicator key={`indicator_${i}`} focused={i === index} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  carousel: {
    borderRadius: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  IndicatorWrapper: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: "#00000061",
    bottom: -12,
  },
  Indicator: {
    marginVertical: 4,
    marginHorizontal: 5,
    backgroundColor: "#000000b0",
    width: 12,
    height: 12,
    borderRadius: 15,
  },
  focused: {
    backgroundColor: "#000000",
  },
  unfocused: {
    backgroundColor: "#ffffff",
  },
});

export default AppInfoPage;