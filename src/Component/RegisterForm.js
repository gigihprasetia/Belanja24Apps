import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {adjust, blueB2C, GrayMedium} from '../Assets/utils';
import {Formik} from 'formik';
import {useState} from 'react';
import {RegisterSchema} from '../Assets/ValidationSchema';
import {RegisterBasic} from '../Assets/API/postAPI';

const RegisterForm = ({gotoLogin}) => {
  const [registLoginLoading, setRegistLoginLoading] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  return (
    <Formik
      initialValues={{name: '', email: '', password: ''}}
      validationSchema={RegisterSchema}
      onSubmit={values => {
        setRegistLoginLoading(true);
        RegisterBasic(
          {
            name: values.name,
            email: values.email,
            password: values.password,
          },
          response => {
            setRegistLoginLoading(false);
            if (response.status) {
              // console.log(response.response);
              gotoLogin();
            } else if (!response.status && response.response.email[0]) {
              setErrMessage(response.response.email[0]);
              // console.log(response);
            } else {
              console.log(response);
            }
          },
        );
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
                Name
              </Text>
              <Text style={{color: 'red', fontSize: adjust(10)}}>
                {errors.name}
              </Text>
            </View>
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: adjust(5),
                borderColor: blueB2C,
                height: 40,
                color: 'black',
                paddingHorizontal: adjust(10),
              }}
              onChangeText={handleChange('name')}
              value={values.name}
            />
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
                  color: blueB2C,
                }}>
                Email
              </Text>
              <Text style={{color: 'red', fontSize: adjust(10)}}>
                {errors.email} {errMessage}
              </Text>
            </View>
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: adjust(5),
                borderColor: blueB2C,
                height: 40,
                color: 'black',
                paddingHorizontal: adjust(10),
              }}
              onChangeText={handleChange('email')}
              value={values.email}
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
              style={{
                borderWidth: 1,
                borderRadius: adjust(5),
                borderColor: blueB2C,
                height: 40,
                color: 'black',
                paddingHorizontal: adjust(10),
              }}
              onChangeText={handleChange('password')}
              value={values.password}
              secureTextEntry={true}
            />
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
            {registLoginLoading ? (
              <ActivityIndicator color={'white'} size={adjust(10)} />
            ) : (
              <Text
                style={{
                  fontSize: adjust(10),
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Buat Akun
              </Text>
            )}
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
              sudah punya account?
            </Text>
            <Pressable onPress={gotoLogin}>
              <Text
                style={{
                  color: blueB2C,
                  fontSize: adjust(10),
                  marginLeft: adjust(3),
                }}>
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default RegisterForm;
