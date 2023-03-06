import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
  Pressable,
} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import {getDetailProduct, getRelatedProduct} from '../Assets/API/getAPI';
import {useState} from 'react';
import {
  adjust,
  blueB2C,
  GrayMedium,
  Green,
  HeightScreen,
  WidthScreen,
} from '../Assets/utils';
import {SafeAreaView} from 'react-native-safe-area-context';
import CardProduct from '../Component/CardProduct';
import LoadingPage from '../Component/LoadingPage';
import ModalComponent from '../Component/ModalComponent';

export default function ScreenDetailBarang(props) {
  const [detailBarang, setDetailBarang] = useState({
    isLoading: true,
    data: null,
  });

  const [relatedProduct, setRelatedProduct] = useState({
    isLoading: true,
    data: null,
  });
  // https://api.belanja24.com/api/v1/guest-sys/fade/detail-product/projection-screen-smr-300225q-63f46cd3e7bff

  const {
    route: {
      params: {slug},
    },
  } = props;
  // console.log(props, 'kakak');
  const {
    route: {
      params: {id},
    },
  } = props;

  const {navigation} = props;

  // console.log(id);

  useEffect(() => {
    getDetailProduct(slug, barang => {
      setDetailBarang({
        isLoading: false,
        data: barang.data.data,
      });
    });

    getRelatedProduct(slug, related =>
      setRelatedProduct({
        isLoading: false,
        data: related.data.data,
      }),
    );
  }, []);

  // console.log(detailBarang.data);

  return detailBarang.isLoading ||
    (detailBarang.data === null && relatedProduct.isLoading) ||
    relatedProduct.data === null ? (
    <LoadingPage />
  ) : (
    // <ScrollView>

    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', padding: adjust(5)}}>
      <FlatList
        ListHeaderComponent={() => {
          return (
            <View>
              <View>
                <View
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    padding: adjust(5),
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: adjust(5),
                  }}>
                  <Image
                    style={{
                      width: WidthScreen * 0.5,
                      height: HeightScreen * 0.3,
                      resizeMode: 'contain',
                    }}
                    source={{uri: detailBarang.data.medias[0]}}
                  />
                </View>
                <Text
                  style={{
                    fontSize: adjust(15),
                    fontWeight: 'bold',
                    color: blueB2C,
                    marginVertical: adjust(5),
                  }}>
                  {detailBarang.data.title}
                </Text>
                <View
                  style={{
                    display: 'flex',

                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontSize: adjust(12),
                      fontWeight: 'bold',
                      color: GrayMedium,
                      marginVertical: adjust(5),
                    }}>
                    {detailBarang.data.price_b}
                  </Text>
                  <Text
                    style={{
                      color: GrayMedium,
                      marginLeft: adjust(5),
                      fontSize: adjust(10),
                    }}>
                    stock {detailBarang.data.stock}
                  </Text>
                </View>
              </View>
              <View>
                <View
                  style={{
                    paddingVertical: adjust(5),
                    borderBottomWidth: 1,
                    borderBottomColor: GrayMedium,
                  }}>
                  <Text
                    style={{
                      fontSize: adjust(12),
                      fontWeight: 'bold',
                      color: GrayMedium,
                      marginVertical: adjust(5),
                    }}>
                    Deskripsi
                  </Text>
                </View>
                <Text
                  style={{
                    marginVertical: adjust(5),
                    fontSize: adjust(10),
                    color: GrayMedium,
                    marginVertical: adjust(5),
                  }}>
                  {detailBarang.data.description}
                </Text>
              </View>
              <View>
                <View
                  style={{
                    paddingVertical: adjust(5),
                    borderBottomWidth: 1,
                    borderBottomColor: GrayMedium,
                  }}>
                  <Text
                    style={{
                      fontSize: adjust(12),
                      fontWeight: 'bold',
                      color: GrayMedium,
                      marginVertical: adjust(5),
                    }}>
                    Info Toko
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: adjust(5),
                  }}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: GrayMedium,
                      paddingHorizontal: adjust(7),
                      paddingVertical: adjust(5),
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderColor: GrayMedium,
                      borderRadius: adjust(10),
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{
                        width: adjust(50),
                        height: adjust(50),
                        resizeMode: 'contain',
                      }}
                      source={{uri: detailBarang.data.provider.ava}}
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: adjust(9),
                          color: GrayMedium,
                        }}>
                        {detailBarang.data.provider.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: adjust(8),
                          color: GrayMedium,
                        }}>
                        {detailBarang.data.provider.city}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
        data={relatedProduct.data}
        numColumns={2}
        contentContainerStyle={{backgroundColor: 'white'}}
        renderItem={({item}) => {
          return (
            <View
              key={item.id}
              style={{
                width: '50%',
                padding: adjust(5),
              }}>
              <CardProduct
                actions={() =>
                  navigation.push('DetailBarang', {
                    slug: item.slug,
                  })
                }
                {...item}
              />
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />
      <ModalComponent
        ButtonCustoms={({open}) => {
          return (
            <TouchableOpacity
              onPress={open}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: adjust(10),
                backgroundColor: blueB2C,
                borderRadius: adjust(5),
              }}>
              <Text style={{color: 'white'}}> Pesan Sekarang </Text>
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
                padding: adjust(10),
                backgroundColor: 'white',
                width: WidthScreen * 0.8,
                borderRadius: adjust(5),
              }}>
              {/* IMAGES PREVIEW */}
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: WidthScreen * 0.5,
                    height: HeightScreen * 0.3,
                    resizeMode: 'contain',
                  }}
                  source={{uri: detailBarang.data.medias[0]}}
                />
              </View>
              {/* STOCK AND HARGA */}
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: adjust(10),
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: adjust(13),
                  }}>
                  {detailBarang.data.price_b}
                </Text>
                <Text
                  style={{
                    color: GrayMedium,
                    fontSize: adjust(10),
                  }}>
                  stock {detailBarang.data.stock}
                </Text>
              </View>

              {/* ATUR JUMLAH */}
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: adjust(10),
                      marginVertical: adjust(5),
                    }}>
                    Atur Jumlah
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <Pressable
                    style={{
                      backgroundColor: 'red',
                      paddingVertical: adjust(5),
                      paddingHorizontal: adjust(10),
                      borderRadius: adjust(5),
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: 'white', fontSize: adjust(10)}}>
                      -
                    </Text>
                  </Pressable>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: 'black',
                        fontSize: adjust(10),
                      }}>
                      1
                    </Text>
                  </View>
                  <Pressable
                    style={{
                      backgroundColor: blueB2C,
                      paddingVertical: adjust(5),
                      paddingHorizontal: adjust(10),
                      borderRadius: adjust(5),
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: 'white', fontSize: adjust(10)}}>
                      +
                    </Text>
                  </Pressable>
                </View>
              </View>
              {/* BUTTON MASUKAN KERANJANG DAN BATAL */}
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: blueB2C,
                  borderRadius: adjust(5),
                  marginTop: adjust(15),
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: adjust(5),
                }}>
                <Text
                  style={{
                    color: blueB2C,
                    fontWeight: 'bold',
                    fontSize: adjust(10),
                  }}>
                  + Keranjang
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={close}
                style={{
                  borderWidth: 1,
                  borderColor: 'red',
                  borderRadius: adjust(5),
                  marginTop: adjust(10),
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: adjust(5),
                }}>
                <Text
                  style={{
                    color: 'red',
                    fontWeight: 'bold',
                    fontSize: adjust(10),
                  }}>
                  Batalkan
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeAreaView>

    // {/* </ScrollView> */}
    // <Text>a</Text>
  );
}