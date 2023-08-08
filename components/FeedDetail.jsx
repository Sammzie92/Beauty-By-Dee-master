import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { iconColor, pressIcons, viewColor } from '../colors'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const FeedDetail = ({data}) => {

    const screenWidth = Math.round(Dimensions.get("window").width)
    const cardWidth = screenWidth / 2 - 20

    const navigation = useNavigation()
    const handleClick = () => {
      navigation.navigate("ProductsScreen", {_id : data?._id})

    }
    
    
  return (
    <TouchableOpacity onPress={handleClick}
    className='p-4 m-2 rounded-xl flex items-center justify-center bg-white' style={{width: cardWidth}}>
      <Image 
      source={{uri: data?.mainImage?.asset?.url}} 
      resizeMode='contain'
      className='w-28 h-40'
      />
      <View className='flex items-start justify-start space-y-1 w-full'>
        <Text className='text-base font-semibold'>{data?.title}</Text>
        <Text className='text-sm text-[#777]'>{data?.description}</Text>
      </View>
      <View className='flex-row items-center justify-between space-y-1 w-full' >
      <Text className='text-sm text-[#777]'>KSH {data?.price}</Text>
      <TouchableOpacity className='w-8 h-8 rounded-full flex items-center justify-center' style={{backgroundColor:pressIcons}}>
        <AntDesign name='heart' size={16} style={{color:iconColor}}  />
      </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default FeedDetail