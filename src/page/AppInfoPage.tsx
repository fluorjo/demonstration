import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
const screenWidth = Math.round(Dimensions.get("window").width);
const Images = [
  {
    num: 1,
    imageSource: require("/Users/fluor/Documents/c/demo-expo/assets/appManual/map.png"),
  },
  {
    num: 2,
    imageSource: require("/Users/fluor/Documents/c/demo-expo/assets/appManual/map2.png"),
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
//750 * 1110
const AppInfoPage = () => {
  // const width = Dimensions.get("window").width;
  // const height = Dimensions.get("window").height;
  const [index, setIndex] = useState(0);
  const carouselWidth = 375;
  const carouselHeight = 555;
  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={carouselWidth}
        height={carouselHeight}
        autoPlay={false}
        data={Images}
        scrollAnimationDuration={500}
        // onSnapToItem={(index) => console.log("current index:", index)}
        onProgressChange={(progress) => {
          const progressToIndex = Math.round(-progress / carouselWidth);
          setIndex(progressToIndex);
          console.log(progressToIndex);
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
              // position:'absolute',
              // top:-55,
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
    // backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  carousel: {
    // backgroundColor: "#572e2e",
    // width: 340,
    // height: 500,
    borderRadius: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  highlight: {
    position: "absolute",
    backgroundColor: "transparent",
    borderWidth: 20,
    borderColor: "#fff",
    borderRadius: 10,
  },
  text: {
    color: "white",
    marginTop: 20,
    position: "absolute",
    top: 300,
  },
  AppGuideImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    margin: 0,
    opacity: 0.4,
  },
  IndicatorWrapper: {
    flexDirection: "row",
    display:'flex',
    alignItems: "center",
    alignContent:'center',
    marginTop: 16,
    marginBottom: 16,
    borderRadius:10,
    backgroundColor: "#00000061",
  },
  Indicator: {
    // marginTop: 0,
    // marginBottom: 4,
    marginVertical:4,
    marginHorizontal:5,
    backgroundColor: "#000000b0",
    width: 12,
    height: 12,
    borderRadius: 15,
  },
  focused: {
    backgroundColor: "#000000",
  },
  unfocused: {
    // backgroundColor: "#000000b0",
    backgroundColor: "#ffffff",
  },
});

export default AppInfoPage;
