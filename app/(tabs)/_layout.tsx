import { useAuthSession } from '@/lib/useAuthSession';
import { Redirect, Slot } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function _Layout() {
  const { isAuthenticated } = useAuthSession();

  if (isAuthenticated === null) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="small" color="#FE8C00" />
      </View>
    );
  }

  if (!isAuthenticated) return <Redirect href="/sign-in" />;

  return <Slot />;
}