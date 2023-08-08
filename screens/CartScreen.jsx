import { View, Text, ScrollView, FlatList, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons'
import { iconColor, pressIcons, viewColor } from '../colors'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { Image } from 'react-native'
import { EmptyCart } from '../assets'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import {GestureHandlerRootView} from "react-native-gesture-handler"
import { removeFromCart } from '../context/actions/cartActions'
import { BottomTab } from '../components'

const CartScreen = () => {
    const navigation = useNavigation()
    const [total, setTotal] = useState(0)
    const [activeScreen, setActiveScreen] = useState(null)
    const cartItems = useSelector ((state) => state.cartItems.cart);
    useEffect (() => {
        let mainTotal = 0;
        if(cartItems?.length > 0) {
            cartItems.map(item => {
                mainTotal += item.data.price * item.qty
                setTotal(mainTotal)
            })
        }
    }, [cartItems])
    
  return (
    <SafeAreaView className='flex-1 w-full items-start justify-start space-y-4 ' style={{backgroundColor: viewColor}}>
       <GestureHandlerRootView>
       
        <View className='flex-row mt-5 items-center justify-between w-full px-4 py-2'>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" size={33} color={pressIcons} />
            </TouchableOpacity>

            <Text className='text-xl font-semibold text-[#020202]'>
            My Cart
            </Text>
            <View className='w-10 h-10 rounded-xl bg-[#f5f5ed] flex items-center justify-center relative'>
            <FontAwesome name="shopping-basket" size={30} color={pressIcons} />
            <View className='absolute w-4 h-5 bg-black top-0 right-0 rounded-md flex items-center justify-center'>
                <Text className='text-white text-sm'>{cartItems?.length}</Text>
            </View>
            </View>
        </View>
        {cartItems.length === 0 || !cartItems ? (
        <View className='flex-1 w-full justify-center p-4'>
            <Image
            source={EmptyCart}
            className='w-74 h-64 -ml-16'
            resizeMode='contain'
            />             
            
              <BottomTab activeScreen={activeScreen} />           

        </View> 
        
        )  : (
        <ScrollView className='w-full flex-1' >
            <View className='flex space-y-4'>
                <ScrollView>
                <FlatList 
                data={cartItems} 
                keyExtractor={(item) => item.data._id} 
                renderItem={({item}) => (<CartItemCard item={item.data} qty={item.qty}/>)}/>
                </ScrollView>

            </View>
            
            <View className='w-full p-8'>
                <View className='w-full px-2 h-16 rounded-xl bg-[#e3e4e2] items-center flex-row justify-center'>
                    <TextInput 
                    placeholder='Promo Code' 
                    className='font-semibold flex-1 py-1 px-4 text-base -mt-1 text-white'/>

                    <TouchableOpacity 
                    style={{backgroundColor: pressIcons}}
                    className="px-3 py-2 rounded-xl">
                        <Text className='text-white text-lg'>Apply</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className='px-8 w-full flex space-y-4'>
                <View className='flex-row items-center justify-between'> 
                <Text className='text-lg font-semibold text-[#555]'>
                    Sub -Total
                </Text>
                <View className='flex-row items-center justify-center space-x-2'>
                <Text className='text-lg font-semibold' style={{color:iconColor}}>
                    {parseFloat(total).toFixed(2)}
                </Text> 
                <Text className='text-sm capitalise'>
                    KSH 
                </Text>   
                </View>
                </View>
                <View className='w-full h-[2px] bg-black'></View>
                <View className='flex-row items-center justify-between'> 
                <Text className='text-lg font-semibold text-[#555]'>
                    Delivery Fee
                </Text>
                <View className='flex-row items-center justify-center space-x-2'>
                <Text className='text-lg font-semibold text-black'>
                    200.00
                </Text> 
                <Text className='text-sm capitalise'>
                    KSH 
                </Text>   
                </View>
                </View>
                <View className='w-full h-[2px] bg-black'></View>
                <View className='flex-row items-center justify-between'> 
                
                <Text className='text-lg font-semibold text-[#555]'>
                    Grand -Total
                </Text>
                <View className='flex-row items-center justify-center space-x-2'>
                <Text className='text-sm mr-4 text-gray-500'>
                    ({cartItems?.length}) Items
                </Text>
                <Text className='text-lg font-semibold' style={{color:iconColor}}>
                    {parseFloat(total + 200).toFixed(2)}
                </Text> 
                <Text className='text-sm capitalise' style={{color:'black'}}>
                    KSH 
                </Text>   
                </View>
                </View>                
            </View>
            <View className='w-full px-8 my-4'>
                <TouchableOpacity className='w-full p-2 py-3 rounded-xl flex items-center justify-center' style={{backgroundColor: pressIcons}}>
                    <Text className='text-[#FFA23A] text-lg font-semibold'>Proceed to Check-Out</Text>
                </TouchableOpacity>
            </View>           

        </ScrollView>
        )}
    
        </GestureHandlerRootView> 
    </SafeAreaView>

  )
}

const rightSwipeActions = () => {
    return (
      <View className='h-full w-24 flex items-center justify-center bg-white'>
        <TouchableOpacity>
        <Ionicons name="md-trash-sharp" size={24} color="black" />

        </TouchableOpacity>

      </View>
    );
  };

export const CartItemCard = ({item, qty}) => {
    const dispatch = useDispatch()
    const confirmRemoveFromCart = (_id) => {
        Alert.alert(
          'Confirm Deletion',
          'Are you sure you want to remove this item from the cart?',
          [
            {
              text: 'No',
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => dispatch(removeFromCart(_id)),
            },
          ],
          { cancelable: true }
        );
      };
    const swipeFromRightOpen = (_id) => {
        
        confirmRemoveFromCart(_id)
      };
    return (
        <Swipeable renderRightActions={rightSwipeActions} onSwipeableRightOpen={() => swipeFromRightOpen(item._id)}>
            <View className='flex-row px-6 w-full items-center my-1'>
            <View className='bg-white rounded-xl flex items-center justify-center p-2 w-16 h-16 relative'>
            <Image
            source={{uri: item?.bgImage?.asset?.url}}
            resizeMode='cover'
            className='w-full h-full opacity-30'
            />
            <View className='inset-0 absolute  flex items-center justify-center'>
            <Image
            source={{uri: item?.mainImage?.asset?.url}}
            resizeMode='contain'
            className='w-12 h-12'
            />
            </View>
            </View>
            <View className='items-center space-y-2 ml-3'>
                <View className='flex items-start justify-center'>
                    <Text className='text-lg font-semibold text-[#555]'>{item?.title}</Text>
                    <Text className='text-sm font-semibold text-[#2e3a22]'>{item?.shortDescription}</Text>

                    {/*  <View className='items-center flex-row justify-center space-x-3'>
                        <Text>KSH {item?.price * qty}</Text> 
                        
                    </View>*/}
                    <Text className='text-lg font-bold' style={{color:iconColor}}>KSH {item?.price * qty}</Text> 

                </View>
            </View>
            <View className='flex-row items-center justify-center space-x-4 rounded-xl border border-gray-300 px-3 py-1 ml-auto'>
            <Text>Qty : {qty}</Text>
            </View>
        </View>
        </Swipeable>

    )
}

export default CartScreen