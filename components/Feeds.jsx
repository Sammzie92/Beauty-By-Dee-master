import { View, Text } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { pressIcons } from '../colors'
import FeedDetail from './FeedDetail'


const Feeds = ({feeds}) => {
  return (
    <View className='items-center flex-row flex-wrap justify-center' >
      {feeds?.length > 0 ? (
      <>
      {feeds?.map((item, i) => <FeedDetail key={i} data={item} />)}
      </> ): (<View className='w-full h-60 flex items-center justify-center'>
        
      <ActivityIndicator 
        size={"large"}
        color={pressIcons}
         />
         <Text>No Data Found..</Text>
      </View>)}
    </View>
  )
}

export default Feeds