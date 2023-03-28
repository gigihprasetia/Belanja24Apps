import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  adjust,
  blueB2C,
  HeightScreen,
  logoB2CLink,
  WidthScreen,
} from '../Assets/utils';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchBarTop = props => {
  const {navigation} = props;
  const [input, setInput] = useState('');
  return (
    <View
      style={{
        width: '100%',
        height: HeightScreen * 0.07,
        backgroundColor: blueB2C,
        display: 'flex',
        flexDirection: 'row',
      }}>
      <View
        style={{
          flex: 1,
          height: HeightScreen * 0.07,
          justifyContent: 'center',
        }}>
        <Image
          source={{uri: logoB2CLink}}
          style={{
            width: '100%',
            height: HeightScreen * 0.03,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View
        style={{
          width: WidthScreen * 0.8,
          height: HeightScreen * 0.07,
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderRadius: 10,
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TextInput
            style={{
              backgroundColor: 'white',
              color: 'black',
              fontSize: adjust(10),
              flex: 1,
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
            }}
            onChangeText={e => setInput(e)}
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Pencarian', {
                searchQuery: input,
              })
            }
            style={{
              paddingHorizontal: adjust(12),
              justifyContent: 'center',
              borderLeftWidth: 1,
              backgroundColor: 'white',
              borderLeftColor: 'gray',
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
            }}>
            <Icon name="shopping-bag" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default React.memo(SearchBarTop);
