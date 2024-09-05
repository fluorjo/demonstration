import { StyleSheet, TouchableOpacity } from "react-native";
// import MapView from "react-native-map-clustering";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";

const FloatingButton = ({ onPress }) => (
  <TouchableOpacity style={styles.floatingbtn} onPress={onPress}>
    <MaterialIcons
      name="my-location"
      color="black"
      style={styles.floatingbtnIcon}
    />
  </TouchableOpacity>
);

export default FloatingButton;
const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  floatingbtn: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 100,
    zIndex: 1,
  },
  floatingbtnIcon: {
    fontSize: 30,
  },
});
