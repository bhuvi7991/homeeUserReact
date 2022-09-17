import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { nav, switchTgl, notif } from '../assets/img/Images';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';

const AddFood = ({ navigation }) => {
    const [selectedLanguage, setSelectedLanguage] = useState(
        (catFood = [
            { label: 'Football', value: 'football' },
            { label: 'Baseball', value: 'baseball' },
            { label: 'Hockey', value: 'hockey' },
        ]),
    );
    // const [toggleCheckBox, setToggleCheckBox] = useState(
    //   (data = [
    //     {label: 'Football', value: 'football'},
    //     {label: 'Baseball', value: 'baseball'},
    //     {label: 'Hockey', value: 'hockey'},
    //   ]),
    // );

    const [timingFood, setTimingFood] = useState([]);
    //const [selecttimingFood, setSelectTimingFood] = useState([]);

    const clickFood = ind => {
        var arr = timingFood;
        if (timingFood.includes.index) {
            arr = arr.splice(arr.indexOf(ind), 0);
        } else {
            arr.push(ind);
        }
        setTimingFood(arr);
    };

    return (
        <View style={{ flexDirection: 'column' }}>
            <View style={styles.checkBox}>
                {selectedLanguage.map((item, key) => {
                    return (
                        <TouchableOpacity key={key} onPress={() => clickFood(key)}>
                            <CheckBox
                                onValueChange={() => clickFood(key)}
                                value={timingFood.includes(key)}
                            />
                            <Text style={styles.checkLabel}>Break Fast</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <View
                style={{
                    height: 55,
                    backgroundColor: '#09b44d',
                }}>
                <View
                    style={{
                        padding: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                            onPress={() => navigation.toggleDrawer()}
                            style={{
                                paddingHorizontal: 15,
                                paddingVertical: 15,
                            }}>
                            <Image style={{ width: 28, height: 20 }} source={nav} />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={[styles.pageTitle, { alignItems: 'center' }]}>
                                Homee Foodz
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}>
                        <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                            <Image source={switchTgl} style={{ width: 38, height: 22 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ paddingRight: 20, paddingLeft: 10 }}>
                            <Image source={notif} style={{ width: 22, height: 26 }} />
                            <Text style={styles.notifCnt}>25</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View
                style={{
                    paddingHorizontal: 15,
                    marginTop: 10,
                    justifyContent: 'center',
                }}>
                <View style={styles.inputBox}>
                    <Text style={styles.labelTxt}>Food Categories</Text>
                    <Picker
                        style={{
                            height: 30,
                            width: '100%',
                            fontFamily: 'Poppins-Bold',
                        }}
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedLanguage(itemValue)
                        }>
                        {catFood.map((item, index) => {
                            return (
                                <Picker.Item
                                    key={index}
                                    label={item.label}
                                    value={item.value}
                                />
                            );
                        })}
                    </Picker>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.labelTxt}>Cusion Type</Text>
                    <Picker
                        style={{
                            height: 30,
                            width: '100%',
                            fontFamily: 'Poppins-Bold',
                        }}
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedLanguage(itemValue)
                        }>
                        {catFood.map((item, index) => {
                            return (
                                <Picker.Item
                                    key={index}
                                    label={item.label}
                                    value={item.value}
                                />
                            );
                        })}
                    </Picker>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.labelTxt}>Food Name</Text>
                    <Picker
                        style={{
                            height: 30,
                            width: '100%',
                            fontFamily: 'Poppins-Bold',
                        }}
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedLanguage(itemValue)
                        }>
                        {catFood.map((item, index) => {
                            return (
                                <Picker.Item
                                    key={index}
                                    label={item.label}
                                    value={item.value}
                                />
                            );
                        })}
                    </Picker>
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
        marginTop: 12,
    },
    nameTxt: {
        color: '#fff',
        fontSize: 25,
        color: '#fff',
        marginVertical: 2,
        fontFamily: 'Poppins-Bold',
    },
    profTxt: {
        color: '#fff',
        fontSize: 18,
        color: '#fff',
        fontFamily: 'Poppins-Bold',
        paddingVertical: 3,
    },
    notifCnt: {
        position: 'absolute',
        top: 0,
        right: 7,
        backgroundColor: '#09b44d',
        borderColor: '#fff',
        borderWidth: 1.7,
        borderRadius: 25,
        height: 20,
        width: 22,
        color: '#fff',
        textAlign: 'center',
        fontSize: 9,
        paddingTop: 4,
        fontFamily: 'Poppins-Bold',
    },
    labelTxt: {
        fontSize: 17,
        fontFamily: 'Poppins-Bold',
        color: '#09b44d',
        marginBottom: 0,
        paddingBottom: 0,
    },
    picker: {
        fontSize: 23,
        fontFamily: 'Poppins-Regular',
        color: '#000',
        backgroundColor: '#000',
        borderColor: '#c5c5c5',
        borderWidth: 1,
    },
    inputBox: {
        fontSize: 21,
        fontFamily: 'Poppins-Regular',
        color: '#000',
        borderBottomColor: '#a3d8b8',
        borderBottomWidth: 0.7,
        marginBottom: 10,
        marginTop: 15,
    },
    checkBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    checkLabel: {
        color: '#000',
        fontFamily: 'Poppins-Bold',
        fontSize: 15,
    },
});

export default AddFood;
