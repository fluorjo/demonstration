import { StyleSheet, View } from "react-native";
export default function CandlePage() {
  return (
    <View>
      <View style={styles.gBody}></View>
      <View>
        <View>
          <View></View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  gBody: {
    left: "50%",
    top: "50%",
    position: "relative",
    width: 100,
    height: 300,
    backgroundColor: "red",
  },
});
