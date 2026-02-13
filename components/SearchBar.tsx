import { images } from '@/constants';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
const SearchBar = () => {
    const params = useLocalSearchParams<{query?: string}>();
    const [query, setQuery] = useState(params.query ?? '');
    // const debouncedSearch = useDebouncedCallback(
    //     (text: string) => router.push(`/search?query=${text}`),
    //     500
    // );
    const handleSearch = (text: string) => {
        setQuery(text);
        if (!text.trim()) router.setParams({ query: undefined });
    };
    const handleSubmit = () => {
        const trimmedQuery = query.trim();
        if (trimmedQuery) router.setParams({ query: trimmedQuery });
    };
    return (
        <View className="searchbar">
            <TextInput
                className="flex-1 p-5"
                placeholder='Search for pizzas, burgers ...'
                value={query}
                onChangeText={handleSearch}
                onSubmitEditing={handleSubmit}
                placeholderTextColor={"#A0A0A0"}
                returnKeyType='search'>
                
            </TextInput>
            <TouchableOpacity className="pr-5" onPress={handleSubmit}>
                <Image
                    source={images.search}
                    className="size-6"
                    resizeMode='contain'
                    tintColor={"#5D5F6D"}
                ></Image>
            </TouchableOpacity>
        </View>
    )
}

export default SearchBar