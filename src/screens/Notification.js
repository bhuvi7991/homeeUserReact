import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { locatIcon, arrow, logOutICon, wishListIcon, languageIcon, paymentIcon, walletIcon, orderIcon, supportIcon, privacyIcon } from '../assets/img/Images';
import { useTranslation } from 'react-i18next';

const Notification = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const [vegCheckBox, setVegCheckBox] = useState(false)
    const [nonVegCheckBox, setNonVegCheckBox] = useState(false)
    return (
        <ScrollView>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#09b44d',
                    height: 70,
                    borderBottomLeftRadius: 25, borderBottomRightRadius: 25,
                }}>
                <TouchableOpacity style={{ paddingHorizontal: 15 }}>
                    <Image style={{ width: 13, height: 22, }} source={arrow} />
                </TouchableOpacity>

                <Text style={[styles.pageTitle, { alignItems: 'center' }]}>
                    {t("notificationPage.notification")}
                </Text>
            </View>
            <View style={{ marginTop: 10 }}>
                <View style={{ marginVertical: 5, marginHorizontal: 20 }}>
                    <View style={{ padding: 15, backgroundColor: '#d6e5de', borderRadius: 8 }}>
                        <Text style={{ fontFamily: 'Poppins-Regular', lineHeight: 23, }}>Controlled component, which means the native value will be forced to match this value prop if provided. For most uses, this works great, but in some cases this may cause flickering - one common cause is preventing edits by keeping value the same.</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 13 }}>
                            <Text style={{ fontFamily: 'Poppins-Regular' }}>16/09/2020</Text>
                            <Text style={{ fontFamily: 'Poppins-Regular' }}>16/09/2020</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginVertical: 5, marginHorizontal: 20 }}>
                    <View style={{ padding: 15, backgroundColor: '#d6e5de', borderRadius: 8 }}>
                        <Text style={{ fontFamily: 'Poppins-Regular', lineHeight: 23, }}>Controlled component, which means the native value will be forced to match this value prop if provided. For most uses, this works great, but in some cases this may cause flickering - one common cause is preventing edits by keeping value the same.</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 13 }}>
                            <Text style={{ fontFamily: 'Poppins-Regular' }}>16/09/2020</Text>
                            <Text style={{ fontFamily: 'Poppins-Regular' }}>16/09/2020</Text>
                        </View>
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
    },
})

export default Notification;
