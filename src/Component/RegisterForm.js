import {View, Text, Pressable, TouchableOpacity, TextInput} from 'react-native';
import React from 'react';
import {adjust, blueB2C, GrayMedium} from '../Assets/utils';

const RegisterForm = ({gotoLogin}) => {
  return (
    <View style={{marginTop: adjust(10)}}>
      <View style={{marginTop: adjust(5)}}>
        <Text
          style={{
            fontSize: adjust(10),
            fontWeight: 'bold',
            color: blueB2C,
          }}>
          Name
        </Text>
        <TextInput
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
      <View style={{marginTop: adjust(5)}}>
        <Text
          style={{
            fontSize: adjust(10),
            fontWeight: 'bold',
            color: blueB2C,
          }}>
          Email
        </Text>
        <TextInput
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
        <Text
          style={{
            fontSize: adjust(10),
            fontWeight: 'bold',
            color: blueB2C,
          }}>
          Password
        </Text>
        <TextInput
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
      <TouchableOpacity
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
          Buat Akun
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
  );
};

export default RegisterForm;
