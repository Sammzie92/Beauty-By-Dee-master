import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartScreen, HomeScreen, OnBoarding, ProductsScreen } from './screens';
import "react-native-url-polyfill/auto"
import { Provider } from 'react-redux';
import store from './context/store';
import { BottomTab } from './components';
import { LogBox } from 'react-native';
import UserScreen from './screens/UserScreen';

LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews']);

const Stack = createNativeStackNavigator();

const MyComponent = ({setActiveScreen}) => {
  const navigation = useNavigation()
  useEffect(() => {
    const unsubscribe = navigation.addListener("state", () => {
      const currentScreen = navigation.getCurrentRoute().name
      setActiveScreen(currentScreen)
    })
    return unsubscribe
  },[navigation])
}


const App = () => {
  const [activeScreen, setActiveScreen] = useState(null)
  return (
    <NavigationContainer>
      <MyComponent setActiveScreen={setActiveScreen}/>
      <Provider store={store}>
      <Stack.Navigator screenOptions={{headerShown:false}} >
        <Stack.Screen name="OnBoarding" component={OnBoarding}/>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="UserScreen" component={UserScreen} />
      </Stack.Navigator>
      </Provider>
      {activeScreen !== "OnBoarding" && activeScreen !== "CartScreen" && (
        <BottomTab activeScreen={activeScreen} />
      )}
    </NavigationContainer>
  );
};

export default App



