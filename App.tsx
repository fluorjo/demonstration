import React, {useEffect} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import axios from 'axios';

export default function App() {
  useEffect(() => {
    // Axios 요청
    axios
      .get(
        'http://openapi.seoul.go.kr:8088/724c4f6f79666c753931556966736e/xml/AccInfo/1/5/',
      )
      .then(response => {
        console.log('Axios response', response);
      })
      .catch(error => {
        console.error('Error fetching data with Axios: ', error);
      });

    // XMLHttpRequest 요청
    var xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      'http://openapi.seoul.go.kr:8088/724c4f6f79666c753931556966736e/xml/AccInfo/1/5/',
    );
    xhr.onreadystatechange = function () {
      if (this.readyState === xhr.DONE) {
        console.log('okokok');
        console.log(xhr.status);
        if (xhr.status === 200 || xhr.status === 201) {
          console.log(xhr.status);
          Alert.alert(
            'Status: ' +
              this.status +
              '\nHeaders: ' +
              JSON.stringify(this.getAllResponseHeaders()) +
              '\nBody: ' +
              this.responseText,
          );
        }
      }
    };
    xhr.send('');

    // Fetch API 요청
    fetch(
      'http://openapi.seoul.go.kr:8088/724c4f6f79666c753931556966736e/xml/AccInfo/1/5/',
    )
      .then(response => response.text())
      .then(data => {
        Alert.alert('Response from fetch: ', data);
      })
      .catch(error => {
        console.error('Error fetching data with fetch: ', error);
      });
  }, []); // 빈 배열([])은 이 효과가 컴포넌트가 처음 마운트될 때만 실행되도록 합니다.

  return (
    <View style={styles.container}>
      <Text>hello </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
