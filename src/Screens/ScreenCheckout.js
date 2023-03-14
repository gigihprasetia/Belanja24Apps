import {
  View,
  Text,
  SectionList,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import {getFromRedux} from '../Assets/API/GetRedux';
import {CheckShipping, getCheckout} from '../Assets/API/postAPI';
import {useState} from 'react';
import LoadingPage from '../Component/LoadingPage';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  adjust,
  blueB2C,
  formatter,
  GrayMedium,
  HeightScreen,
} from '../Assets/utils';
import {getAddresShipping} from '../Assets/API/getAPI';
import ModalComponent from '../Component/ModalComponent';

const ScreenCheckout = () => {
  const [dataCheckout, setDataCheckout] = useState({
    status: false,
    data: [],
  });
  const [dataAddress, setDataAddress] = useState({
    status: false,
    data: [],
  });

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

  const [dataShipping, setDataShipping] = useState([]);

  const token = getFromRedux('token');
  useEffect(() => {
    getAddresShipping(token, address => {
      const addressSelect = address.filter(add => add.is_main === true);
      // console.log(addressSelect, 'add');
      setAddresDefault(addressSelect[0]);
      setDataAddress({
        status: true,
        data: address,
      });

      getCheckout(token, res => {
        const data = res.data.data.map(val => {
          // console.log(val, 'check');
          return {
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
  }, []);

  // console.log(addressDefault);

  return !dataCheckout.status || !dataAddress.status ? (
    <LoadingPage />
  ) : (
    <SafeAreaView style={{padding: adjust(5)}}>
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
                          onPress={open}
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
                    ContentCustoms={close => {
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
                                onPress={() => setAddresDefault(item)}
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
              </View>
            </View>
          );
        }}
        sections={dataCheckout.data}
        keyExtractor={item => item.id}
        renderItem={props => {
          return (
            <View style={{marginBottom: adjust(10)}}>
              <Text>haha</Text>
            </View>
          );
        }}
        renderSectionHeader={({section}) => {
          console.log(section, 'ahuahhsuahsuahsuahsu');

          return (
            <View
              style={{
                // backgroundColor: blueB2C,
                borderColor: blueB2C,
                borderWidth: 1,
                padding: adjust(5),
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: section.logo}}
                  style={{
                    width: adjust(25),
                    height: adjust(25),
                    borderRadius: adjust(10),
                  }}
                />
                <Text
                  style={{
                    color: 'black',
                    fontSize: adjust(10),
                    fontWeight: 'bold',
                    marginLeft: adjust(10),
                  }}>
                  {section.title}
                </Text>
              </View>
              <ModalComponent
                ButtonCustoms={({open}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        CheckShipping(
                          token,
                          {
                            provider_id: section.data[0].provider_id,
                            address_id: addressDefault.id,
                          },
                          res => {
                            // console.log(res);
                            setDataShipping(res.data.data);
                            open();
                          },
                        );
                      }}
                      style={{
                        backgroundColor: blueB2C,
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
                  );
                }}
                ContentCustoms={({close}) => {
                  return (
                    <FlatList
                      data={dataShipping}
                      contentContainerStyle={{padding: adjust(10)}}
                      renderItem={({item}) => {
                        console.log(item);
                        return (
                          <View
                            style={{
                              width: '100%',
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              borderWidth: 1,
                              marginBottom: adjust(5),
                              padding: adjust(5),
                            }}>
                            <View>
                              <Text
                                style={{
                                  color: 'black',
                                  fontSize: adjust(10),
                                  fontWeight: 'bold',
                                }}>
                                {item.group_f}
                              </Text>
                              <View>
                                <Text
                                  style={{
                                    color: 'black',
                                    fontSize: adjust(10),
                                    fontWeight: 'bold',
                                  }}>
                                  {item.service_name}
                                </Text>
                                <Text
                                  style={{
                                    color: 'black',
                                    fontSize: adjust(10),
                                    fontWeight: 'bold',
                                  }}>
                                  {item.service}
                                </Text>
                              </View>
                              <Text
                                style={{
                                  color: 'black',
                                  fontSize: adjust(10),
                                  fontWeight: 'bold',
                                }}>
                                {item.etd_f}
                              </Text>
                            </View>
                            <View>
                              <Text
                                style={{
                                  color: 'black',
                                  fontSize: adjust(10),
                                  fontWeight: 'bold',
                                }}>
                                {formatter(item.cost)}
                              </Text>
                            </View>
                          </View>
                        );
                      }}
                    />
                    // <FlatList/>
                  );
                }}
              />
            </View>
          );
        }}
      />
    </SafeAreaView>
    // <Text>jaj</Text>
  );
};

export default ScreenCheckout;
