import { images } from '@/constants'
import useAuthStore from '@/store/auth.store'
import { Redirect, Slot } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
export default function AuthLayout() {
  const { isAuthenticated } = useAuthStore()

  if (isAuthenticated === null) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="small" color="#FE8C00" />
      </View>
    )
  }

  if (isAuthenticated) return <Redirect href="/(tabs)" />

  return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView className="h-full bg-white" keyboardShouldPersistTaps="handled">
          <View className="relative w-full" style={{height: Dimensions.get('screen').height / 2.25}}>
            <ImageBackground source={images.loginGraphic} className="rounded-b-lg size-full" resizeMode='stretch'></ImageBackground>
            <Image source={images.logo} className="absolute -bottom-16 z-10 self-center size-48"></Image>
          </View>
          <Slot></Slot>
        </ScrollView>
       
      </KeyboardAvoidingView>
       
  )
}