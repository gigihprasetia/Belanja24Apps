import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {adjust, formatter, Gray} from '../Assets/utils';

const CardProduct = props => {
  // console.log(props, 'props');
  const {actions} = props;
  // console.log(props);

  return (
    <TouchableOpacity
      onPress={actions}
      style={{
        flex: 1,
        borderWidth: 0.5,
        borderColor: Gray,
        borderRadius: adjust(5),
        padding: adjust(5),
        justifyContent: 'space-between',
      }}>
      <Image
        source={{uri: props.img}}
        alt={'images'}
        style={{width: '100%', height: 90, resizeMode: 'contain'}}
      />
      <View
        style={{
          padding: adjust(5),
          display: 'flex',
          justifyContent: 'space-around',
        }}>
        <View>
          <Text
            style={{fontSize: adjust(8), color: 'black', fontWeight: 'bold'}}>
            {props.title}
          </Text>
          <Text style={{fontSize: adjust(7), color: 'black'}}>
            {props.provider}
          </Text>
        </View>
        <View
          style={{
            marginTop: adjust(5),
            borderTopWidth: 1,
            paddingTop: adjust(5),
            // backgroundColor: 'blue',
          }}>
          <Text style={{fontSize: adjust(8), color: 'black'}}>
            {props.price_f}
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Text style={{fontSize: adjust(8), color: 'black'}}>
              stock {props.stock}
            </Text>
            <Text style={{fontSize: adjust(8), color: 'black'}}>
              terjual {props.sell}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardProduct;
