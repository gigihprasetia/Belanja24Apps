import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getHistoryTransaction, getWaitingPayment} from '../Assets/API/getAPI';
import {adjust, blueB2C, HeightScreen, WidthScreen} from '../Assets/utils';

const ScreenTransaction = () => {
  const isToken = useSelector(state => state.Authentication.isLogin.token);
  const [page, setPage] = useState('waitingPayment');
  const [dataPayment, setdataPayment] = useState({status: true, data: []});
  const [dataHistory, setDataHistory] = useState({status: true, data: []});

  useEffect(() => {
    getWaitingPayment(isToken, setdataPayment);

    getHistoryTransaction(isToken, setDataHistory);
  }, []);

  console.log(dataHistory.data, 'data payment');

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontSize: adjust(16),
          fontWeight: 'bold',
          color: blueB2C,
          marginTop: adjust(8),
        }}>
        Detail Pesanan
      </Text>
      <View style={styles.content}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: adjust(8),
            marginVertical: adjust(12),
          }}>
          <Text
            onPress={() => setPage('waitingPayment')}
            style={
              page === 'waitingPayment'
                ? [
                    styles.page,
                    {borderBottomColor: blueB2C, borderBottomWidth: 1},
                  ]
                : styles.page
            }>
            Menunggu Pembayaran
          </Text>
          <Text
            onPress={() => setPage('transactionHistory')}
            style={
              page === 'transactionHistory'
                ? [
                    styles.page,
                    {borderBottomColor: blueB2C, borderBottomWidth: 1},
                  ]
                : styles.page
            }>
            Histori Transaksi
          </Text>
        </View>
        {page === 'waitingPayment' ? (
          <View style={{height: HeightScreen * 0.8}}>
            <Text
              style={{fontSize: adjust(16), fontWeight: '400', color: 'black'}}>
              Menunggu Pembayaran
            </Text>
            {/* card items */}
            <FlatList
              data={dataPayment.data}
              renderItem={({item}) => (
                <View style={styles.cardWaitingPayment}>
                  <View
                    style={{
                      flex: 2,
                      marginRight: 8,
                    }}>
                    <Text style={[styles.mediumText, {fontWeight: '600'}]}>
                      {item.invoice_number}
                    </Text>
                    <Text style={{color: 'black', fontSize: adjust(10)}}>
                      Tanggal Pemesanan {item.order_date_f}
                    </Text>
                    {/*  */}
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{flex: 2, marginRight: 2}}>
                        <Text style={styles.miniText}>Metode Pembayaran</Text>
                        <Text style={styles.miniText}>BNI Virtual Account</Text>
                        <Image
                          source={{uri: item.payment.payment_ava}}
                          style={{
                            width: adjust(40),
                            height: adjust(40),
                            resizeMode: 'contain',
                          }}
                        />
                      </View>
                      <View style={{flex: 2}}>
                        <Text style={[styles.miniText, {fontWeight: '700'}]}>
                          Transfer Bank
                        </Text>
                        <Text style={[styles.miniText, {fontWeight: '700'}]}>
                          {item.payment.account_number}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/*  */}
                  <View
                    style={{
                      flex: 2,
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: adjust(11),
                        marginVertical: 8,
                      }}>
                      Bayar sebelum {item.expired_date_f}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '700',
                        color: 'black',
                      }}>
                      Total Bayar
                    </Text>
                    <Text style={[styles.mediumText, {fontWeight: '600'}]}>
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      }).format(item.amount)}
                    </Text>
                    {/* button */}
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity
                      // onPress={() =>
                      //   setPrimaryAddress(isToken, item.id, setAddress)
                      // }
                      >
                        <Text
                          style={{
                            fontSize: adjust(10),
                            color: 'white',
                            padding: 4,
                            borderRadius: 2,
                            marginTop: 8,
                            borderWidth: 1,
                            color: blueB2C,
                            borderColor: blueB2C,
                          }}>
                          Cetak Invoice
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                      // onPress={() =>
                      //   setPrimaryAddress(isToken, item.id, setAddress)
                      // }
                      >
                        <Text
                          style={{
                            fontSize: adjust(10),
                            color: 'white',
                            padding: 4,
                            borderRadius: 2,
                            marginTop: 8,
                            backgroundColor: blueB2C,
                          }}>
                          Bayar Tagihan
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        ) : (
          <View style={{height: HeightScreen * 0.68}}>
            <Text
              style={{fontSize: adjust(14), fontWeight: '400', color: 'black'}}>
              Histori Transaksi
            </Text>
            <FlatList
              data={dataHistory.data}
              renderItem={({item}) => (
                <View style={styles.cardWaitingPayment}>
                  <View style={{flex: 3, marginRight: 2}}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        // justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                      }}>
                      <Text
                        style={[
                          styles.miniText,
                          {fontWeight: '500', marginRight: 2},
                        ]}>
                        {item.status === 'FINISH'
                          ? 'Selesai'
                          : 'Menunggu Konfirmasi'}
                      </Text>
                      <Text style={styles.miniText}>{item.created_at}</Text>
                      <Text style={styles.miniText}>{item.invoice_number}</Text>
                    </View>
                  </View>
                  {/*  */}
                  <View
                    style={{
                      flex: 2,
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '700',
                        color: 'black',
                      }}>
                      Harga Total
                    </Text>
                    <Text style={[styles.mediumText, {fontWeight: '600'}]}>
                      {/* {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(item.amount)} */}
                      33900.00
                    </Text>
                    {/* button */}
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity
                      // onPress={() =>
                      //   setPrimaryAddress(isToken, item.id, setAddress)
                      // }
                      >
                        <Text
                          style={{
                            fontSize: adjust(10),
                            color: 'white',
                            padding: 4,
                            borderRadius: 2,
                            marginTop: 8,
                            borderWidth: 1,
                            color: blueB2C,
                            borderColor: blueB2C,
                          }}>
                          Detail Transaksi
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                      // onPress={() =>
                      //   setPrimaryAddress(isToken, item.id, setAddress)
                      // }
                      >
                        <Text
                          style={{
                            fontSize: adjust(10),
                            color: 'white',
                            padding: 4,
                            borderRadius: 2,
                            marginTop: 8,
                            backgroundColor: blueB2C,
                          }}>
                          Beli Lagi
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: adjust(10),
  },
  content: {
    marginTop: 10,
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: '#fffafa',
    shadowRadius: 10,
    shadowColor: 'black',
  },
  page: {
    fontSize: adjust(14),
    fontWeight: '500',
    color: 'black',
  },
  cardWaitingPayment: {
    width: WidthScreen * 0.9,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 6,
    borderRadius: 4,
    marginVertical: adjust(8),
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  mediumText: {
    fontSize: adjust(13),
    color: 'black',
    marginVertical: 3,
  },
  miniText: {
    fontSize: adjust(7),
    fontWeight: '400',
    color: 'black',
    marginVertical: 2,
  },
});
export default ScreenTransaction;
