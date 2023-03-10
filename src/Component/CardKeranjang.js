import {View, Text, Image, Button, TouchableOpacity} from 'react-native';
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {adjust, blueB2C, Gray} from '../Assets/utils';

const CardKeranjang = ({item}) => {
  return (
    <View style={{backgroundColor: Gray, marginVertical: adjust(5)}}>
      <View
        style={{
          padding: adjust(5),
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Image
            source={{uri: item.images[0]}}
            style={{width: adjust(55), height: adjust(55)}}
          />
          <Text style={{fontSize: adjust(10), fontWeight: 'bold'}}>
            {item.title}
          </Text>
        </View>
        <BouncyCheckbox
          size={adjust(15)}
          fillColor={blueB2C}
          unfillColor="#FFFFFF"
          iconStyle={{borderColor: 'red'}}
          innerIconStyle={{borderWidth: 1, borderRadius: adjust(5)}}
          textStyle={{fontFamily: 'JosefinSans-Regular'}}
        />
      </View>
      <View
        style={{
          padding: adjust(5),
          borderTopWidth: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text style={{fontSize: adjust(10), fontWeight: 'bold'}}>
            Stock: {item.stock}
          </Text>
        </View>
        <View
          style={{
            width: '50%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              borderColor: 'red',
              borderWidth: 1,
              width: adjust(20),
              height: adjust(20),
              borderRadius: adjust(5),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{color: 'red', fontWeight: 'bold', fontSize: adjust(10)}}>
              -
            </Text>
          </TouchableOpacity>
          <Text
            style={{color: 'black', fontWeight: 'bold', fontSize: adjust(10)}}>
            1
          </Text>
          <TouchableOpacity
            style={{
              borderColor: blueB2C,
              borderWidth: 1,
              width: adjust(20),
              height: adjust(20),
              borderRadius: adjust(5),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: blueB2C,
                fontWeight: 'bold',
                fontSize: adjust(10),
              }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CardKeranjang;
