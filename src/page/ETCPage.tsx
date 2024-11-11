import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppStoreReivew from "./AppStoreReview";
import { sendEmail } from "./Email";
import { RootStackParamList } from "./ETCStackNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "ETCPage">;

export default function ETCPage() {
  const navigation = useNavigation<NavigationProp>();
  const kakaoPayAddress = process.env.kakaoPayAddress;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.feedbackButton}
        onPress={() => navigation.navigate("AppInfoPage")}
      >
        <View style={styles.IconContainer}>
          <MaterialCommunityIcons
            name="information-variant"
            size={24}
            color="white"
            style={extra_styles.infoIcon}
          />
        </View>
        <Text style={styles.feedbackText}>앱 안내</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.feedbackButton} onPress={AppStoreReivew}>
        <View style={styles.IconContainer}>
          {Platform.OS === "android" ? (
            <FontAwesome6
              name="google"
              size={24}
              color="white"
              style={styles.icon}
            />
          ) : (
            <FontAwesome6
              name="apple"
              size={24}
              color="white"
              style={styles.icon}
            />
          )}
        </View>
        <Text style={styles.feedbackText}>앱스토어 평가</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.feedbackButton} onPress={AppStoreReivew}>
        <View style={styles.IconContainer}>
          <FontAwesome6
            name="google"
            size={24}
            color="white"
            style={styles.icon}
          />
        </View>
        <Text style={styles.feedbackText}>앱스토어 평가</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.feedbackButton} onPress={sendEmail}>
        <View style={styles.IconContainer}>
          <MaterialCommunityIcons
            name="email-send"
            size={24}
            color="white"
            style={styles.icon}
          />
        </View>
        <Text style={styles.feedbackText}>개발자에게 메일 전송</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.feedbackButton}
        onPress={() =>
          Linking.openURL(`https://qr.kakaopay.com/${kakaoPayAddress}`)
        }
      >
        <View style={styles.IconContainer}>
          <FontAwesome
            name="won"
            size={12}
            color="white"
            style={extra_styles.wonIcon}
          />
        </View>
        <Text style={styles.feedbackText}>개발자 후원</Text>
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
    width: 300,
    height: 60,
    margin: 15,
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
  icon: {
    position: "absolute",
    // backgroundColor: "blue",
    fontSize: 32,
    // transform: [{ translateX:5 },{translateY:5}],
  },

  IconContainer: {
    backgroundColor: "black",
    position: "absolute",
    left: 7,
    borderRadius: 20,
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
});
const extra_styles = StyleSheet.create({
  wonIcon: {
    ...styles.icon,
    transform: [{ translateX: 1 }, { translateY: 2 }],
  },
  infoIcon: {
    ...styles.icon,
    fontSize: 42,
  },
});
