import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function LoadingComponent() {
  return (
    <View style={styles.loadingContainer}>
      {/* 뭔가 움직이는 로딩 아이콘 같은 걸 넣어야 할듯. */}
      <Text>집회 정보를 불러오고 있습니다...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
