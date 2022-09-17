import React, { useState, useEffect, useRef } from 'react';
import {
    StatusBar,
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
    ImageBackground,
    TouchableOpacity,
    Image,
    Modal,
    Dimensions,
} from 'react-native';
import { backImg, loaderIcon, arrow, reload } from '../assets/img/Images';
import Loader from './Loader';
import axios from 'axios';
import { api, storage } from '../services/index';
import { useDispatch } from 'react-redux';
import { set_Profile } from '../redux/actions/authAction';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryGreen, SecondaryGreen } from '../helper/styles.helper';
import RNOtpVerify from 'react-native-otp-verify';

var { width, height } = Dimensions.get('window');

// getHash = () =>
//     RNOtpVerify.getHash()
//     .then(console.log)
//     .catch(console.log);

// startListeningForOtp = () =>
//     RNOtpVerify.getOtp()
//     .then(p => RNOtpVerify.addListener(this.otpHandler))
//     .catch(p => console.log(p));

// otpHandler = (message) => {
//     const otp = /(\d{4})/g.exec(message)[1];
//     this.setState({ otp });
// }

// componentWillUnmount() {
//     RNOtpVerify.removeListener();
// }

const Otp = ({ navigation, route }) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    let otpInput = useRef(null);
    const lengthOtp = 4;
    var clockCall;
    const { params: { user: { id = 0, mobile = 0 } = {} } = {} } = route;
    const defaultCountdown = 90;
    const [otpValue, setOtpValue] = useState('');
    const [countDown, setCountDown] = useState(defaultCountdown);
    const [enableResend, setEnableResend] = useState(false);
    const [modal, setModal] = useState(false);
    // useEffect(() => {
    //     setOtpValue(2078)
    //     otpHandler()
    // }, [])

    // const getHash = async () => {
    //     const rn = await RNOtpVerify.getHash();
    //     console.log("afeneivesvsd", rn);
    //     otpHandler2(rn);
    //     // .then(i => { console.log("otp:", i); otpHandler2(i[0]) })
    //     // .catch(it => console.log("errrrr", it));
    // }
    // const startListeningForOtp = () =>
    //     RNOtpVerify.getOtp()
    //         .then(p =>
    //             // console.log("scasaccs", p))
    //             RNOtpVerify.addListener(otpHandler2))
    //         .catch(p => console.log("jivmsivvv", p));

    // const otpHandler2 = (message) => {
    //     if (message) {
    //         console.log("nudvudsuysgc kvjds", message);
    //         const otp = /(\d{4})/g.exec(message)[1];
    //         console.log("csvnvbdsvndskv sjvmewjviovneviosmv sdvmdskvgmsk ioev dsvqn viusd", otp);
    //         // this.setState({ otp });
    //     }
    // }

    // useEffect(() => {
    //     getHash();
    //     startListeningForOtp();
    //     // otpHandler2();
    //     return RNOtpVerify.removeListener();
    // }, []);


    const otpHandler = async () => {
        setModal(true);
        let data = await api.verify({
            user_id: id,
            mobile: mobile,
            otp: parseInt(otpValue),
        });
        console.log("dataaaaaaaaaaaaaa from verify", data);
        if (data?.user?.id) {
            //axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
            if (data?.registered_status) {
                storage.setToken(data.token);
                storage.setUserData(data.user);
                storage.setIsOldUser("TRUE");
                dispatch(set_Profile(data.user));
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
                navigation.navigate('Home', { user: data.user });
            } else {
                navigation.navigate('SignUp', { user: data.user });
            }
        }
        // console.log(data?.user);
        //alert(data?.token)
        // console.log(data?.token)
        setModal(false);
    };

    const onChangeText = val => {
        setOtpValue(val);
    };

    useEffect(() => {
        otpInput.focus();
    }, []);

    useEffect(() => {
        clockCall = setInterval(() => {
            decrementClock();
        }, 1000);
        return () => {
            clearInterval(clockCall);
        };
    });

    const decrementClock = () => {
        if (countDown === 0) {
            setEnableResend(true);
            setCountDown(0);
            clearInterval(clockCall);
        } else {
            setCountDown(countDown - 1);
        }
    };
    const resent_otp = async () => {
        let data = await api.login({
            mobile: mobile,
            user_language_id: route.params.user.selected_language_id,
        });
        if (data.status == 'success') {
            setOtpValue('');
            // alert(
            //   `Your OTP is : ${data.user.otp}.\n App in Debug Mode.\nNeed to remove otp key in production mode and this alert will also disabled`,
            // );
        }
    };
    const onResendOtp = () => {
        if (enableResend) {
            resent_otp();
            setEnableResend(false);
            setCountDown(defaultCountdown);
            clearInterval(clockCall);
            clockCall = setInterval(() => {
                decrementClock();
            }, 1000);
            // navigation.navigate('Otp', { user: data.user });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            {/* <ImageBackground source={backImg} style={styles.backgroundImg}> */}
            <KeyboardAvoidingView style={styles.containerAvoidngView}>
                <View
                    style={{
                        flex: 1,
                        color: '#fff',
                        padding: 10,
                    }}>
                    <View style={styles.headerStyle}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                            <Image style={{ width: 11, height: 18, tintColor: '#000' }} source={arrow} />
                            <Text style={styles.headerText}>{t('otpPage.back')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        // flex: 2,
                        color: '#fff',
                        justifyContent: 'center',
                        alignContent: 'center',
                        padding: 20,
                        marginTop: '-15%'
                    }}>
                    <Text style={styles.font1}>{t('otpPage.verifyYourMobileNo')} </Text>
                    <Text style={styles.font4}>{t('otpPage.enterYourOtpHere')}</Text>
                </View>

                <View style={{ marginTop: '35%', flex: 3, paddingHorizontal: 2, alignContent: 'center' }}>
                    <View>
                        <TextInput
                            ref={input => (otpInput = input)}
                            value={otpValue}
                            onChangeText={onChangeText}
                            style={styles.textInputOtp}
                            maxLength={lengthOtp}
                            returnKeyType="done"
                            keyboardType="numeric"
                            onSubmitEditing={otpHandler}
                        />
                        <View style={styles.containerInput}>
                            {Array(lengthOtp)
                                .fill()
                                .map((data, index) => (
                                    <View
                                        key={index}
                                        style={[
                                            styles.cellView,
                                            {
                                                borderBottomColor:
                                                    index === otpValue.length ? '#78bf94' : '#c5c5c5',
                                            },
                                            { marginTop: index === otpValue.length ? 7 : 0 },
                                        ]}>
                                        <Text
                                            style={styles.cellText}
                                            onPress={() => otpInput.focus()}>
                                            {otpValue && otpValue.length > 0 ? otpValue[index] : ''}
                                        </Text>
                                    </View>
                                ))}
                        </View>
                    </View>
                    <Pressable
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={onResendOtp}>
                        <Text
                            style={[
                                styles.resentOtp,
                                { color: enableResend ? '#000' : 'gray' },
                            ]}>
                            {t('otpPage.resendOtp')} ({countDown})
                        </Text>
                        {enableResend && (
                            <Image source={reload} style={[styles.loaderOtp]} />
                        )}
                    </Pressable>
                    <Pressable onPress={otpHandler}
                        style={{
                            marginTop: height - 550,
                            backgroundColor: PrimaryGreen,
                            width: "90%",
                            height: 50,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center'
                        }}>
                        <Text style={styles.buttonStyle}>{t('otpPage.proceed')}</Text>
                    </Pressable>

                </View>
            </KeyboardAvoidingView>
            {/* </ImageBackground> */}
            <View>
                {modal && (
                    <Modal transparent={true}>
                        <Loader />
                    </Modal>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SecondaryGreen
    },
    containerAvoidngView: {
        flex: 1,
        padding: 10,
    },
    containerInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    font6: {
        color: '#fff',
        fontFamily: 'Poppins-Regular',
        fontSize: 10,
        opacity: 0.7,
    },
    headerStyle: {
        flexDirection: 'row',
    },
    headerText: {
        fontSize: 20,
        color: '#000',
        fontFamily: 'Poppins-Bold',
        marginTop: -25,
        marginLeft: 25,
    },
    cellView: {
        paddingVertical: 1,
        width: 50,
        marginHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1.5,
    },
    cellText: {
        textAlign: 'center',
        fontSize: 21,
        color: PrimaryGreen,
        fontFamily: 'Poppins-Bold',
        width: 60,
        height: 33,
    },
    backgroundImg: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    font1: {
        color: '#000',
        fontFamily: 'Poppins-Bold',
        fontSize: 27,
    },
    font4: {
        color: '#000',
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        marginLeft: 7,
        marginTop: 7,
    },
    resentOtp: {
        color: '#fff',
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 17,
    },
    buttonStyle: {
        fontSize: width * 0.04,
        color: '#fff',
        fontFamily: 'Poppins-Bold',
    },
    textInputOtp: {
        width: 300,
        height: 50,
        position: 'absolute',
        opacity: 0,
        top: -3,
        left: 50,
        fontSize: 22,
        fontFamily: 'Poppins-Bold',
        zIndex: 5,
    },
    loaderOtp: {
        width: 15,
        height: 15,
        marginTop: 10,
        marginLeft: 10,
    },
});

export default Otp;
