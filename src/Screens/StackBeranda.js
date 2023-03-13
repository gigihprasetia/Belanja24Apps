import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScreenDashboard from './ScreenBeranda';
import ScreenDetailBarang from './ScreenDetailBarang';
import ScreenCheckout from './ScreenCheckout';

const Stack = createNativeStackNavigator();

const StackBeranda = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Beranda">
      <Stack.Screen name="Beranda" component={ScreenDashboard} />
      <Stack.Screen
        // options={{headerShown: false}}
        name="DetailBarang"
        component={ScreenDetailBarang}
      />
      <Stack.Screen
        // options={{headerShown: false}}
        name="Checkout"
        component={ScreenCheckout}
      />
    </Stack.Navigator>
  );
};

export default StackBeranda;
