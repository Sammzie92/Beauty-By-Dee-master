import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActivityIndicator } from 'react-native'
import { iconColor, pressIcons, viewColor } from '../colors'
import { SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Dimensions } from 'react-native'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { addtocart } from '../context/actions/cartActions'

const ProductsScreen = ({route}) => {
    const {_id} = route.params
    const cartItems = useSelector((state) => state.cartItems )
    const dispatch = useDispatch()
    

    const feeds = useSelector ((state) => state.feeds)
    const [data, setData] = useState(null)
    const [isLoading, setisLoading] = useState(false)
    const navigation = useNavigation()
    const [qty, setQty] = useState(1)

    const screenHeight = Math.round(Dimensions.get("window").height)

    useEffect(() => {
        setisLoading(true)
        if(feeds){
            setData(feeds?.feeds.filter((item) => item._id === _id)[0])
            setInterval(() => {
                setisLoading(false)
            },2000)
        }

    }, []);

    const handleQty = (action) => {
        const newQty = qty + action
        setQty(newQty >= 1 ? newQty : 1)

    }

    const handlePressCart = () =>{
        dispatch(addtocart({data : data, qty: qty}))

    }



  return (
    <View className='flex-1 items-start justify-start bg-[#f5f5ed] space-y-4'>
      {isLoading ?( 
      <View className='w-full flex-1 h-full items-center justify-center'>
        <ActivityIndicator size={"large"} color={pressIcons} />
      </View>) 
      : 
      (<>
      <SafeAreaView className='w-full mt-6'>
        <View className='flex-row items-center justify-between px-4 py-2 w-full'>
            <TouchableOpacity
            onPress={() => navigation.goBack()}
            >
            <Entypo name="chevron-left" size={32} color={pressIcons} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
            <FontAwesome name="shopping-basket" size={32} color={pressIcons} />
            
            </TouchableOpacity>
        </View>
        <View className='w-full flex items-center justify-center relative' style={{height: screenHeight /2.5}}>
            <Image
            source={{uri: data?.bgImage?.asset?.url}}
            resizeMode='cover'
            className='w-full h-full opacity-30'
            />
            <View className='w-full h-full absolute top-0 left-0 flex items-center justify-center'>
            <Image
            source={{uri: data?.mainImage?.asset?.url}}
            resizeMode='contain'
            className='w-60 h-52'
            />
            </View>
        </View>
        <View className='w-full flex-row items-center justify-evenly -mb-2 mt-2'>
        {data?.categories && data?.categories?.length > 0 && data?.categories.map(value => (
            <View key={value._id} 
            className='p-2 w-24 rounded-3xl flex items-center justify-center space-y-3'
            style={{backgroundColor:'#f1f1f0'}}
            >
            <Image
            source={{uri: value?.mainImage?.asset?.url}}
            resizeMode='contain'
            className='w-20 h-20 opacity-70'
            />
                <Text className='font-semibold text-sm text-[#555]'>{value.title}</Text>
            </View>
        ))}

        </View>
      </SafeAreaView>
      
      <View className='w-full flex-1 h-auto bg-white rounded-t-[36px] py-2  px-12 space-y-6'>
        <View className='w-full items-center justify-between flex-row'>
            <View className='flex items-start justify-center'>
                <Text className='text-xl font-semibold text-[#555]'>
                    {data?.title}
                </Text>
                <Text className='text-sm font-semibold text[#777]'>
                    {data?.shortDescription}                    
                </Text>
            </View>
            <TouchableOpacity 
            className='w-10 h-10 rounded-full flex items-center justify-center'
            style={{backgroundColor:pressIcons}}
            >
            <AntDesign name='heart' size={18} style={{color:iconColor}} />

            </TouchableOpacity>

        </View>
        <View className='flex-row w-full items-center justify-between'>
            <Text className='text-xl font-bold text-black'>
              KSH  {data?.price}
            </Text>
            <View className='flex-row items-center justify-center  space-x-4 rounded-xl border border-gray-200 px-4 py-1'>
                <TouchableOpacity
                onPress={() => handleQty(-1)}
                >
                <Text className='text-lg font-bold text-black' >-</Text>
                </TouchableOpacity>
                <Text className='text-lg font-bold text-black' >{qty}</Text>
                <TouchableOpacity
                onPress={() => handleQty(1)}
                >
                <Text className='text-lg font-bold text-black' >+</Text>
                </TouchableOpacity>

            </View>

        </View>
        {cartItems?.cart?.filter((item) => item?.data?._id === data?._id)?.length > 0 ? (            
            <TouchableOpacity className='bg-[#5C5576] px-4 py-2 items-center rounded-xl'>
                <Text className='text-xl font-bold text-white' >Added</Text>
            </TouchableOpacity>) :(

            <TouchableOpacity onPress={handlePressCart} className='bg-[#2e3a22] px-4 py-2 items-center rounded-xl'>
                <Text className='text-xl font-bold text-white' >Add to Cart</Text>
            </TouchableOpacity>
            )}

      </View>
      </>
      )}
    </View>
  )
}

export default ProductsScreen