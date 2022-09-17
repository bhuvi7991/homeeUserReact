import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Pressable, ScrollView, Button } from 'react-native';
import { arrow, referImg, fbIcon, lninIcon, instaIcon, twtrIcon, shareIcon } from '../assets/img/Images';
import LinearGradient from 'react-native-linear-gradient';



const ReferEarn = ({ navigation }) => {
    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <View
                style={{
                    height: 65,
                    backgroundColor: '#09b44d',
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 3,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{
                                paddingHorizontal: 15,
                                paddingVertical: 15,
                            }}>
                            <Image style={{ width: 13, height: 22 }} source={arrow} />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={[styles.pageTitle, { alignItems: 'center' }]}>
                                Refer and Earn
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Image style={{ width: 250, height: 162, marginTop: 25 }} source={referImg} />
                <Text style={{ marginTop: 25, fontSize: 18, fontFamily: 'Poppins-Bold', }}>Your Referral Code</Text>
                <LinearGradient
                    colors={['#6bbe45', '#329144']}
                    style={{ padding: 2.2, marginTop: 10 }}
                >
                    <Text style={{ fontSize: 16, width: 180, fontSize: 19, backgroundColor: '#fff', padding: 8, fontFamily: 'Poppins-Bold', textAlign: 'center' }}>9097786978</Text>
                </LinearGradient>
                <View style={{ paddingHorizontal: 30, paddingVertical: 20 }}>
                    <Text style={{ fontSize: 16, fontSize: 16, backgroundColor: '#fff', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 22, marginBottom: 9 }}> Commodo et minim voluptate magna eiusmod ut pariatur. Commodo et minim voluptate magna eiusmod ut pariatur.</Text>
                    <Text style={{ fontSize: 16, fontSize: 16, backgroundColor: '#fff', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 22, marginBottom: 6 }}> Commodo et minim voluptate magna eiusmod ut pariatur.</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={fbIcon} style={{ width: 42, height: 42, marginHorizontal: 7 }} />
                    <Image source={lninIcon} style={{ width: 42, height: 42, marginHorizontal: 7 }} />
                    <Image source={instaIcon} style={{ width: 42, height: 42, marginHorizontal: 7 }} />
                    <Image source={twtrIcon} style={{ width: 42, height: 42, marginHorizontal: 7 }} />
                </View>

                <View style={{ borderColor: '#e3e3e3', marginTop: 15, width: '95%', borderWidth: 1, borderBottomWidth: 0 }}>
                    <View style={{ justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#09b44d', flexDirection: 'row' }}>

                        <Text style={[styles.thName, { width: 117, }]}>Referral Name</Text>

                        <Text style={[styles.thName, { borderLeftColor: '#e3e3e3', borderLeftWidth: 1, width: 60, }]}>Order</Text>

                        <Text style={[styles.thName, { borderLeftColor: '#e3e3e3', borderLeftWidth: 1, width: 75, }]}>Amount</Text>

                        <Text style={[styles.thName, { borderLeftColor: '#e3e3e3', borderLeftWidth: 1, width: 98, }]}></Text>

                    </View>

                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderBottomColor: '#e3e3e3', borderBottomWidth: 1 }}>
                        <Text style={[styles.tdName, { width: 117, }]}>Anuraj</Text>
                        <Text style={[styles.tdName, { borderLeftColor: '#e3e3e3', borderLeftWidth: 1, width: 60, }]}>3</Text>

                        <Text style={[styles.tdName, { borderLeftColor: '#e3e3e3', borderLeftWidth: 1, width: 75, }]}>23</Text>

                        <TouchableOpacity style={{ borderLeftColor: '#e3e3e3', borderLeftWidth: 1, width: 98, padding: 6 }}>
                            <Text style={{ backgroundColor: '#09b44d', textAlign: 'center', fontFamily: 'Poppins-Bold', padding: 8, color: '#fff', borderRadius: 20 }}>Request</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderBottomColor: '#e3e3e3', borderBottomWidth: 1 }}>
                        <Text style={[styles.tdName, { width: 117, }]}>Ragav Niraj</Text>
                        <Text style={[styles.tdName, { borderLeftColor: '#e3e3e3', borderLeftWidth: 1, width: 60, }]}>4</Text>

                        <Text style={[styles.tdName, { borderLeftColor: '#e3e3e3', borderLeftWidth: 1, width: 75, }]}>54</Text>

                        <TouchableOpacity style={{ borderLeftColor: '#e3e3e3', borderLeftWidth: 1, width: 98, padding: 6 }}>
                            <Text style={{ backgroundColor: '#09b44d', textAlign: 'center', fontFamily: 'Poppins-Bold', padding: 8, color: '#fff', borderRadius: 20 }}>Request</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ backgroundColor: '#09b44d', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 25, marginTop: 25 }}>
                            <Image source={shareIcon} style={{ width: 25, height: 25, tintColor: '#fff' }} />
                            <Text style={{ color: '#fff', fontFamily: 'Poppins-Bold', paddingVertical: 8, paddingHorizontal: 15, fontSize: 18, borderRadius: 20 }}>Referer Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    pageTitle: {
        color: '#fff',
        fontSize: 21,
        fontFamily: 'Poppins-Bold',
        marginTop: 14,
    },
    nameTxt: {
        color: '#fff',
        fontSize: 25,
        color: '#fff',
        marginVertical: 2,
        fontFamily: 'Poppins-Bold',
    },
    thName: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        paddingVertical: 10
    },
    tdName: {
        color: '#000',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        paddingVertical: 10
    },
    tdData: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
    },
})

export default ReferEarn;
