import {View, Text} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import {getFromRedux} from '../Assets/API/GetRedux';
import {getCheckout} from '../Assets/API/postAPI';
import {useState} from 'react';
import LoadingPage from '../Component/LoadingPage';

const ScreenCheckout = () => {
  const [dataCheckout, setDataCheckout] = useState({
    status: false,
    data: [],
  });

  const token = getFromRedux('token');
  useEffect(() => {
    getCheckout(token, res => {
      setDataCheckout({
        status: true,
        data: res.data.data,
      });
    });
  }, []);

  return !dataCheckout.status ? (
    <LoadingPage />
  ) : (
    <View>
      <Text>jajaja</Text>
    </View>
  );
};

export default ScreenCheckout;
