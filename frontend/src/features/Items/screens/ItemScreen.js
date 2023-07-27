import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
export default ItemScreen = () => {
    return (
        <>
            <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
                <View style={{ padding: 16, backgroundColor: 'green' }}>
                    <Searchbar placeholder='Search' />
                </View>
                <View style={{ flex: 1, padding: 16, backgroundColor: 'blue' }}>
                    <Text>list</Text>
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    search: {
        width: 300,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
    },
});
