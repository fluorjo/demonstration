import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default function Map() {
  return (
    <SafeAreaView style={styles.container}>
      <MapView style={{flex: 1}} provider={PROVIDER_GOOGLE} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
