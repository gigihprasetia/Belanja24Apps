import {View, Text, Pressable, TouchableOpacity, TextInput} from 'react-native';
import React from 'react';
import {adjust, blueB2C, GrayMedium} from '../Assets/utils';
import {Formik} from 'formik';
import {useEffect} from 'react';
import {useState} from 'react';
import {inquiryBasic, loginBasic} from '../Assets/API/postAPI';
import DeviceInfo from 'react-native-device-info';
import {LoginSchema} from '../Assets/ValidationSchema';
import {useSelector, useDispatch} from 'react-redux';
import {validate} from '../Assets/API/getAPI';

const LoginForm = ({gotoRegister, navigation}) => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={LoginSchema}
      onSubmit={values => {
        DeviceInfo.getAndroidId().then(androidId => {
          inquiryBasic(response =>
            loginBasic(
              {
                device_id: androidId,
                email: values.email,
                inquiry_key: response.data.data,
                password: values.password,
                role: 'USER',
              },
              res => {
                if (res.status) {
                  dispatch({
                    type: 'setToken',
                    data: res.response,
                  });
                  validate(res.response, valid => {
                    dispatch({type: 'setUser', data: valid.data.data});
                    navigation.navigate('Beranda');
                  });
                } else {
                  setMessage(res.response);
                }
              },
            ),
          );
        });
      }}>
      {({handleChange, handleSubmit, values, errors}) => (
        <View style={{marginTop: adjust(10)}}>
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
                  color: blueB2C,
                }}>
                Email
              </Text>
              <Text style={{color: 'red', fontSize: adjust(10)}}>
                {errors.email}
              </Text>
            </View>
            <TextInput
              onChangeText={handleChange('email')}
              value={values.email}
              style={{
                borderWidth: 1,
                borderRadius: adjust(5),
                borderColor: blueB2C,
                height: 40,
                color: 'black',
                paddingHorizontal: adjust(10),
              }}
            />
          </View>
          <View style={{marginVertical: adjust(5)}}>
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
                  color: blueB2C,
                }}>
                Password
              </Text>
              <Text style={{color: 'red', fontSize: adjust(10)}}>
                {errors.password}
              </Text>
            </View>
            <TextInput
              onChangeText={handleChange('password')}
              value={values.password}
              secureTextEntry={true}
              style={{
                borderWidth: 1,
                borderRadius: adjust(5),
                borderColor: blueB2C,
                height: 40,
                color: 'black',
                paddingHorizontal: adjust(10),
              }}
            />
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'red', fontSize: adjust(10)}}>{message}</Text>
          </View>
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              width: '100%',
              backgroundColor: blueB2C,
              paddingVertical: adjust(10),
              display: 'flex',
              marginTop: adjust(10),
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: adjust(10),
                fontWeight: 'bold',
                color: 'white',
              }}>
              Sign In
            </Text>
          </TouchableOpacity>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: adjust(5),
              justifyContent: 'center',
            }}>
            <Text style={{color: GrayMedium, fontSize: adjust(10)}}>
              belum punya account?
            </Text>
            <Pressable onPress={gotoRegister}>
              <Text
                style={{
                  color: blueB2C,
                  fontSize: adjust(10),
                  marginLeft: adjust(3),
                }}>
                Register
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default React.memo(LoginForm);
