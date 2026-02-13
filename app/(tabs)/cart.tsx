import CartItem from '@/components/CartItem'
import CustomButton from '@/components/CustomButton'
import CustomHeader from '@/components/CustomHeader'
import { useCartStore } from '@/store/cart.store'
import { PaymentInfoStripeProps } from '@/type'
import cn from 'clsx'
import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const PaymentInfoStripe = ({ label,  value,  labelStyle,  valueStyle, }: PaymentInfoStripeProps) => (
    <View className="flex-row my-1 flex-between">
        <Text className={cn("text-gray-200 paragraph-medium", labelStyle)}>
            {label}
        </Text>
        <Text className={cn("paragraph-bold text-dark-100", valueStyle)}>
            {value}
        </Text>
    </View>
);
const cart = () => {
    const {items, getTotalItems, getTotalPrice} = useCartStore();
    const totalItems = getTotalItems();
    const totalPrice = getTotalPrice();
    return (
    <SafeAreaView className="h-full bg-white">
      <FlatList 
      data={items} 
      renderItem={({item}) => <CartItem item={item}></CartItem>}
      keyExtractor={(item) => item.id}
      contentContainerClassName="pb-28 px-5 pt-5"
      ListHeaderComponent={() => <CustomHeader title="Your Cart"></CustomHeader>}
      ListEmptyComponent={() => <Text>Cart Empty</Text>}
      ListFooterComponent={() => totalItems > 0 && (
        <View className="gap-5">
            <View className="p-5 mt-6 rounded-2xl border border-gray-200">
                <Text className="mb-5 h3-bold text-dark-100">
                    Payment Summary
                </Text>
                <PaymentInfoStripe
                label={`Total Item (${totalItems})`}
                value={`$${totalPrice.toFixed(2)}`}></PaymentInfoStripe>
                <PaymentInfoStripe
                label={`Delivery Fee`}
                value={`$5.00`}></PaymentInfoStripe>
                <PaymentInfoStripe
                label={`Discount`}
                value={`- $0.50`}
                valueStyle='!text-success'></PaymentInfoStripe>
                <View className="my-2 border-t border-gray-300"></View>
                <PaymentInfoStripe
                label={`Total`}
                value={`$${(totalPrice + 5 - 0.5).toFixed(2)}`}
                labelStyle='base-bold !text-dark-100'
                valueStyle='base-bold !text-dark-100 !text-right'></PaymentInfoStripe>
            </View>
            <CustomButton title="Order Now"></CustomButton>
        </View>
      )}>
        
      </FlatList>
    </SafeAreaView>
  )
}

export default cart