import React from 'react';
import {View, Image} from 'react-native';
import Slick from 'react-native-slick';
import {adjust, HeightScreen} from '../Assets/utils';

const Slider = () => {
  return (
    <View style={{width: '100%', height: HeightScreen * 0.2, marginBottom: 10}}>
      <Slick showsButtons={true}>
        <Image
          style={{
            width: '100%',
            height: HeightScreen * 0.2,
            resizeMode: 'cover',
          }}
          source={require(`../Assets/Images/banner1.png`)}
        />
        <Image
          style={{
            width: '100%',
            height: HeightScreen * 0.2,
            resizeMode: 'cover',
          }}
          source={require(`../Assets/Images/banner2.png`)}
        />
        <Image
          style={{
            width: '100%',
            height: HeightScreen * 0.2,
            resizeMode: 'cover',
          }}
          source={require(`../Assets/Images/banner3.png`)}
        />
      </Slick>
    </View>
  );
};

export default React.memo(Slider);
