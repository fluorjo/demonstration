import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
const screenWidth = Math.round(Dimensions.get("window").width);
const Images = [
  {
    num: 1,
    imageSource: require("/Users/fluor/Documents/c/demo-expo/assets/appManual/map1.png"),
  },
  {
    num: 2,
    imageSource: require("/Users/fluor/Documents/c/demo-expo/assets/appManual/candle.png"),
  },
  {
    num: 3,
    imageSource: require("/Users/fluor/Documents/c/demo-expo/assets/appManual/info.png"),
  },
];
const AppInfoPage = () => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop
        width={width}
        height={height}
        autoPlay={false}
        data={Images}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ item: { imageSource } }) => (
          <Image
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
            source={imageSource}
            resizeMode="cover"
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default AppInfoPage;
