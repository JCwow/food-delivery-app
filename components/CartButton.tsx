import { images } from '@/constants';
import { useCartStore } from '@/store/cart.store';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
const CartButton = () => {
    const {getTotalItems} = useCartStore();
    const totalItem = getTotalItems();
    const router = useRouter();
    return (
        <TouchableOpacity className="cart-btn" onPress={() => router.push('/(tabs)/cart')}>
            <Image source={images.bag} className="size-5" resizeMode="contain"></Image>
            {totalItem > 0 && (
                <View className="cart-badge">
                    <Text className="text-white small-bold">{totalItem}</Text>
                </View>   
            )}
        </TouchableOpacity>
    )
}

export default CartButton