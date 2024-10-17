import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Svg, { Path } from "react-native-svg"

export default function CandleIcon() {
    return (
        <View style={styles.container}>
          <Svg
            width={35}
            height={35}
            viewBox="0 0 43.53 122.88"
          >
            <Path d="M16.68,0c16.94,14.54,26.8,34.81,14.4,51.6c3.52,0.61,6.5,1.56,8.64,2.74c2.4,1.32,3.8,2.98,3.8,4.86l0,0.08 c0-0.03,0.01-0.05,0.02-0.08v49.99C43.53,127.65,0,127.2,0,109.31V59.19c0,0.03,0.01,0.05,0.02,0.08l0-0.08 c0-1.83,1.33-3.45,3.62-4.76c2-1.14,4.79-2.07,8.09-2.7C-3.86,31.7,21.34,9.83,16.68,0L16.68,0z M29.97,53.01 c-1.7,2.06-3.75,4.07-6.18,6v1.76c0,0.94-0.81,1.7-1.8,1.7c-1,0-1.8-0.76-1.8-1.7V43.34c0-0.94,0.81-1.7,1.8-1.7 c1,0,1.8,0.76,1.8,1.7v15.58C35.76,48.46,30.84,32.79,20.92,23c2.99,6.31-18.76,23.02-1.26,36.16c-2.74-1.97-4.96-3.98-6.75-6.01 c-0.04,0.02-0.08,0.03-0.13,0.04c-3.54,0.61-6.51,1.56-8.57,2.73c-1.81,1.03-2.85,2.16-2.85,3.28c0,1.68,2.18,3.3,5.7,4.56 c3.75,1.34,8.96,2.18,14.72,2.18c5.76,0,10.97-0.83,14.72-2.18c3.52-1.26,5.7-2.88,5.7-4.56c0-1.16-1.11-2.33-3.01-3.38 c-2.17-1.19-5.29-2.15-8.98-2.73C30.11,53.07,30.04,53.05,29.97,53.01L29.97,53.01z"/>
          </Svg>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

    