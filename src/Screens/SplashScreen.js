import {View, Text, SafeAreaView, Image} from 'react-native';
import React, {useEffect} from 'react';
import {StackActions} from '@react-navigation/native';
import {logoB2CLink} from '../Assets/utils';
const SplashScreen = props => {
  const {navigation} = props;

  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace('stack'));
    }, 2000);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Image
        alt="belanja24"
        source={{
          uri: logoB2CLink,
        }}
        style={{width: 150, height: 150, resizeMode: 'contain'}}
      />
    </SafeAreaView>
  );
};

export default SplashScreen;
