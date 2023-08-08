import { View, Text } from 'react-native'
import React from 'react'
import { pressIcons, viewColor } from '../colors'
import { TouchableOpacity } from 'react-native'
import { Entypo, FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const BottomTab = ({activeScreen}) => {
    const navigation = useNavigation();
  return (
    <View className='absolute bottom-4 w-full px-8'>
      <View className='rounded-xl px-4 py-3 w-full flex-row items-center justify-around bg-[#555]'
      
      >
        <TouchableOpacity>
        <FontAwesome5 name="user-alt" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
        <FontAwesome name="list-ul" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <FontAwesome5 name="home" size={32} color={activeScreen === "Home" ? "#FFA23A" : "black"} />
        </TouchableOpacity>
        <TouchableOpacity >
        <MaterialIcons name="collections" size={32} color={activeScreen === "ProductScreen" ? "#FFA23A" : "black"} /> 
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
        <FontAwesome5 name="shopping-basket" size={32} color={activeScreen === "CartScreen" ? "#FFA23A" : "black"} />
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default BottomTab