import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
  Image,
} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import {getDataCart} from '../Assets/API/getAPI';
import {getFromRedux} from '../Assets/API/GetRedux';
import {useState} from 'react';
import LoadingPage from '../Component/LoadingPage';
import {adjust, blueB2C, Gray} from '../Assets/utils';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import CardKeranjang from '../Component/CardKeranjang';
import {useIsFocused} from '@react-navigation/native';

const ScreenKeranjang = () => {
  const [dataCart, setDataCart] = useState({status: true, data: []});
  const token = getFromRedux('token');
  const isFocus = useIsFocused();

  useEffect(() => {
    getDataCart(token, value => {
      console.log(value);

      const data = value.map(val => {
        return {
          title: val.provider_name,
          logo: val.provider_ava,
          data: val.products,
        };
      });

      setDataCart({
        status: true,
        data,
      });
    });
  }, [isFocus]);

  return dataCart.status ? (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', padding: adjust(5)}}>
      <SectionList
        sections={dataCart.data}
        keyExtractor={item => {
          //   console.log(item, 'keyasxasxasxasx');
          return item.id;
        }}
        renderItem={props => {
          const {item} = props;
          console.log(props, 'render item');
          return <CardKeranjang item={item} />;
        }}
        renderSectionHeader={props => {
          const dataHeader = props.section;
          //   console.log(props, 'head');

          return (
            <View
              style={{
                backgroundColor: blueB2C,
                padding: adjust(5),
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={{uri: dataHeader.logo}}
                style={{
                  width: adjust(25),
                  height: adjust(25),
                  borderRadius: adjust(10),
                }}
              />
              <Text
                style={{
                  color: 'white',
                  fontSize: adjust(10),
                  fontWeight: 'bold',
                  marginLeft: adjust(10),
                }}>
                {dataHeader.title}
              </Text>
            </View>
          );
        }}
      />
      <View>
        <Text>Beli sekarang</Text>
      </View>
    </SafeAreaView>
  ) : (
    <LoadingPage />
  );
};

export default ScreenKeranjang;
