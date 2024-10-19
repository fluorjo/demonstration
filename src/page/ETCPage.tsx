import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppStoreReivew from "./AppStoreReview";

export default function ETCPage() {
  return (
    <View>
      <TouchableOpacity onPress={AppStoreReivew}>
        <Text>앱스토어 링크</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
