import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image, focus, blur, ImageBackground, TouchableOpacity, Button } from 'react-native';
import * as api from '../components/api';
import { FloatingLabelInput } from 'react-native-floating-label-input';

import { backImg, mobileIcon, inputBorder } from '../assets/img/Images'

import Otp from './Otp';

const LogIn = ({ navigation }) => {

    const [MobileNo, setMobileNo] = useState('')

    const MobileNoLegnth = 10;

    const onProceed = async () => {
        let data = await api.login({
            mobile: MobileNo
        });

        if (data?.user) {
            navigation.navigate('Otp');
            if (data?.user?.otp?.length > 0) {
                alert(`Your OTP is : ${data.user.otp}.\n App in Debug Mode.\nNeed to remove otp key in production mode and this alert will also disabled`)
            }
        }
    }
    const mobileNoChange = (e) => {
        setMobileNo(e)
    }

    return (
        <View style={styles.container}><StatusBar hidden />
            <ImageBackground source={backImg} style={styles.backgroundImg}>
                <View style={{
                    flex: 2, color: '#fff', justifyContent: 'center', alignContent: 'center',
                    padding: 20,
                }} >
                    <Text style={styles.font1} > Welcome Back</Text>
                    <Text style={styles.font4}>Sign into continue</Text>
                    <TextInput style={{ width: 500, height: 40, borderColor: '#fff', borderWidth: 1.5 }} value={'ee'} placeholder={'sdf'} keyboardType='numeric' />
                </View>
                <View style={{ flex: 3, paddingHorizontal: 25, }}>
                    <ImageBackground source={inputBorder} style={styles.inputBorder}>
                        <Text>Mobile No</Text>
                        <TextInput
                            value={'MobileNo'}
                            keyboardType='numeric'
                            maxLength={MobileNoLegnth}
                            onChangeText={mobileNoChange}
                        />

                        {/* <FloatingLabelInput
                            label={'Mobile No'}
                            staticLabel
                            leftComponent={
                                <Image
                                    style={{ height: 22, width: 13 }}
                                    source={mobileIcon} />
                            }
                            containerStyles={{
                                borderWidth: 1,
                                paddingHorizontal: 10,
                                borderColor: 'rgba(255,255,255, .7)',
                                borderRadius: 30,
                                height: 53,
                            }}
                            customLabelStyles={{
                                colorFocused: '#fff',
                                fontSizeFocused: 12,
                                left: 5,
                                fontSize: 15,
                            }}
                            labelStyles={{
                                backgroundColor: '#277849',
                                paddingHorizontal: 10,
                                marginLeft: 18,
                                fontSize: 25,
                                color: '#fff',
                            }}
                            inputStyles={{
                                paddingHorizontal: 10,
                            }}
                            value={MobileNo}
                            keyboardType='numeric'
                            maxLength={MobileNoLegnth}
                            onChangeText={mobileNoChange}
                        /> */}
                    </ImageBackground>

                    <Pressable onPress={onProceed} style={{ alignItems: 'center' }}>
                        <Text style={styles.buttonStyle}>Proceed</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    backgroundImg: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    font1: {
        color: '#fff',
        fontFamily: 'Poppins-Bold',
        fontSize: 27,
        opacity: 0.7,
    },
    font4: {
        color: '#fff',
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        opacity: 0.7,
    },
    input: {
        height: 46,
        margin: 12,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    buttonStyle: {
        textAlign: 'center',
        height: 46,
        marginTop: 40,
        backgroundColor: '#fff',
        borderRadius: 50,
        fontFamily: 'Poppins-Bold',
        width: 200,
        paddingTop: 12,
        fontSize: 16,
    },
    inputBorder: {
        width: '100%',
        height: 58,
    }
})

export default LogIn;