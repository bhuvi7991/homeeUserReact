import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';
import { PrimaryGreen } from '../helper/styles.helper';

export default function PrivacyPolicy({ navigation }) {
    return (
        <>
            <WebView source={{ uri: 'http://homeefoodz.com/privacy-policy.html' }} style={{ marginBottom: 75 }} />
            <TouchableOpacity style={{ width: '100%', position: 'absolute', top: '90%', alignItems: 'center', }} onPress={() => navigation.goBack()}>
                <View style={{ width: '80%', height: 40, backgroundColor: PrimaryGreen, borderRadius: 7, justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{ fontSize: 18, color: '#fff', fontFamily: 'Poppins-Bold' }}>Back</Text>
                </View>
            </TouchableOpacity>
        </>
    )
}