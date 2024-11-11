import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Carousel from "../components/Carousel";
const screenWidth = Math.round(Dimensions.get("window").width);
const Images = [
  {
    num: 1,
    color: '#86E3CE',
  },
  {
    num: 2,
    color: '#D0E6A5',
  },
  {
    num: 3,
    color: '#FFDD94',
  },
  {
    num: 4,
    color: '#FA897B',
  },
  {
    num: 5,
    color: '#CCABD8',
  },
];
const AppInfoPage = () => {
  return (
    // <Modal visible={visible} transparent={true} animationType="fade">
    <Carousel
          gap={16}
          offset={36}
          pages={Images}
          pageWidth={screenWidth - (16 + 36) * 2}
        />
    // </Modal>
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
