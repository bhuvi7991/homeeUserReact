import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import { TextInput, View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';

import { arrow, } from '../assets/img/Images';

const UpiId = () => {
    return (
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#09b44d',
                    height: 70,
                    borderBottomLeftRadius: 25, borderBottomRightRadius: 25,
                }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        paddingHorizontal: 15,
                        paddingVertical: 15,
                    }}>
                    <Image style={{ width: 13, height: 22 }} source={arrow} />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>
                    Add New UPI Id
                </Text>
            </View>
            <View style={{ padding: 15 }}>
                <TextInput value="" placeholder="Enter Your UPI ID" style={{ borderColor: '#d5d5d5', borderBottomWidth: 1, borderStyle: 'dashed', fontFamily: 'Poppins-Bold', fontSize: 16, paddingBottom: 5 }} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CheckBox />
                    <Text style={{ fontFamily: 'Poppins-Regular' }}>Securly VPA</Text>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 15, }}>
                    <TouchableOpacity style={{}}><Text style={{ color: '#fff', backgroundColor: '#09b44d', width: 200, borderRadius: 28, padding: 13, fontFamily: 'Poppins-Bold', textAlign: 'center', fontSize: 16 }}>Verify Any Pay</Text></TouchableOpacity>
                </View>
                <View>
                    <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 18, marginTop: 10 }}>How UPI Works?</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15.5, marginTop: 10, lineHeight: 22 }}>A few people have suggested using the library, which now seems to be unmaintained and requires third party dependencies</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15.5, marginTop: 10, lineHeight: 22 }}>A few people have suggested using the library, which now seems to be unmaintained and requires third party dependencies</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15.5, marginTop: 10, lineHeight: 22 }}>A few people have suggested using the library, which now seems to be unmaintained and requires third party dependencies</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    pageTitle: {
        color: '#fff',
        fontSize: 21,
        fontFamily: 'Poppins-Bold',
    },
})

export default UpiId;