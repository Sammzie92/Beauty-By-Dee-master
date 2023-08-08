import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { AntDesign, Entypo, Feather, FontAwesome5, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { iconColor, pressIcons } from '../colors'
import { useNavigation } from '@react-navigation/native'
import { useFonts } from 'expo-font';




const UserScreen = () => {

const navigation = useNavigation()
  return (
    <SafeAreaView className='flex-1 bg-white'>
    <View className='flex-row mt-5 items-center justify-between w-full px-4 py-2'>
      <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={33} color={pressIcons} />
      </TouchableOpacity> 
        <TouchableOpacity>
          <FontAwesome5 name="user-edit" size={24} color={pressIcons} />
        </TouchableOpacity>

    <TouchableOpacity>
      <MaterialCommunityIcons name="content-save-check" size={24} color={pressIcons} />
    </TouchableOpacity>    
    </View>

    <View className='flex-row mt-3 ml-3  space-y-10 space-x-6'>
      <TouchableOpacity className='w-40 h-40 bg-red-200 rounded-full justify-center items-center '>
      <MaterialIcons name="upload-file" size={24} color={pressIcons} />
        <Text>Upload Image</Text>
      </TouchableOpacity>
      <View className=''>
        <Text className='text-2xl font-bold text-[#356e94]'>Your Name Here</Text>
        <Text className='text-lg text-[#2c5978]'>Your Name Here</Text>
      </View>
    </View>
    <View className='ml-5 space-y-4'>
      <View className='flex-row items-center space-x-6 mt-4'>
      <Feather name="phone-call" size={30} color={pressIcons} />
      <Text className='text-base text-[#2c5978]'>+254 700 555 666</Text>
      </View>
      <View className='flex-row items-center space-x-6 mt-12'>
      <MaterialCommunityIcons name="email" size={30} color={pressIcons}/>
      <Text className='text-base text-[#2c5978]'>johndoe@mail.com</Text>
      </View>
    </View>
    <View className='flex-row py-2 h-28'>
      <View className='w-1/2 border-2  border-[#a0aab1] items-center justify-center '>
        <Text className='text-2xl font-extrabold text-[#356e94]'>KSH 400</Text>
        <Text className='text-base font-bold text-[#555]'>Wallet</Text>

      </View>
      <View className='w-1/2 items-center border-[#a0aab1] border-2 justify-center'>      
        <Text className='text-2xl font-extrabold text-[#356e94]'>12</Text>
        <Text className='text-base text-[#555] font-bold' >Your Orders</Text>
      </View>
    </View>
    <View className='ml-3'>
      <TouchableOpacity className='flex-row space-x-8 items-center '>
        <Foundation name="heart" size={35} color='#4493ca' />
          <Text className='text-lg font-extrabold text-[#2c5978] tracking-wide'>Your Favorites</Text>
        </TouchableOpacity>
   
        <TouchableOpacity className='flex-row mt-3 space-x-8 items-center'>
        <MaterialCommunityIcons name="wallet-outline" size={35} color='#4493ca' /> 
              <Text className='text-lg font-extrabold text-[#2c5978] tracking-wide'>Payments</Text>
        </TouchableOpacity>

        <TouchableOpacity className='flex-row mt-3 space-x-6 items-center'>
        <Feather name="users" size={40} color='#4493ca' />  
               <Text className='text-lg font-extrabold text-[#2c5978] tracking-wide'>Tell Your Friend</Text>
        </TouchableOpacity>

        <TouchableOpacity className='flex-row mt-3 space-x-6 items-center'>
          <Entypo name="price-tag" size={40} color='#4493ca' />
               <Text className='text-lg font-extrabold text-[#2c5978] tracking-wide'>Promotions</Text>
        </TouchableOpacity>

        <TouchableOpacity className='flex-row mt-3 space-x-6 items-center'>
        <Ionicons name="settings-outline" size={40} color='#4493ca' />   
            <Text className='text-lg font-extrabold text-[#2c5978] tracking-wide'>Settings</Text>
        </TouchableOpacity>

        <View className=' border-t-2 border-[#a0aab1] mt-4'>
          <TouchableOpacity className='flex-row mt-2 space-x-6 items-center '>
                    <AntDesign name="logout" size={35} color="red" className='mt-8' />
              <Text className='text-lg text-red-500 font-bold tracking-wide'>Log-Out</Text>
          </TouchableOpacity>

        </View>

    </View>
  </SafeAreaView>
 
  )
}

export default UserScreen