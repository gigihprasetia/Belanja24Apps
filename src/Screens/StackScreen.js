import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import ScreenBeranda from './ScreenBeranda';
import SearchBarTop from '../Component/SearchBarTop';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScreenAccount from './ScreenAccount';
import {adjust, blueB2C} from '../Assets/utils';
// import StackBeranda from './StackBeranda';
import ScreenBeranda from './ScreenBeranda';
import {useState} from 'react';

const Tab = createBottomTabNavigator();

const StackScreen = () => {
  const [isLogin, SetIslogin] = useState(true);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        header: props => <SearchBarTop {...props} />,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Beranda') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={adjust(15)} color={color} />;
        },
        tabBarActiveTintColor: blueB2C,
        tabBarInactiveTintColor: 'gray',
      })}
      initialRouteName="Beranda">
      <Tab.Screen name="Beranda" component={ScreenBeranda} />

      <Tab.Screen
        options={{headerShown: false}}
        name="Keranjang"
        component={ScreenAccount}
      />

      <Tab.Screen
        options={{headerShown: false}}
        name="Transaction"
        component={ScreenAccount}
      />

      <Tab.Screen
        options={{headerShown: false}}
        name="Account"
        component={ScreenAccount}
      />
    </Tab.Navigator>
  );
};
export default StackScreen;
