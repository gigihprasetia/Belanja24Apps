import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import Slick from 'react-native-slick';
import {HeightScreen} from '../Assets/utils';
import {getBannerHero} from '../Assets/API/getAPI';
import {useSelector} from 'react-redux';

const Slider = () => {
  const [bannerHero, setBannerHero] = useState([]);
  const token = useSelector(state => state.Authentication.isLogin.token);

  useEffect(() => {
    getBannerHero(token, res => setBannerHero(res.data.data));
  }, []);

  console.log(bannerHero);
  return (
    <View style={{width: '100%', height: HeightScreen * 0.2, marginBottom: 10}}>
      <Slick showsButtons={true}>
        {bannerHero.length > 0 &&
          bannerHero.map((val, index) => (
            <Image
              key={index}
              style={{
                width: '100%',
                height: HeightScreen * 0.2,
                resizeMode: 'cover',
              }}
              source={{uri: val.cover}}
            />
          ))}
        {/* <Image
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
        /> */}
      </Slick>
    </View>
  );
};

export default React.memo(Slider);
