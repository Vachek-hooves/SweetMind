import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const StackFeelingMoodScreen = ({route}) => {
  const { mood } = route.params
  console.log(mood)
  return (
    <View>
      <Text>StackFeelingMoodScreen</Text>
    </View>
  )
}

export default StackFeelingMoodScreen

const styles = StyleSheet.create({})