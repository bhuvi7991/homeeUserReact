import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useRef, useEffect } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { PrimaryGreen, HomeBgColor } from '../helper/styles.helper';
import { Oboard1, Oboard2, Oboard3, Oboard4 } from "../assets/img/Images";

const slides = [
    {
        key: 1,
        image: Oboard1,
        backgroundColor: HomeBgColor,
    },
    {
        key: 2,
        image: Oboard2,
        backgroundColor: HomeBgColor,
    },
    {
        key: 3,
        image: Oboard3,
        backgroundColor: HomeBgColor,
    },
    {
        key: 4,
        image: Oboard4,
        backgroundColor: HomeBgColor,
    }
];

export default function AppIntro({ navigation }) {
    const sliderRef = useRef(null);
    const _renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1, width: '100%' }}>
                <Image source={item.image} style={{ width: '100%', height: '100%' }} />
            </View>
        );
    }
    const _onDone = () => {
        navigation.goBack();
    }
    const _renderPagination = (activeIndex) => {
        return (
            <>
                <TouchableOpacity style={{ position: 'absolute', bottom: '16%', left: "10%", }} onPress={() => sliderRef.current?.goToSlide(slides.length - 1, true)}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontWeight: '500', fontSize: 16 }}>Skip</Text>
                </TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: 50,
                    left: 16,
                    right: 16,
                    justifyContent: 'space-between'
                }}>
                    <View style={{
                        height: 16,
                        margin: 16,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}>
                        {slides.length > 1 &&
                            slides.map((_, i) => (
                                <TouchableOpacity
                                    key={i}
                                    style={[
                                        {
                                            width: 10,
                                            height: 10,
                                            borderRadius: 5,
                                            marginHorizontal: 4,
                                        },
                                        i === activeIndex
                                            ? { backgroundColor: PrimaryGreen }
                                            : { backgroundColor: '#d5eee3' },
                                    ]}
                                    onPress={() => sliderRef.current?.goToSlide(i, true)}
                                />
                            ))}
                    </View>
                    {activeIndex == slides.length - 1 ?
                        <TouchableOpacity style={{ width: 150, backgroundColor: PrimaryGreen, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.goBack()}>
                            <Text style={{ fontFamily: 'Poppins-Medium', fontWeight: '700', color: '#fff', paddingVertical: 10, fontSize: 18 }}>Done</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity style={{ width: 150, backgroundColor: PrimaryGreen, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => sliderRef.current?.goToSlide(activeIndex + 1, true)}>
                            <Text style={{ fontFamily: 'Poppins-Medium', fontWeight: '700', color: '#fff', paddingVertical: 10, fontSize: 18 }}>Next</Text>
                        </TouchableOpacity>}
                </View>
            </>
        );
    };
    return (
        <AppIntroSlider
            data={slides}
            renderItem={_renderItem}
            // renderNextButton={_renderNextButton}
            // renderDoneButton={_renderDoneButton}
            renderPagination={_renderPagination}
            ref={sliderRef}
            onDone={_onDone}
        />
    )
}