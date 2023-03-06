import {
  View,
  Text,
  Pressable,
  TextInput,
  TextInputBase,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useState} from 'react';
import {
  adjust,
  blueB2C,
  Gray,
  GrayMedium,
  HeightScreen,
  logoB2CLink,
  WidthScreen,
} from '../Assets/utils';
import LoginForm from '../Component/LoginForm';
import RegisterForm from '../Component/RegisterForm';

const ScreenAccount = () => {
  const [screenView, setScreenView] = useState('login');

  return (
    <SafeAreaView
      style={{
        flex: 1,
        height: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: blueB2C,
      }}>
      <Image
        source={{uri: logoB2CLink}}
        style={{
          width: WidthScreen * 0.4,
          height: 50,
          resizeMode: 'contain',
          marginVertical: adjust(10),
        }}
      />
      {/* SCREENVIEW */}
      <View
        style={{
          width: WidthScreen * 0.9,
          borderRadius: adjust(10),
          // height: HeightScreen * 0.6,
          backgroundColor: 'white',
          paddingHorizontal: adjust(5),
          paddingVertical: adjust(15),
        }}>
        {/* <View
          style={{
            paddingVertical: adjust(5),
            display: 'flex',
            flexDirection: 'row',
          }}>
          <Pressable
            onPress={() => setScreenView('login')}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: screenView === 'login' ? blueB2C : GrayMedium,
              // width: '50%',
              flex: 1,
              paddingVertical: adjust(5),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: adjust(10),
                fontWeight: 'bold',
                color: screenView === 'login' ? blueB2C : GrayMedium,
              }}>
              Login
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setScreenView('register')}
            style={{
              borderBottomWidth: 1,
              borderBottomColor:
                screenView === 'register' ? blueB2C : GrayMedium,
              flex: 1,
              paddingVertical: adjust(5),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: adjust(10),
                fontWeight: 'bold',
                color: screenView === 'register' ? blueB2C : GrayMedium,
              }}>
              Register
            </Text>
          </Pressable>
        </View> */}

        <Text
          style={{
            fontSize: adjust(12),
            fontWeight: 'bold',
            color: blueB2C,
          }}>
          Masuk Ke Akun Anda
        </Text>
        <Text
          style={{
            fontSize: adjust(12),
            fontWeight: 'bold',
            color: blueB2C,
          }}>
          Selamat datang di belanja 24
        </Text>
        {/* FORM VIEW */}

        {screenView === 'login' && (
          <LoginForm gotoRegister={() => setScreenView('register')} />
        )}
        {screenView === 'register' && (
          <RegisterForm gotoLogin={() => setScreenView('login')} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ScreenAccount;
