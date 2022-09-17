import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { nav, switchTgl, notif, upLoad } from '../assets/img/Images'; import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';

const AddFood = ({ navigation }) => {

    const [selectedLanguage, setSelectedLanguage] = useState(
        (catFood = [
            { label: 'Football', value: 'football' },
            { label: 'Baseball', value: 'baseball' },
            { label: 'Hockey', value: 'hockey' },
        ]),
    );

    const [breakTime, setBreakTime] = useState(false)
    const [lunchTime, setLunchTime] = useState(false)
    const [dinnerTime, setDinnerTime] = useState(false)

    return (
        <ScrollView>
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
                        style={styles.dropselect}
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
                        style={styles.dropselect}
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
                        style={styles.dropselect}
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



            <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 6, justifyContent: 'space-between', padding: 5 }}>
                <View style={{ flexDirection: 'row', }}>
                    <CheckBox
                        disabled={false}
                        value={breakTime}
                        onValueChange={(newValue) => setBreakTime(newValue)}
                    />
                    <Text style={{ marginTop: 9, color: '#000', fontSize: 15, fontFamily: 'Poppins-Regular' }}>BreakFast</Text>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 10, }}>
                    <CheckBox
                        disabled={false}
                        value={lunchTime}
                        onValueChange={(newValue) => setLunchTime(newValue)}
                    />
                    <Text style={{ marginTop: 9, color: '#000', fontSize: 15, fontFamily: 'Poppins-Regular' }}>Lunch</Text>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 10, }}>
                    <CheckBox
                        disabled={false}
                        value={dinnerTime}
                        onValueChange={(newValue) => setDinnerTime(newValue)}
                    />
                    <Text style={{ marginTop: 9, color: '#000', fontSize: 15, fontFamily: 'Poppins-Regular' }}>Dinner</Text>
                </View>
            </View>


            <View style={{ paddingVertical: 15, paddingHorizontal: 15 }}>
                <TouchableOpacity onPress={() => { cameraHandle() }} style={{ width: '100%', backgroundColor: '#c6edd5', borderRadius: 10, justifyContent: 'center', alignItems: 'center', height: 150 }}>
                    <Image source={upLoad} style={{ width: 65, height: 65, tintColor: '#7ace9c', marginBottom: 10 }}
                    />
                    <Text style={styles.labelimg}>Import Food image</Text>
                </TouchableOpacity>
            </View>

            <Pressable style={{
                alignItems: 'center',
                paddingHorizontal: 15,
            }}>

                <Text style={styles.buttonStyle}>Proceed</Text>
            </Pressable>

        </ScrollView>
    );
};


const styles = StyleSheet.create({

    labelTxt: {
        fontSize: 17,
        fontFamily: 'Poppins-Bold',
        color: '#09b44d',
        marginBottom: 0,
        paddingBottom: 0,
    },
    labelimg: {
        fontSize: 17,
        fontFamily: 'Poppins-Regular',
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
    dropselect: {
        height: 45,
        width: '100%',
        fontFamily: 'Poppins-Bold',
        marginLeft: -15,
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
    labelimg: {
        fontSize: 17,
        fontFamily: 'Poppins-Regular',
        color: '#09b44d',
        marginBottom: 0,
        paddingBottom: 0,
    },

    //

    buttonStyle: {
        textAlign: 'center',
        height: 50,
        marginTop: 40,
        backgroundColor: '#09b44d',
        borderRadius: 50,
        fontFamily: 'Poppins-Bold',
        width: '95%',
        paddingTop: 12,
        fontSize: 16,
        color: '#fff'
    },
})

export default AddFood;
