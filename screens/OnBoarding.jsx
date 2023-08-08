import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import Swiper from 'react-native-swiper';
import { Image } from 'react-native';
import { Brand, Screen1, Screen2, Screen3 } from '../assets';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnBoarding = () => {
    const navigation = useNavigation();

    useEffect (() => {
        checkOnboardingStatus = async () => {
            const value = await AsyncStorage.getItem("@onboarding_complete");
            if (value !== null && value==="true"){
                navigation.replace("Home")
            }

        };
        checkOnboardingStatus();
    }, [])


    const handleOnboardingComplete = async(e) => {
        
        if (e === 2){
           try {
            // Add a 5-second delay before setting onboarding_complete and navigating to the next screen
            setTimeout(async () => {
            await AsyncStorage.setItem("@onboarding_complete", "true")
            navigation.navigate("Home");

            }, 5000) // 5 seconds delay (20000 milliseconds)
            
           } catch (error) {
            console.log("Error Encountered :", error)
            
           }

        }


    }


  return (
    <View className='flex-1' >
      <Swiper onIndexChanged={handleOnboardingComplete} >
        <ScreenOne/>
        <ScreenTwo/>
        <ScreenThree/>

      </Swiper>
    </View>
  )
}
export const ScreenOne = () => {
    return (
        <View className='flex-1 items-center justify-center relative'>
            <Image
            className='w-full h-full z-0'
            resizeMode='cover'                        
            source={Screen1}
            />


        </View>
    )
};
export const ScreenTwo = () => {
    return (
        <View className='flex-1 space-y-6 items-center justify-start'>
        <Image
            className='w-full h-[65%] z-0'
            resizeMode='cover'                        
            source={Screen2}
            />
            <View className='flex items-center justify-center space-y-6 px-6' >
                <Text className='text-2xl tracking-wider text-[#555]'>
                    Find your Beauty Products
                </Text>
                <Text className='text-xl tracking-wider text-center text-[#777]'>
                    Beauty begins the moment you decide to be yourself
                </Text>

            </View>
        </View>
    )
};
export const ScreenThree = () => {
    return (
        <View className='flex-1 space-y-6 items-center justify-start'>
        <Image
            className='w-full h-[65%] z-0'
            resizeMode='cover'                        
            source={Screen3}
            />
            <View className='flex items-center justify-center space-y-6 px-6' >
                <Text className='text-2xl tracking-wider text-[#555]'>
                    Find your Beauty Products
                </Text>
                <Text className='text-xl tracking-wider text-center text-[#777]'>
                    Beauty begins the moment you decide to be yourself
                </Text>

            </View>
        </View>
    )
};

export default OnBoarding