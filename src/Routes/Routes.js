import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../Screens/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import StackScreen from '../Screens/StackScreen';
import ScreenDetailBarang from '../Screens/ScreenDetailBarang';
import {adjust, blueB2C, HeightScreen, WidthScreen} from '../Assets/utils';
import FontAwsome5 from 'react-native-vector-icons/FontAwesome5';
import ScreenCheckout from '../Screens/ScreenCheckout';
import ScreenPayment from '../Screens/ScreenPayment';
import ScreenPencarian from '../Screens/ScreenPencarian';
import {SearchBar} from 'react-native-screens';
import Slider from '../Component/Slider';
import SearchBarTop from '../Component/SearchBarTop';
const stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="splashscreen">
        <stack.Screen
          options={{
            headerShown: false,
          }}
          name="splashscreen"
          component={SplashScreen}
        />
        <stack.Screen name="stack" component={StackScreen} />
        <stack.Screen
          options={{
            headerShown: true,
            header: props => {
              // console.log(props);
              const {navigation} = props;
              return (
                <View
                  style={{
                    width: WidthScreen,
                    height: HeightScreen * 0.06,
                    paddingVertical: adjust(5),
                    paddingHorizontal: adjust(10),

                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: blueB2C,
                  }}>
                  <Pressable onPress={() => navigation.goBack()}>
                    <FontAwsome5
                      name="arrow-left"
                      color={'white'}
                      size={adjust(13)}
                    />
                  </Pressable>
                </View>
              );
            },
          }}
          name="DetailBarang"
          component={ScreenDetailBarang}
        />
        <stack.Screen
          // options={{headerShown: false}}
          name="Checkout"
          component={ScreenCheckout}
        />
        <stack.Screen
          // options={{headerShown: false}}
          name="Payment"
          component={ScreenPayment}
        />
        <stack.Screen
          options={{
            headerShown: true,
            header: props => <SearchBarTop {...props} />,
          }}
          name="Pencarian"
          component={ScreenPencarian}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
