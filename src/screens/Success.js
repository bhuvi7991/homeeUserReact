import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import sucessJson from '../assets/img/64480-delivery-boy.json';

const Success = ({ navigation, route }) => {
    const data = route.params;
    console.log('data from succccess', data);
    return (
        <>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                <LottieView source={sucessJson} style={{ marginTop: -0, marginBottom: -25 }} autoSize autoPlay />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: '#6B6B6B', fontSize: 16 }}>Order ID : </Text>
                    <Text style={{ color: '#6B6B6B', fontSize: 16 }}>{data?.order_no}</Text>
                </View>
                <Text style={{ fontSize: 24, color: '#037238', fontWeight: 'bold', marginTop: 10 }}>Order successful</Text>
                <TouchableOpacity style={{ borderWidth: 1, borderColor: '#037238', width: 200, height: 50, borderRadius: 15, marginTop: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('OrderedList')}>
                    <Text style={{ color: '#037238', fontSize: 20 }}>Track your order</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: '#0FA958', width: 200, height: 50, borderRadius: 15, marginTop: 15, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('Home')}>
                    <Text style={{ color: '#fff', fontSize: 20 }}> Back to home</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Success