import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppStoreReivew from "./AppStoreReview";
import { sendEmail } from "./Email";

export default function ETCPage() {
  return (
    <View>
      <TouchableOpacity onPress={AppStoreReivew}>
        <Text>앱스토어 링크</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={sendEmail}>
        <Text>메일</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
