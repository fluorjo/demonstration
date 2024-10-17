import * as StoreReview from "expo-store-review";
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

//npx expo run:android 해서 안드로이드 폴더 만들어놔야 함.
//https://surprisecomputer.tistory.com/125
//https://www.youtube.com/watch?v=LE4Mgkrf7Sk&t=3s
export default  function ETCPage() {

  // const itunesItemId = 982107779;

  // Linking.openURL(`https://apps.apple.com/app/apple-store/id${itunesItemId}?action=write-review`);
  // Linking.openURL(
  //   `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${itunesItemId}?action=write-review`
  // );
  const IOS_APP_ID = "";
  const ANDROID_APP_ID = "";
  const APP_STORE_LINK = `itms-apps://apps.apple.com/app/id${IOS_APP_ID}?action=write-review`;
  // const APP_STORE_LINK = `itms-apps://apps.apple.com/app/id${IOS_APP_ID}?mt=8`;
  const PLAY_STORE_LINK = `market://details?id=${ANDROID_APP_ID}`;
  const STORE_LINK = Platform.select({
    ios: APP_STORE_LINK,
    android: PLAY_STORE_LINK,
  });

  const requestReview = () => {
    StoreReview.requestReview();
  };

  const openReviewInStore = () => {
    if (STORE_LINK) {
      Linking.openURL(STORE_LINK);
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={requestReview}>
        <Text>앱스토어 링크</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
