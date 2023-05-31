import {View, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  adjust,
  blueB2C,
  HeightScreen,
  logoB2CLink,
  WidthScreen,
} from '../Assets/utils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ChatIcon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

const SearchBarTop = props => {
  const {navigation} = props;
  const tokenUser = useSelector(state => state.Authentication.isLogin.token);
  const [input, setInput] = useState('');

  return (
    <View
      style={{
        width: '100%',
        height: HeightScreen * 0.07,
        backgroundColor: blueB2C,
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: adjust(2),
      }}>
      <View
        style={{
          width: '20%',
          height: HeightScreen * 0.07,
          justifyContent: 'center',
        }}>
        <Image
          source={{uri: logoB2CLink}}
          style={{
            width: '100%',
            height: HeightScreen * 0.04,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View
        style={{
          width: '80%',
          display: 'flex',
          flexDirection: 'row',
          height: HeightScreen * 0.07,
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderRadius: 10,
          // backgroundColor: 'red',
        }}>
        <View
          style={{
            width: '85%',
            display: 'flex',
            flexDirection: 'row',
            // justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TextInput
            style={{
              width: '85%',
              backgroundColor: 'white',
              color: 'black',
              fontSize: adjust(10),
              // flex: 1,
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
              width: '15%',
              height: '100%',
              paddingHorizontal: adjust(12),
              justifyContent: 'center',
              borderLeftWidth: 1,
              backgroundColor: 'white',
              borderLeftColor: 'gray',
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
            }}>
            <Icon name="shopping-bag" color={blueB2C} size={16} />
          </TouchableOpacity>
        </View>
        {tokenUser != '' && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Chat')}
            style={{
              width: '15%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <ChatIcon
              name="ios-chatbubble-ellipses-outline"
              color={'white'}
              size={28}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default React.memo(SearchBarTop);
