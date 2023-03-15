import {View, Text, SafeAreaView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getPaymentChain} from '../Assets/API/postAPI';
import {getFromRedux} from '../Assets/API/GetRedux';
import LoadingPage from '../Component/LoadingPage';
import {adjust, blueB2C, Gray, GrayMedium, WidthScreen} from '../Assets/utils';
import RenderHtml from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';

const ScreenPayment = ({navigation, route}) => {
  //   console.log(props);
  const chain_id = route.params.data;
  const token = getFromRedux('token');

  const [dataPayment, setDataPayment] = useState({
    status: false,
    data: [],
  });
  const {width} = useWindowDimensions();

  const [source, setSource] = useState({
    html: `<p>hahah</p>`,
  });

  useEffect(() => {
    getPaymentChain(token, {chain_id}, res => {
      //   console.log(res.data.data.how_to_pay);
      setSource({
        html: res.data.data.how_to_pay,
      });
      setDataPayment({
        status: true,
        data: res.data.data,
      });
    });
  }, []);

  console.log(dataPayment);
  return dataPayment.status ? (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: adjust(10),
      }}>
      <Text style={{color: blueB2C, fontSize: adjust(12), fontWeight: 'bold'}}>
        Screen Pembayaran
      </Text>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: adjust(10),
        }}>
        <Image
          source={{uri: dataPayment.data.payment_method_ava}}
          style={{
            width: WidthScreen * 0.4,
            height: WidthScreen * 0.4,
            resizeMode: 'contain',
          }}
        />
        <Text
          style={{color: GrayMedium, fontSize: adjust(10), fontWeight: 'bold'}}>
          {dataPayment.data.title}
        </Text>
        <Text
          style={{
            color: blueB2C,
            fontSize: adjust(12),
            fontWeight: 'bold',
            marginTop: adjust(5),
          }}>
          {dataPayment.data.account_number}
        </Text>
      </View>
      <Text
        style={{
          color: GrayMedium,
          fontSize: adjust(10),
          fontWeight: 'bold',
          marginTop: adjust(5),
        }}>
        Bayar Sebelum
        {dataPayment.data.expired_date}
      </Text>
      <RenderHtml contentWidth={width} source={source} />
    </SafeAreaView>
  ) : (
    <LoadingPage />
  );
};

export default ScreenPayment;
