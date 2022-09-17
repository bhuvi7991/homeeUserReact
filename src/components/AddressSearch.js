import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { locatIcon, notification } from '../assets/img/Images'

const AddressSearch = ({ navigation }) => {
    return (
        <View style={{ flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 10, justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Image source={locatIcon} style={{ width: 20, height: 30, }} />
                    <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 25, marginLeft: 8, marginTop: 5 }} >Valasa Nagar</Text>
                </View>
                <View>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, }} >Valasa Nagar, Mangadu, Chennai, Tamil Nadu</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.reset('Details')} >
                <Image source={notification} style={{ width: 26, height: 31 }} />
            </TouchableOpacity>
        </View>
    );
};



export default AddressSearch;