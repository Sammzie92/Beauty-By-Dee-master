import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Entypo } from '@expo/vector-icons'
import { Cover } from '../assets'
import { FontAwesome } from '@expo/vector-icons'
import { TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { pressIcons } from '../colors'
import { ActivityIndicator } from 'react-native'
import { fetchFeeds } from '../sanity'
import { useDispatch, useSelector } from 'react-redux'
import { SET_FEEDS } from '../context/actions/feedsActions'
import { Feeds } from '../components'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setisLoading] = useState(false)
  const navigation = useNavigation()

  const feeds = useSelector((state) => state.feeds)
  const [filtered, setFiltered] = useState(null);


  const dispatch = useDispatch()


  const handleSearchTerm = (text) => {
    setSearchTerm(text)
    setFiltered(feeds?.feeds.filter(item => item.title.includes(text)))
  }

  useEffect (() => {
    setisLoading(true)
    try {
      fetchFeeds().then(res => {
       
        dispatch(SET_FEEDS (res))
        
        setInterval(() => {
          setisLoading (false)
        }, 2000)
      })
      
    } catch (error) {
      console.log(error)
      setisLoading(false)
      
    }
  }, [])


  return (
    <SafeAreaView className='flex-1 bg-[#f5f5ed]' >
    <View className="w-full flex-row mt-5 items-center justify-between px-4 py-2" >
    <Entypo name="chevron-left" size={35} color={pressIcons} />
    <TouchableOpacity onPress={() => navigation.navigate("UserScreen")}>
    <Image
    source={Cover}
    className='w-12 h-12 rounded-xl'
    resizeMode='contain'
    /> 
    </TouchableOpacity>
     
    </View>
    {/*Search box starts here*/}

    <View className='flex-row items-center justify-between px-4 py-2 w-full space-x-6'>
      <View className='px-4 py-2 bg-white rounded-xl flex-1 flex-row items-center justify-center space-x-2'>
      <FontAwesome name="search" size={24} color={pressIcons} />
      <TextInput className='text-base font-semibold flex-1 py-1 text=[#555]'
      placeholder="Search Here..."
      value={searchTerm}
      onChangeText={handleSearchTerm}
       />
      </View>
      <TouchableOpacity className='w-12 h-12 rounded-xl flex items-center justify-center bg-white' >
      <Ionicons name="filter" size={24} color={pressIcons} />

      </TouchableOpacity>
    </View>
    {/*Search box ends here*/}

    {/*Scrollable Container Starts*/}

    <ScrollView className='flex-1 w-full h-full' >
      {isLoading ?( 
      <View className='flex-1 h-80 items-center justify-center' >
        <ActivityIndicator 
        size={"large"}
        color={pressIcons}
         />
      </View> 
      
      ):( 
      <Feeds feeds={filtered || filtered?.length > 0 ? filtered : feeds?.feeds}/>
      )}

    </ScrollView>

    {/*Scrollable Container Ends*/}

    </SafeAreaView>
  )
}

export default HomeScreen