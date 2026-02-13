import CartButton from "@/components/CartButton";
import { images, offers } from "@/constants";
import useAuthStore from "@/store/auth.store";
import cn from 'clsx';
import { router } from "expo-router";
import { Fragment } from "react";
import { FlatList, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OFFER_QUERY_BY_TITLE: Record<string, string | undefined> = {
  "SUMMER COMBO": undefined,
  "BURGER BASH": "burger",
  "PIZZA PARTY": "pizza",
  "BURRITO DELIGHT": "burrito",
};

export default function Home() {
  const {user} = useAuthStore();
  console.log("USER:", JSON.stringify(user, null, 2));
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={offers}
        renderItem={({item, index}) => {
          const isEven = index % 2 === 0;
          const query = OFFER_QUERY_BY_TITLE[item.title];
          return (
            <View>
              <Pressable
                className={cn("offer-card", isEven ? 'flex-row-reverse' : 'flex-row')}
                style={{backgroundColor: item.color}}
                android_ripple={{color: "#fffff22"}}
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/search",
                    params: query ? { query } : {},
                  })
                }
              >
                {({pressed}) => (
                  <Fragment>
                    <View className="w-1/2 h-full">
                      <Image source={item.image} className="size-full" resizeMode="contain"></Image>
                    </View>
                    <View className={cn("offer-card__info", isEven ? 'pl-10' : "pr-10")}>
                      <Text className="leading-tight text-white h1-bold">
                        {item.title}
                      </Text>
                      <Image
                      source={images.arrowRight} 
                      className="size-10"
                      resizeMode="contain"
                      tintColor={"#ffffff"}></Image>
                    </View>
                  </Fragment>
                )}
              </Pressable>
            </View>
          )
        }}
        contentContainerClassName="pb-28 px-5"
        ListHeaderComponent={() => (
          <View className="flex-row px-5 my-5 w-full flex-between">
            <View className="flex-start">
              <Text className="small-bold text-primary">DELIVER TO</Text>
              <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
                <Text className="paragraph-bold text-dark-100">Banana</Text>
                <Image source={images.arrowDown} className="size-3" resizeMode="contain"></Image>
              </TouchableOpacity>
            </View>
            <CartButton></CartButton>
          </View>
        )}
      ></FlatList>
    </SafeAreaView>
  );
}
