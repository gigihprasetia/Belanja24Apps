import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  FlatList,
  Linking,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Slider from '../Component/Slider';
import {adjust, blueB2C, Gray, WidthScreen} from '../Assets/utils';
import BookLogo from '../Assets/Images/book.png';
import SipplahLogo from '../Assets/Images/sipplah.png';
import StoreTraditionalLogo from '../Assets/Images/storeTraditional.png';
import ClothesLogo from '../Assets/Images/clothes.png';
import CosmeticsLogo from '../Assets/Images/cosmetics.png';
import CupboardLogo from '../Assets/Images/cupboard.png';
import ElectronicLogo from '../Assets/Images/electronic.png';
import SportsLogo from '../Assets/Images/sports.png';
import AllLogo from '../Assets/Images/gridicon.png';
import {
  getMostLikeProduct,
  getPopularProduct,
  getPopularStore,
} from '../Assets/API/getAPI';
import CardProduct from '../Component/CardProduct';
import {useSelector} from 'react-redux';
import {useCallback} from 'react';
import {getFromRedux} from '../Assets/API/GetRedux';
import Marker from 'react-native-vector-icons/FontAwesome';
import ModalComponent from '../Component/ModalComponent';

const ScreenDashboard = props => {
  const [dataPopular, setDataPopular] = useState({
    status: false,
    data: [],
  });
  const [dataPopularStore, setDataPopularStore] = useState({
    status: false,
    data: [],
  });
  const [dataMostLikeProduct, setDataMostLikeProduct] = useState({
    status: false,
    data: [],
  });

  const [muatbanyakLoading, setMuatBanyakLoading] = useState(false);
  const {navigation} = props;
  const token = useCallback(getFromRedux('token'), []);

  const {
    Authentication: {isUser},
  } = useSelector(state => state);

  useEffect(() => {
    getPopularProduct(token, val => {
      setDataPopular({
        status: true,
        data: val.data.data,
      });
    });

    getPopularStore(token, val => {
      setDataPopularStore({
        status: true,
        data: val.data.data,
      });
    });

    getMostLikeProduct(token, '', val => {
      setDataMostLikeProduct({
        status: true,
        data: val.data.data,
      });
    });
  }, []);

  const LoadMoreProduct = () => {
    setMuatBanyakLoading(true);
    if (dataMostLikeProduct.data.length === 0) {
      alert('data empty');
    } else {
      const lastData =
        dataMostLikeProduct.data[dataMostLikeProduct.data.length - 1]
          .created_at;
      getMostLikeProduct(token, lastData, val => {
        setMuatBanyakLoading(false);
        setDataMostLikeProduct({
          status: true,
          data: [...dataMostLikeProduct.data, ...val.data.data],
        });
      });
    }
  };

  return !dataPopular.status &&
    !dataPopularStore.status &&
    !dataMostLikeProduct ? (
    <View
      style={{
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <ActivityIndicator />
    </View>
  ) : (
    <SafeAreaView
      style={{
        flex: 1,
        height: '100%',
        backgroundColor: 'white',
      }}>
      <ModalComponent
        ButtonCustoms={open => (
          <TouchableOpacity
            onPress={() => open.open()}
            style={{
              position: 'absolute',
              zIndex: 50,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: adjust(8),
              borderRadius: 2,
              backgroundColor: 'green',
            }}>
            <Marker name="map-marker" size={20} color="white" />
            <Text style={{fontSize: adjust(10), marginLeft: 4, color: 'white'}}>
              Jakarta Selatan
            </Text>
          </TouchableOpacity>
        )}
        isTransparent={true}
        ContainerStyleContent={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        ContentCustoms={close => {
          
        }}
      />
      <FlatList
        ListHeaderComponent={() => {
          return (
            <View>
              <Slider />
              <View style={{paddingHorizontal: adjust(5)}}>
                {/* LINK BELANJA24 */}
                <View>
                  <Text
                    style={{
                      fontSize: adjust(11),
                      color: 'black',
                      fontWeight: 'bold',
                    }}>
                    Link Belanja24.com
                  </Text>
                  <View
                    style={{
                      width: WidthScreen * 0.4,
                      flex: 1,
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      marginVertical: 10,
                    }}>
                    {[
                      {name: 'SIPLah', srcImg: SipplahLogo},
                      {name: 'Pasar Tradisional', srcImg: StoreTraditionalLogo},
                    ].map((val, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            val.name === 'SIPLah'
                              ? Linking.openURL('https://siplah.belanja24.com/')
                              : navigation.navigate('Plaza')
                          }
                          key={index}
                          style={{
                            borderWidth: 1,
                            paddingVertical: adjust(6),
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginVertical: adjust(2),
                            marginHorizontal: adjust(4),
                            borderRadius: 5,
                            borderColor: Gray,
                          }}>
                          <Image
                            source={val.srcImg}
                            style={{width: adjust(30), height: adjust(30)}}
                          />
                          <Text
                            style={{
                              fontSize: adjust(8),
                              textAlign: 'center',
                              color: 'black',
                            }}>
                            {val.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
                {/* KATEGORI CONTENT */}
                <View>
                  <Text
                    style={{
                      fontSize: adjust(11),
                      color: 'black',
                      fontWeight: 'bold',
                    }}>
                    Kategori Popular
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      marginVertical: 10,
                      // paddingHorizontal: adjust(5),
                    }}>
                    {[
                      {name: 'Buku', srcImg: BookLogo},
                      {name: 'Clothing', srcImg: ClothesLogo},
                      {name: 'Personal Care', srcImg: CosmeticsLogo},
                      {name: 'Rumah & Dapur', srcImg: CupboardLogo},
                      {name: 'Elektronik', srcImg: ElectronicLogo},
                      {name: 'Sports', srcImg: SportsLogo},
                      {name: 'Semua Kategory', srcImg: AllLogo},
                    ].map((val, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            val.name === 'Semua Kategory'
                              ? navigation.navigate('Categories')
                              : navigation.navigate('Pencarian', {
                                  searchQuery: val.name,
                                })
                          }
                          key={index}
                          style={{
                            borderWidth: 1,
                            paddingVertical: adjust(6),
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: adjust(2),
                            borderRadius: 5,
                            borderColor: Gray,
                          }}>
                          <Image
                            source={val.srcImg}
                            style={{width: adjust(30), height: adjust(30)}}
                          />
                          <Text
                            style={{
                              fontSize: adjust(8),
                              textAlign: 'center',
                              color: 'black',
                            }}>
                            {val.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
                {/* PRODUCT POPULAR CONTENT */}

                <View>
                  <Text
                    style={{
                      fontSize: adjust(11),
                      color: 'black',
                      fontWeight: 'bold',
                    }}>
                    Product Popular
                  </Text>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{
                      marginVertical: 10,
                    }}>
                    {dataPopular.data.map(val => {
                      return (
                        <View
                          key={val.id}
                          style={{
                            width: WidthScreen * 0.45,

                            padding: adjust(5),
                          }}>
                          <CardProduct
                            actions={() => {
                              navigation.push('DetailBarang', {
                                slug: val.slug,
                              });
                            }}
                            {...val}
                          />
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
                {/* TOKO POPULAR CONTENT */}

                <View>
                  <Text
                    style={{
                      fontSize: adjust(11),
                      color: 'black',
                      fontWeight: 'bold',
                    }}>
                    Toko Popular
                  </Text>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{
                      marginVertical: 10,
                    }}>
                    {dataPopularStore.data.map(val => {
                      return (
                        <View
                          key={val.id}
                          style={{
                            borderWidth: 1,
                            borderColor: Gray,
                            padding: adjust(5),
                            borderRadius: adjust(5),
                            margin: adjust(5),
                          }}>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                width: adjust(30),
                                height: adjust(30),
                                borderRadius: 100,
                                padding: 10,
                                marginRight: adjust(5),
                                borderWidth: 0.5,
                                borderColor: Gray,
                              }}>
                              <Image
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  resizeMode: 'cover',
                                }}
                                source={{uri: val.ava}}
                              />
                            </View>
                            <View>
                              <Text
                                style={{
                                  fontSize: adjust(9),
                                  color: 'black',
                                  fontWeight: 'bold',
                                }}>
                                {val.name}
                              </Text>
                              <Text
                                style={{
                                  fontSize: adjust(8),
                                  color: 'black',
                                }}>
                                {val.total_product} Product ditawarkan
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              alignItems: 'center',
                              marginTop: adjust(3),
                            }}>
                            <Text
                              style={{
                                fontSize: adjust(7),
                                color: 'black',
                              }}>
                              {val.city}
                            </Text>
                            <Text
                              style={{
                                fontSize: adjust(7),
                                color: 'black',
                              }}>
                              Bergabung {val.created_at}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>

                <Text
                  style={{
                    fontSize: adjust(11),
                    color: 'black',
                    fontWeight: 'bold',
                    marginVertical: 10,
                  }}>
                  Produk Yang Mungkin Kamu Suka
                </Text>
              </View>
            </View>
          );
        }}
        numColumns={2}
        data={dataMostLikeProduct.data}
        renderItem={({item}) => {
          return (
            <View
              key={item.id}
              style={{
                width: '50%',

                padding: adjust(5),
              }}>
              <CardProduct
                actions={() => {
                  navigation.push('DetailBarang', {
                    slug: item.slug,
                  });
                }}
                {...item}
              />
            </View>
          );
        }}
        keyExtractor={item => item.id}
        ListFooterComponent={() => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: adjust(10),
              }}>
              <TouchableOpacity
                onPress={LoadMoreProduct}
                style={{
                  paddingVertical: adjust(5),
                  paddingHorizontal: adjust(10),
                  backgroundColor: blueB2C,
                  borderRadius: 5,
                }}>
                {muatbanyakLoading ? (
                  <ActivityIndicator color={'white'} size={adjust(10)} />
                ) : (
                  <Text
                    style={{
                      fontSize: adjust(11),
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                    Muat Lebih Banyak
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ScreenDashboard;
