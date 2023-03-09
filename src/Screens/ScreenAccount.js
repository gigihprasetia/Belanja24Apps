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
import {useSelector} from 'react-redux';
import {SvgUri} from 'react-native-svg';
import {Formik} from 'formik';
import {updateProfileSchema} from '../Assets/ValidationSchema';
import {UpdateProfile} from '../Assets/API/postAPI';
import {useEffect} from 'react';
import {getProfile} from '../Assets/API/getAPI';

const ScreenAccount = props => {
  const [screenView, setScreenView] = useState('login');
  const isToken = useSelector(state => state.Authentication.isLogin.token);
  const [isUpdate, setIsUpdate] = useState(false);
  const {navigation} = props;
  const [dataUser, setDataUser] = useState({
    ava: '',
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    getProfile(isToken, profile => {
      setDataUser({
        ava: profile.ava,
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
      });
    });
  }, [isUpdate]);
  // console.log(dataUser);

  return isToken != '' ? (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: adjust(10),
      }}>
      <Text
        style={{
          fontSize: adjust(13),
          fontWeight: 'bold',
          color: blueB2C,
        }}>
        Pengaturan Profile
      </Text>
      <View
        style={{
          width: '100%',
          height: '10%',
          marginTop: adjust(10),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SvgUri width={'100%'} height={'100%'} uri={dataUser.ava} />
      </View>

      <View style={{marginTop: adjust(5)}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: adjust(10),
              fontWeight: 'bold',
              color: GrayMedium,
            }}>
            Name
          </Text>
        </View>
        <TextInput
          value={dataUser.name}
          onChangeText={e => {
            setDataUser({
              ...dataUser,
              name: e,
            });
          }}
          style={{
            borderWidth: 1,
            borderRadius: adjust(5),
            borderColor: GrayMedium,
            height: 40,
            color: 'black',
            paddingHorizontal: adjust(10),
          }}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: adjust(10),
          }}>
          <Text
            style={{
              fontSize: adjust(10),
              fontWeight: 'bold',
              color: GrayMedium,
            }}>
            Email
          </Text>
        </View>
        <TextInput
          editable={false}
          value={dataUser.email}
          style={{
            borderWidth: 1,
            borderRadius: adjust(5),
            borderColor: GrayMedium,
            height: 40,
            color: 'black',
            paddingHorizontal: adjust(10),
          }}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: adjust(10),
          }}>
          <Text
            style={{
              fontSize: adjust(10),
              fontWeight: 'bold',
              color: GrayMedium,
            }}>
            Mobile Phone
          </Text>
        </View>
        <TextInput
          keyboardType={'phone-pad'}
          onChangeText={e => {
            setDataUser({
              ...dataUser,
              phone: e,
            });
          }}
          value={dataUser.phone}
          style={{
            borderWidth: 1,
            borderRadius: adjust(5),
            borderColor: GrayMedium,
            height: 40,
            color: 'black',
            paddingHorizontal: adjust(10),
          }}
        />
        {dataUser.name === '' || dataUser.phone === '' ? (
          <TouchableOpacity
            style={{
              paddingVertical: adjust(10),
              backgroundColor: GrayMedium,
              marginTop: adjust(15),
              borderRadius: adjust(5),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: adjust(12),
                fontWeight: 'bold',
                color: 'white',
              }}>
              Perbarui Profile
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              UpdateProfile(
                isToken,
                {
                  ava: dataUser.ava,
                  email: dataUser.email,
                  name: dataUser.name,
                  phone: dataUser.phone,
                },
                response => {
                  setIsUpdate(!isUpdate);
                  alert('update succes');
                },
              )
            }
            style={{
              paddingVertical: adjust(10),
              backgroundColor: blueB2C,
              marginTop: adjust(15),
              borderRadius: adjust(5),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: adjust(12),
                fontWeight: 'bold',
                color: 'white',
              }}>
              Perbarui Profile
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  ) : (
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
          paddingHorizontal: adjust(15),
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
          <LoginForm
            navigation={navigation}
            gotoRegister={() => setScreenView('register')}
          />
        )}
        {screenView === 'register' && (
          <RegisterForm
            navigation={navigation}
            gotoLogin={() => setScreenView('login')}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ScreenAccount;
