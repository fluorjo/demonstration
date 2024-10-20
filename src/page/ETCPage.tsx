import Entypo from "@expo/vector-icons/Entypo";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppStoreReivew from "./AppStoreReview";
import { sendEmail } from "./Email";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


export default function ETCPage() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.feedbackButton} onPress={AppStoreReivew}>
        {Platform.OS === "android" ? (
          <Entypo name="google-play" size={24} color="black" />
        ) : (
          <FontAwesome6 name="app-store-ios" size={24} color="black" />
        )}

        <Text style={styles.feedbackText}>앱스토어 평가</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.feedbackButton} onPress={sendEmail}>
        <Entypo name="mail" size={24} color="black" />
        <Text style={styles.feedbackText}>개발자에게 메일 전송</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  feedbackButton: {
    backgroundColor: "#ffffff",
    width: 240,
    height: 40,
    margin: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#13131375",
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
  },
  feedbackText: {
    fontSize: 20,
    marginLeft: 10,
  },
});
