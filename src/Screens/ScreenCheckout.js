import {
  View,
  Text,
  SectionList,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import React, {useEffect} from 'react';
import {getFromRedux} from '../Assets/API/GetRedux';
import {CheckShipping, getCheckout, gotoPayment} from '../Assets/API/postAPI';
import {useState} from 'react';
import LoadingPage from '../Component/LoadingPage';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonActions, useIsFocused} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';
import {
  adjust,
  blueB2C,
  formatter,
  Gray,
  GrayMedium,
  Green,
  WidthScreen,
} from '../Assets/utils';
import {getAddresShipping, getPaymentMethod} from '../Assets/API/getAPI';
import ModalComponent from '../Component/ModalComponent';
import CompoCheckOut from '../Component/CompoCheckOut';
import AddressForm from '../Component/AddressForm';

const ScreenCheckout = ({navigation}) => {
  const isFocus = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [dataCheckout, setDataCheckout] = useState({
    status: false,
    data: [],
  });
  const [dataAddress, setDataAddress] = useState({
    status: false,
    data: [],
  });
  const [address, setAddress] = useState({status: true, data: []});

  const [paymentMethod, setPaymentMethod] = useState([]);

  const [addressDefault, setAddresDefault] = useState({
    city: '-',
    district: '-',
    id: null,
    is_main: true,
    name: '-',
    phone: null,
    postal_code: '-',
    province: '-',
    recipient_name: '-',
    shipping_address: '-',
    shipping_lat: '-',
    shipping_long: '-',
  });

  const [dataShipping, setDataShipping] = useState({id: '', data: []});
  const [selectShipping, setSelectShipping] = useState([]);
  const [selectPayment, setSelectPayment] = useState(false);

  const token = getFromRedux('token');

  useEffect(() => {
    getPaymentMethod(token, res => {
      setPaymentMethod(res.data.data);
    });
    getAddresShipping(token, address => {
      if (address.length > 0) {
        const addressSelect = address.filter(add => add.is_main === true);
        setAddresDefault(addressSelect[0]);
        setDataAddress({
          status: true,
          data: address,
        });
      } else {
        setDataAddress({
          status: true,
          data: [],
        });
        setModalVisible(!modalVisible);
      }
      getCheckout(token, res => {
        // console.log(res, 'check');
        const data = res.data.data.map((val, index) => {
          return {
            indexSection: index,
            title: val.name,
            logo: val.ava,
            id: val.id,
            data: val.items,
          };
        });
        setDataCheckout({
          status: true,
          data,
        });
      });
    });
  }, [address.status, isFocus]);

  const viewShiping = section => {
    let adaShipping = false;
    let data = null;
    selectShipping.forEach(val => {
      if (val.id === section.data[0].provider_id) {
        adaShipping = true;
        data = val;
      } else {
        adaShipping = false;
        data = null;
      }
    });
    return {
      status: adaShipping,
      data: data,
    };
  };

  const calculateTotalProduct = data => {
    const total = data.map(value => value.data);
    const totalResult = total
      .flat()
      .map(val => parseFloat(val.price) * val.qty);
    const result = totalResult.reduce((acc, curr) => acc + curr, 0);

    return result;
  };
  const calculateOngkirProduct = data => {
    const mapOngkir = data.map(ong => parseInt(ong.cost));

    const result = mapOngkir.reduce((acc, curr) => acc + curr, 0);
    // console.log(result);
    return result;
  };

  return !dataCheckout.status || !dataAddress.status ? (
    <LoadingPage />
  ) : (
    <SafeAreaView style={{padding: adjust(5), backgroundColor: 'white'}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              padding: adjust(10),
              backgroundColor: 'white',
              width: WidthScreen * 0.8,
              borderRadius: adjust(5),
            }}>
            <Text
              style={{
                fontSize: adjust(14),
                fontWeight: '400',
                color: 'black',
              }}>
              Alamat Pengiriman Tidak di Temukan
            </Text>
            <Text
              style={{
                fontSize: adjust(12),
                fontWeight: '300',
                marginTop: adjust(4),
                color: GrayMedium,
              }}>
              Kamu belum memiliki alamat pengiriman, Yuk tambah alamat
              pengiriman terlebih dahulu
            </Text>
            {/*  */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: adjust(10),
              }}>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={{
                  flex: 1,
                  borderRadius: 4,
                  backgroundColor: 'red',
                  padding: adjust(6),
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: adjust(2),
                }}>
                <Text
                  style={{
                    fontSize: adjust(12),
                    color: 'white',
                  }}>
                  Tutup
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <SectionList
        ListHeaderComponent={() => {
          return (
            <View>
              <Text
                style={{
                  color: blueB2C,
                  fontWeight: 'bold',
                  fontSize: adjust(15),
                }}>
                Checkout
              </Text>
              <View
                style={{
                  flex: 1,
                  // height: HeightScreen * 0.14,
                  // backgroundColor: 'red',
                  marginVertical: adjust(10),
                }}>
                <Text
                  style={{
                    fontSize: adjust(10),
                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  {addressDefault.recipient_name}
                </Text>
                <Text
                  style={{
                    fontSize: adjust(10),
                    color: blueB2C,
                    fontWeight: 'bold',
                  }}>
                  {addressDefault.name}
                </Text>
                <Text
                  style={{
                    fontSize: adjust(10),
                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  {addressDefault.province}
                </Text>
                <Text
                  style={{
                    fontSize: adjust(10),
                    color: 'black',
                    marginTop: adjust(5),
                  }}>
                  {addressDefault.shipping_address}
                </Text>

                {addressDefault.id != null && (
                  <ModalComponent
                    ButtonCustoms={({open}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            // setSelectShipping([]);
                            open();
                          }}
                          style={{
                            borderColor: blueB2C,
                            borderWidth: 1,
                            marginTop: adjust(10),
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: adjust(5),
                            borderRadius: adjust(5),
                          }}>
                          <Text
                            style={{
                              fontSize: adjust(10),
                              color: blueB2C,
                              fontWeight: 'bold',
                              // marginTop: adjust(5),
                            }}>
                            Pilih Alamat Lain
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                    ContentCustoms={({close}) => {
                      return (
                        <FlatList
                          data={dataAddress.data}
                          keyExtractor={item => {
                            return item.id;
                          }}
                          ListHeaderComponent={() => (
                            <View>
                              <Text>Choose Address</Text>
                            </View>
                          )}
                          contentContainerStyle={{padding: adjust(10)}}
                          renderItem={({item, index}) => {
                            // console.log(item);
                            return (
                              <TouchableOpacity
                                onPress={() => {
                                  setAddresDefault(item);
                                  setSelectShipping([]);
                                  close();
                                }}
                                style={{
                                  marginBottom: adjust(5),
                                  borderWidth: 1,
                                  borderColor: blueB2C,
                                  borderRadius: adjust(5),
                                  padding: adjust(5),
                                  display: 'flex',
                                  flexDirection: 'row',
                                }}>
                                <View style={{flex: 1}}>
                                  <Text
                                    style={{
                                      color: blueB2C,
                                      fontWeight: 'bold',
                                      fontSize: adjust(10),
                                    }}>
                                    {item.name}
                                  </Text>
                                  <Text
                                    style={{
                                      color: 'black',
                                      fontSize: adjust(10),
                                    }}>
                                    {item.recipient_name}
                                  </Text>
                                  <Text
                                    style={{
                                      color: 'black',

                                      fontSize: adjust(10),
                                    }}>
                                    {item.shipping_address}
                                  </Text>
                                  <Text
                                    style={{
                                      color: 'black',

                                      fontSize: adjust(10),
                                    }}>
                                    {item.district}, {item.city},{' '}
                                    {item.province},{item.postal_code}
                                  </Text>
                                </View>
                                {item.is_main && (
                                  <View
                                    style={{
                                      width: adjust(5),
                                      backgroundColor: blueB2C,
                                      borderRadius: adjust(5),
                                    }}></View>
                                )}
                              </TouchableOpacity>
                            );
                          }}
                        />
                      );
                    }}
                  />
                )}
                <ModalComponent
                  ButtonCustoms={open => {
                    return (
                      <TouchableOpacity
                        onPress={() => open.open()}
                        style={{
                          borderColor: blueB2C,
                          borderWidth: 1,
                          marginTop: adjust(10),
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: adjust(5),
                          borderRadius: adjust(5),
                        }}>
                        <Text
                          style={{
                            fontSize: adjust(10),
                            color: blueB2C,
                            fontWeight: 'bold',
                            // marginTop: adjust(5),
                          }}>
                          Tambah Alamat
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  ContentCustoms={close => {
                    return (
                      <View
                        style={{
                          padding: adjust(10),
                          backgroundColor: 'white',
                          width: WidthScreen * 0.9,
                          borderRadius: adjust(5),
                        }}>
                        <Text
                          style={{
                            fontSize: adjust(14),
                            fontWeight: 'bold',
                            color: blueB2C,
                          }}>
                          Tambah Alamat Pengiriman
                        </Text>
                        <AddressForm
                          props={{close: close, address: setAddress}}
                        />
                      </View>
                    );
                  }}
                  isTransparent={false}
                  ContainerStyleContent={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              </View>
            </View>
          );
        }}
        sections={dataCheckout.data}
        keyExtractor={item => item.id}
        renderItem={props => {
          const {item} = props;
          // console.log(item);
          return (
            <View
              style={{
                marginVertical: adjust(5),
                padding: adjust(5),
                backgroundColor: Gray,
              }}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Image
                  source={{uri: item.images[0]}}
                  style={{
                    width: WidthScreen * 0.15,
                    height: WidthScreen * 0.15,
                    resizeMode: 'contain',
                  }}
                />
                <View style={{marginLeft: adjust(5)}}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: adjust(10),
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: adjust(10),
                    }}>
                    {item.price_f}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
        renderSectionHeader={({section}) => {
          // console.log(section);
          return (
            // pilih pengiriman
            dataAddress.data.length > 0 ? (
              <CompoCheckOut
                section={section}
                addressDefault={addressDefault}
                dataShipping={dataShipping}
                setDataShipping={setDataShipping}
                selectShipping={selectShipping}
                setSelectShipping={setSelectShipping}
                dataCheckout={dataCheckout}
                setDataCheckout={setDataCheckout}
              />
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: Gray,
                  padding: adjust(5),
                  borderRadius: adjust(3),
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: adjust(10),
                    fontWeight: 'bold',
                  }}>
                  Pilih Pengiriman
                </Text>
              </TouchableOpacity>
            )
          );
        }}
        ListFooterComponent={() => {
          return (
            <View style={{marginTop: adjust(10)}}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: adjust(11),
                    fontWeight: 'bold',
                    color: blueB2C,
                  }}>
                  Total Harga Produk
                </Text>
                <Text
                  style={{
                    color: blueB2C,
                    fontSize: adjust(11),
                  }}>
                  {formatter(calculateTotalProduct(dataCheckout.data))}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  paddingBottom: adjust(5),
                }}>
                <Text
                  style={{
                    fontSize: adjust(11),
                    fontWeight: 'bold',
                    color: blueB2C,
                  }}>
                  Total Harga Ongkir
                </Text>
                <Text
                  style={{
                    color: blueB2C,
                    fontSize: adjust(11),
                  }}>
                  {formatter(calculateOngkirProduct(selectShipping))}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: adjust(5),
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: adjust(11),
                    fontWeight: 'bold',
                    color: 'black',
                  }}>
                  Total Belanja
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: adjust(11),
                  }}>
                  {formatter(
                    calculateOngkirProduct(selectShipping) +
                      calculateTotalProduct(dataCheckout.data),
                  )}
                </Text>
              </View>
              {/* PILIH PEMBAYARAN */}

              {dataCheckout.data.length != selectShipping.length ? (
                <TouchableOpacity
                  style={{
                    marginTop: adjust(10),
                    paddingVertical: adjust(8),
                    backgroundColor: Gray,
                    borderRadius: adjust(5),
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Pilih Pembayaran
                  </Text>
                </TouchableOpacity>
              ) : (
                <ModalComponent
                  ButtonCustoms={({open}) => {
                    return selectPayment ? (
                      <TouchableOpacity
                        onPress={() => {
                          // setSelectPayment(met);
                          open();
                        }}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          borderWidth: 1,
                          marginVertical: adjust(10),
                          padding: adjust(5),
                          borderRadius: adjust(5),
                          borderColor: blueB2C,
                        }}>
                        <Image
                          source={{uri: selectPayment.ava}}
                          style={{
                            width: adjust(WidthScreen * 0.1),
                            height: WidthScreen * 0.1,
                            resizeMode: 'contain',
                          }}
                        />
                        <Text
                          style={{
                            color: 'black',
                            fontSize: adjust(10),
                            fontWeight: 'bold',
                            marginLeft: adjust(10),
                          }}>
                          {selectPayment.name}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          // console.log(selectShipping);
                          // console.log(addressDefault);
                          open();
                        }}
                        style={{
                          marginTop: adjust(10),
                          paddingVertical: adjust(8),
                          backgroundColor: blueB2C,
                          borderRadius: adjust(5),
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>
                          Pilih Pembayaran
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  isTransparent={true}
                  ContainerStyleContent={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  ContentCustoms={({close}) => {
                    return (
                      <View
                        style={{
                          width: WidthScreen * 0.8,
                          padding: adjust(5),
                          backgroundColor: 'white',
                        }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: adjust(12),
                            color: 'black',
                            marginBottom: adjust(10),
                          }}>
                          Pilih Pembayaran
                        </Text>
                        {paymentMethod.map((val, index) => {
                          return (
                            <View key={index}>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  fontSize: adjust(11),
                                  color: 'black',
                                }}>
                                {val.type_literal}
                              </Text>
                              {val.methods.map((met, i) => {
                                return (
                                  <TouchableOpacity
                                    onPress={() => {
                                      setSelectPayment(met);
                                    }}
                                    key={i}
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      borderWidth: 1,
                                      marginVertical: adjust(5),
                                      padding: adjust(5),
                                      borderRadius: adjust(5),
                                      borderColor: selectPayment
                                        ? selectPayment.code === met.code &&
                                          blueB2C
                                        : Gray,
                                    }}>
                                    <Image
                                      source={{uri: met.ava}}
                                      style={{
                                        width: adjust(WidthScreen * 0.1),
                                        height: WidthScreen * 0.1,
                                        resizeMode: 'contain',
                                      }}
                                    />
                                    <Text
                                      style={{
                                        color: 'black',
                                        fontSize: adjust(10),
                                        fontWeight: 'bold',
                                        marginLeft: adjust(10),
                                      }}>
                                      {met.name}
                                    </Text>
                                  </TouchableOpacity>
                                );
                              })}
                            </View>
                          );
                        })}
                      </View>
                    );
                  }}
                />
              )}

              {dataCheckout.data.length != selectShipping.length && (
                <Text style={{color: 'red', fontSize: adjust(10)}}>
                  pilih pengiriman belum lengkap !
                </Text>
              )}
              {/* {console.log(selectPayment)} */}
              {selectPayment && (
                <TouchableOpacity
                  onPress={() => {
                    // console.log(selectPayment, selectShipping, addressDefault);

                    const couriers = selectShipping.map(val => {
                      return {
                        provider_id: val.id_provider,
                        courier_service: val.service,
                        courier_service_type: val.service_type,
                      };
                    });

                    // console.log(couriers);

                    const DataPost = {
                      address_id: addressDefault.id,
                      couriers: couriers,
                      payment_method: selectPayment.type,
                      payment_provider: selectPayment.vendor,
                    };

                    gotoPayment(token, DataPost, val => {
                      navigation.dispatch(
                        StackActions.replace('Payment', {
                          data: val.data.data,
                        }),
                      );
                    });
                  }}
                  style={{
                    marginTop: adjust(10),
                    paddingVertical: adjust(8),
                    backgroundColor: Green,
                    borderRadius: adjust(5),
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Beli Sekarang
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />
    </SafeAreaView>
    // <Text>jaj</Text>
  );
};

export default ScreenCheckout;
