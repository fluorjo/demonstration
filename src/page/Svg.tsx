import React from 'react';
import Svg, {Path} from 'react-native-svg';


const SIZE = 300;

export default function SVG() {
    const flame_right = [
        'M 0.5 0',
        'C 0.5 0.0, 0.9 1, 0.5 1'
      ].join(" ");
    const flame_left = [
        'M 0.5 0',
        'C 0.5 0.0, 0.1 1, 0.5 1'
      ].join(" ");
      
      return (
        <Svg style={{width: SIZE, height: SIZE}} viewBox="0 0 1 1">
          <Path d={flame_right} fill="#ff0000a7" />
          <Path d={flame_left} fill="#ff0000a7" />
        </Svg>
      );
}