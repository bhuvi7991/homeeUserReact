import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { locationIcon, timingIcon, offerIcon, photo1 } from '../assets/img/Images'


const NewSome = () => {
    return (
        <View>
            <Text style={styles.h2}>Try Somthing New</Text>
            <View style={{ flexDirection: 'row', paddingHorizontal: 10, }}>
                <View style={{ flex: 3, }}>
                    <View style={{ width: '100%', borderRadius: 5, }}>
                        <Image source={photo1} style={{ width: '100%', height: 150, borderRadius: 5, }} />
                    </View>
                </View>
                <View style={{ flex: 5, paddingLeft: 8 }}>
                    <Text style={{ fontSize: 1, fontFamily: 'Poppins-Bold' }} > Iniya Kadamban</Text>

                    <View style={styles.delLoc}>
                        <Text style={{ fontSize: 14.5, fontFamily: 'Poppins-Regular', alignItems: 'center', lineHeight: 23, justifyContent: 'center', marginLeft: 6 }} >
                            Vadapalani, Adhav Street, Melai salai, Chennai, Tamilnadu.
                        </Text>
                    </View>
                    <View style={styles.delLoc}>
                        <Image style={{ width: 18, height: 18, }} source={timingIcon} />
                        <Text style={{ fontSize: 13.5, fontFamily: 'Poppins-Bold', alignItems: 'center', justifyContent: 'center', marginLeft: 6 }}> 4.3 . 30sec . ₹ 245</Text>
                    </View>
                    <View style={styles.delLoc}>
                        <Image style={{ width: 18, height: 18, }} source={offerIcon} />
                        <Text style={{ fontSize: 14.5, fontFamily: 'Poppins-Regular', alignItems: 'center', justifyContent: 'center', marginLeft: 6 }} >Try Homely Foodz</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    delLoc: {
        flexDirection: 'row',
        marginTop: 8,
    },

    h2: {
        color: '#262626',
        fontFamily: 'Poppins-Bold',
        fontSize: 22,
        marginTop: 10,
        marginLeft: 15,
        marginBottom: 10
    },
})
export default NewSome;