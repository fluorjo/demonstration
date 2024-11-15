import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function LoadingComponent() {
  return (
    <>
      <ActivityIndicator size='large' />
      <Text style={styles.loadingText}>집회 정보를 불러오고 있습니다...</Text>
    </>
  );
}

const styles = StyleSheet.create({
  loadingText: {
    fontSize: 24,
    marginTop: 15,
  },
});
