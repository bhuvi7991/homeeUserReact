/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, useRef } from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ImageBackground,
    Dimensions,
    Modal,
    SafeAreaView,
    BackHandler,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {
    locatIcon,
    notification,
    timingIcon,
    offerIcon,
    photo1,
    distanceIcon,
    tagIcon,
} from '../assets/img/Images';
import { api, storage } from '../services/index';
import { useSelector } from 'react-redux';
import Loader from './Loader';
import { FlatList } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/core';
import { HomeBgColor, PrimaryGreen, SecondaryGreen } from '../helper/styles.helper';
import starSelect from '../assets/img/star_select.png';
import starUnSelect from '../assets/img/star_unselect.png';
import footerImage1 from '../assets/img/footerImage1.png';
import LinearGradient from 'react-native-linear-gradient';
import offerHorn from '../assets/img/offer_icon.png';
import location_bar_icon from '../assets/img/location_bar_icon.png';
import offerIcon2 from '../assets/img/offer_icon2.png';
import { LinearTextGradient } from "react-native-text-gradient";
import Shimmer from 'react-native-shimmer';

const offersBg1 = require('../assets/img/offers/bg1.png');
const offersBg2 = require('../assets/img/offers/bg2.png');
const offersBg3 = require('../assets/img/offers/bg3.png');
const offersBg4 = require('../assets/img/offers/bg4.png');
const offersBg5 = require('../assets/img/offers/bg5.png');

const BannerCarouselImg = Dimensions.get('window').width;

const HomeNew = ({ navigation, route }) => {
    const { t, i18n } = useTranslation();
    const [user, setUser] = useState(null);
    const [modal, setModal] = useState(false);
    const [banner, setBanner] = useState([]);
    const [top_new_cooks, setTop_new_cooks] = useState([]);
    const [popular_foods, setPopular_foods] = useState([]);
    const [cook_offers, setCook_offers] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const [food_types, setFood_types] = useState([]);
    const [nearby_cooks, setNearby_cooks] = useState([]);
    const [cookDetail, setCookDetail] = useState([]);
    const [top_rated_cooks, setTop_rated_cooks] = useState([]);
    const [happyIndex, setHappyIndex] = useState(0);
    const eatHappyRef = useRef();

    // useEffect(() => {
    //     // console.log('data1', top_new_cooks);
    //     // console.log('data2', popular_foods);
    //     // console.log('data3', cook_offers);
    //     // console.log('data4', coupons);
    //     // console.log('data5', food_types);
    //     // console.log('data6', nearby_cooks);
    //     // console.log('data7', cookDetail);
    //     // console.log('data8', top_rated_cooks);
    // }, [cookDetail, cook_offers, coupons, food_types, nearby_cooks, popular_foods, top_new_cooks, top_rated_cooks])

    // console.log("nearby_cooks", top_new_cooks);

    var { width, height } = Dimensions.get('window');

    const offersBgArr = [{
        offerPercent: 70,
        color: '#ac1818',
        order: 1,
        image: offersBg1,
        name: "Biryani"
    }, {
        offerPercent: 30,
        color: '#ad810e',
        order: 2,
        image: offersBg2,
        name: "Burger"
    }, {
        offerPercent: 20,
        color: '#35b48d',
        order: 3,
        image: offersBg3,
        name: "Juices"
    }, {
        offerPercent: 10,
        color: '#6387ca',
        order: 4,
        image: offersBg4,
        name: "Snacks"
    }, {
        offerPercent: 5,
        color: '#fff',
        order: 5,
        image: offersBg5,
        name: "Biryani"
    }];

    useEffect(() => {
        const handleBackButton = () => {
            navigation.navigate('Home');
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackButton,
        );

        return () => backHandler.remove();
    }, [navigation]);

    const get_Token = async () => {
        // setModal(true);
        var user = await storage.getUserData();
        setUser(user);
        setModal(false);
    };
    useFocusEffect(
        React.useCallback(() => {
            get_Token();
        }, []),
    );
    useEffect(() => {
        home_page();
    }, [route]);
    const getBanners = async () => {
        let response = await api.homeBanners();
        if (response.status == 'success') {
            setBanner(response?.banners);
            setCoupons(response?.coupons);
            setFood_types(response?.food_types);
            storage.setCartStatus(response?.cart_status);
        }
    };
    const getPopularFoods = async () => {
        let response = await api.homePopularFoods();
        console.log("popular foooooods", response);
        if (response.status == 'success') {
            console.log("popular foooooods2222222", response?.popular_foods);
            setPopular_foods(response?.popular_foods);
        }
    };
    const getCookTopRated = async () => {
        let response = await api.homeCookTopRated(1);
        if (response.status == 'success') {
            setTop_rated_cooks(response?.cook_top_rated);
        }
    };
    const getCookNearBy = async () => {
        let response = await api.homeCookNearBy();
        if (response.status == 'success') {
            // console.log("cooks nearby from home page", response?.cook_near[0]);
            // const response1 = await response?.cook_near.filter(data => { console.log("dataaaaa", data); return data.dtime < 75 })
            setNearby_cooks(response?.cook_near.sort((a, b) => {
                if (a?.current_status < b?.current_status) return 1
                else return -1
            }));
        }
    };
    const getCookNew = async () => {
        let response = await api.homeCookNew(1);
        if (response.status == 'success') {
            // console.log("ress");
            setTop_new_cooks(response?.top_new_cooks);
        }
    };
    const getCookOffer = async () => {
        let response = await api.homeCookOffer();
        if (response.status == 'success') {
            setCook_offers(response?.cook_offers);
        }
    };
    const home_page = async () => {
        setModal(true);
        get_Token();
        getBanners();
        getPopularFoods();
        getCookTopRated();
        getCookNearBy();
        getCookNew();
        getCookOffer();
        // let response = await api.home();
        // storage.setCartStatus(response.cart_status);
        // setBanner(response.banners);
        // setCook_offers(response.cook_offers);
        // setCoupons(response.coupons);
        // setFood_types(response.food_types);
        // setNearby_cooks(response.nearby_cooks);
        // setPopular_foods(response.popular_foods);
        // setTop_new_cooks(response.top_new_cooks);
        // setTop_rated_cooks(response.top_rated_cooks);
        setModal(false);
    };
    const render_Banner_Item = ({ item, index }) => {
        return (
            <Image
                source={{ uri: item?.image }}
                style={{
                    width: width * 0.98,
                    height: 200,
                    borderRadius: 15,
                    overflow: 'hidden',
                    resizeMode: 'contain'
                }}
            />
        );
    };
    const _renderItem = ({ item, index }) => {
        let backgroundImg = null;
        // if (index % 2) {
        //   backgroundImg = require('../assets/img/coupon/1.png');
        // } else {
        // backgroundImg = require('../assets/img/coupon/3.png');
        // }
        return (
            <>
                <View style={{ height: 180, width: 120, marginRight: 15 }}>
                    <Image style={styles.couponBack} source={offersBgArr[index]?.image} />
                    <View style={{ marginHorizontal: 10 }}>
                        <Text style={[styles.package, { color: offersBgArr[index]?.color }]}>upto</Text>
                        <Text style={styles.percentage}>{item?.value}%</Text>
                        <Text style={[styles.offer, { color: offersBgArr[index]?.color }]}>offers on</Text>
                        <Text style={styles.offerName}>{offersBgArr[index]?.name}</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={{ uri: item?.image }}
                            style={{
                                width: 60,
                                aspectRatio: 1,
                                overflow: 'hidden',
                                position: "absolute",
                                marginTop: -17,
                                borderRadius: 10,
                                // justifyContent: "center",
                                // alignItems: "center",
                            }}
                        />
                    </View>
                    {/* </Image> */}
                </View>
            </>
        );
    };

    const _renderItem1 = ({ item, index }) => {
        // index == 0 && console.log("featured cook item", item)
        return (
            <TouchableOpacity
                style={{ marginRight: 20 }}
                onPress={() => navigation.navigate('FoodDetail', { id: item.cook_id })}>
                <View style={{ width: 110, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', width: 90, height: 25, fontFamily: 'Poppins-Bold', justifyContent: 'center', alignItems: 'center', backgroundColor: PrimaryGreen, borderRadius: 10, marginBottom: -10, zIndex: 3 }}>
                        <Image source={offerHorn} style={{ height: 14, width: 14, marginRight: 5 }} />
                        <Text style={{ textAlign: 'center', color: '#fff' }}>Special</Text>
                    </View>
                </View>
                <Image
                    source={{ uri: item.image }}
                    style={{
                        width: 110,
                        aspectRatio: 1,
                        // height: 110,
                        borderRadius: 15,
                        overflow: 'hidden',
                        resizeMode: 'cover',
                    }}
                />
                <View style={{ flexDirection: 'row', paddingVertical: 4, width: 100, marginLeft: 5, justifyContent: 'space-between' }}>
                    <Image source={starSelect} style={{ width: 17, height: 17 }} />
                    <Image source={starSelect} style={{ width: 17, height: 17 }} />
                    <Image source={starSelect} style={{ width: 17, height: 17 }} />
                    <Image source={starSelect} style={{ width: 17, height: 17 }} />
                    <Image source={starUnSelect} style={{ width: 17, height: 17 }} />
                </View>
                <View style={{ flexDirection: 'row', width: 105, marginLeft: 5, height: 50, justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Text
                        style={{
                            width: '70%',
                            fontFamily: 'Poppins-Bold',
                            fontWeight: '800',
                            fontSize: 11,
                            color: '#000',
                        }} numberOfLines={2}>
                        {item.cook_name}
                        {/* {item?.cook_name.length > 15 ? `${item.cook_name.slice(0, 12)}...` : item.cook_name} */}
                    </Text>
                    <View style={{ width: '45%' }}>
                        {/* <Text style={{
                            fontFamily: 'Poppins-Regular',
                            fontSize: 9,
                            textDecorationLine: 'line-through',
                            textAlign: 'center',
                            color: '#989898',
                        }}>
                            ₹{item?.actual_price}
                        </Text> */}
                        <Text style={{
                            fontFamily: 'Poppins-Bold',
                            fontSize: 13,
                            textAlign: 'center',
                            color: '#000',
                        }}>
                            ₹{item?.final_price}
                        </Text>

                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const poprenderItem = ({ item, index }) => {
        // console.log("indx", index, happyIndex);
        return (
            <View style={{ marginLeft: 10 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('FoodListFilter', item)}
                    style={{
                        width: 170,
                        height: 60,
                        borderRadius: 128.5,
                        backgroundColor: PrimaryGreen, // index === happyIndex ? PrimaryGreen : '#dfffec',
                        flexDirection: 'row',
                        borderWidth: 2,
                        borderColor: '#ffffff',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <View style={{
                        width: 75,
                        height: 60,
                        borderRadius: 128.5,
                        backgroundColor: PrimaryGreen, //happyIndex === index ? PrimaryGreen : '#b5ffd2',
                        borderWidth: 2,
                        borderColor: '#fff',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image source={{ uri: item?.icon }} style={{ width: 55, height: 50, borderRadius: 50 }} />
                    </View>
                    <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', width: '45%', marginRight: 5 }}>
                        <Text style={{
                            fontFamily: 'Poppins-Bold', color: '#fff',// happyIndex === index ? '#fff' : PrimaryGreen,
                            fontSize: 14, fontWeight: '600'
                        }}>{item?.userlanguage?.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    const newrenderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('FoodDetail', item)}
                style={{
                    // flexDirection: 'row',
                    paddingHorizontal: 10,
                    marginBottom: 10,
                }}>
                <View style={{ width: 80 }}>
                    <View style={{ width: '100%', borderRadius: 5, justifyContent: 'center' }}>
                        <Image
                            source={{ uri: item?.viewmenuitem?.image }}
                            style={{ width: 75, height: 90, borderRadius: 15 }}
                        />
                        {/* <LinearGradient colors={['#000000', '#9e0000']} style={{ width: 75, height: 90, marginTop: '-100%' }} /> */}
                    </View>
                </View>
                <View style={{ height: 55, marginBottom: 20, justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 10.5, fontFamily: 'Poppins-Bold', fontWeight: '900', width: 90, marginBottom: -5 }} numberOfLines={2}>
                        {item.first_name}
                    </Text>
                    <View style={{ justifyContent: 'flex-end' }}>
                        {/* <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 16, marginTop: -15 }}>₹ {item?.cost_for_two}</Text> */}
                        {/* <View style={styles.delLoc}> */}
                        {/* <Image style={{ width: 18, height: 18 }} source={timingIcon} /> */}
                        <Text
                            style={{
                                fontSize: 12,
                                fontFamily: 'Poppins-Bold',
                                alignItems: 'center',
                                justifyContent: 'center',
                                // marginLeft: 6,
                                color: '#989898',
                                marginTop: -8,
                            }}>
                            {item.dtime} mins
                        </Text>
                    </View>
                    {/* </View> */}
                    {/* <View style={styles.delLoc}>
            <Image style={{ width: 18, height: 18 }} source={tagIcon} />
            <Text
              style={{
                fontSize: 13.5,
                fontFamily: 'Poppins-Bold',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 6,
              }}>
              ₹ {item.cost_for_two}
            </Text>
          </View> */}
                    {item.cook_offer == 1 ? (
                        <View style={styles.delLoc}>
                            <Image style={{ width: 18, height: 18 }} source={offerIcon} />
                            <Text
                                style={{
                                    fontSize: 14.5,
                                    fontFamily: 'Poppins-Regular',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginLeft: 6,
                                }}>
                                Try Homee Foodz
                            </Text>
                        </View>
                    ) : null}
                </View>
            </TouchableOpacity>
        );
    };

    const cooksNearbyrenderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('FoodDetail', item)}
                style={{
                    // flexDirection: 'row',
                    paddingLeft: 5,
                    marginBottom: 10,
                }}>
                <View style={{ flexDirection: 'row', marginBottom: 15, width: '100%', height: 120, marginTop: 5, backgroundColor: '#fff' }}>
                    {/* <View style={{ width: '100%', borderRadius: 5 }}> */}
                    <Image
                        source={{ uri: item?.viewmenuitem?.image }}
                        style={{ width: '45%', height: 120, borderRadius: 15, marginRight: 5 }}
                    />
                    {item?.current_status == 0 && <View style={{ position: 'absolute', width: '45%', height: 120, backgroundColor: 'grey', opacity: 0.7, borderRadius: 15 }} />}
                    {/* </View> */}
                    <View style={{ justifyContent: 'space-between', width: '50%' }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular' }} numberOfLines={2}>
                            {item.first_name}
                        </Text>
                        {/* <View style={{}}> */}
                        <Text
                            style={{
                                alignSelf: 'flex-start',
                                // width: 110,
                                fontSize: 13,
                                fontFamily: 'Poppins-Regular',
                                fontWeight: 'normal',
                                alignItems: 'flex-start',
                                // lineHeight: 23,
                                justifyContent: 'center',
                                color: '#989898',
                                backgroundColor: '#f4fbf8',
                                paddingRight: 10,
                            }}>
                            {item.viewmenuitem.cuisine.userlanguage.name}
                        </Text>
                        {/* <Text
                            style={{
                                width: 120,
                                fontSize: 13,
                                fontFamily: 'Poppins-Regular',
                                fontWeight: 'normal',
                                alignItems: 'flex-start',
                                // lineHeight: 23,
                                justifyContent: 'center',
                                color: '#989898',
                            }}>
                            ₹{item?.cost_for_two} for two
                        </Text> */}
                        <Text
                            style={{
                                width: "100%",
                                fontSize: 13,
                                fontFamily: 'Poppins-Regular',
                                fontWeight: 'normal',
                                alignItems: 'flex-start',
                                // lineHeight: 23,
                                justifyContent: 'center',
                                color: '#989898',
                            }}>
                            {item?.area}
                        </Text>
                        {/* </View> */}
                        {/* <View style={{ flexDirection: 'row' }}>
                            <Image
                                style={{
                                    width: 18,
                                    height: 18,
                                }}
                                source={distanceIcon}
                            />
                            <Text
                                style={{
                                    fontSize: 13.5,
                                    fontFamily: 'Poppins-Bold',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginLeft: 6,
                                }}>
                                {item.distance} km
                            </Text>
                        </View> */}
                        <LinearGradient colors={[item?.current_status == 0 ? 'grey' : '#7bffb0', '#fff']} style={{ height: 30, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} >
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 16, color: item?.current_status == 0 ? '#000' : PrimaryGreen, paddingLeft: 2, alignSelf: 'flex-start' }}> {item?.current_status == 0 ? 'Unserviceable' : 'Fast Delivery'}</Text>
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontFamily: 'Poppins-Medium',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginLeft: 6,
                                    paddingLeft: 20,
                                    color: item?.current_status == 0 ? '#000' : PrimaryGreen,
                                }}>
                                {item.dtime} mins
                            </Text>
                        </LinearGradient>

                        {/* <View style={styles.delLoc}>
                            <Image style={{ width: 18, height: 18 }} source={timingIcon} />
                            <Text
                                style={{
                                    fontSize: 13.5,
                                    fontFamily: 'Poppins-Bold',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginLeft: 6,
                                }}>
                                {item.dtime} mins
                            </Text>
                        </View> */}
                        {/* <View style={styles.delLoc}>
                        <Image style={{ width: 18, height: 18 }} source={tagIcon} />
                        <Text
                        style={{
                            fontSize: 13.5,
                            fontFamily: 'Poppins-Bold',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 6,
                        }}>
                        ₹ {item.cost_for_two}
                        </Text>
                        </View> */}
                        {item.cook_offer == 1 ? (
                            <View style={styles.delLoc}>
                                <Image style={{ width: 18, height: 18 }} source={offerIcon} />
                                <Text
                                    style={{
                                        fontSize: 14.5,
                                        fontFamily: 'Poppins-Regular',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginLeft: 6,
                                    }}>
                                    Try Homee Foodz
                                </Text>
                            </View>
                        ) : null}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const topHomeePicksRender = ({ item, index }) => {
        return (<>
            <TouchableOpacity
                onPress={() => navigation.navigate('FoodDetail', item)}
                style={{
                    // flexDirection: 'row',
                    backgroundColor: '#fff',
                    paddingHorizontal: 20,
                    marginBottom: 30,
                }}>
                <View style={{ width: '100%', borderRadius: 5, justifyContent: 'space-evenly', backgroundColor: '#fff' }}>
                    <Image
                        source={{ uri: item?.viewmenuitem?.image }}
                        style={{ width: 150, height: 100, borderRadius: 20 }}
                    />
                    <View style={{ backgroundColor: '#fff' }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular', textAlign: 'left' }}>
                            {item.first_name.slice(0, 12)}{item?.first_name?.length > 12 && '...'}
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Image source={starSelect} style={{ width: 14, height: 14, marginRight: 3 }} />
                                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 12, color: '#989898' }}>4.2</Text>
                            </View>
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 12, color: '#989898' }}>Free Delivery</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={styles.delLoc}>
                                <Image
                                    style={{
                                        width: 18,
                                        height: 18,
                                    }}
                                    source={distanceIcon}
                                />
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontFamily: 'Poppins-Medium',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        // marginLeft: 6,
                                    }}>
                                    {item.distance} km
                                </Text>
                            </View>
                            <View style={styles.delLoc}>
                                <Image style={{ width: 12, height: 12 }} source={timingIcon} />
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontFamily: 'Poppins-Medium',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginLeft: 6,
                                    }}>
                                    {item.dtime} mins
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>);
    };

    const topHomeePicksRender2 = ({ item, index }) => {
        return (<>
            <TouchableOpacity
                onPress={() => navigation.navigate('FoodDetail', item)}
                style={{
                    // flexDirection: 'row',
                    paddingHorizontal: 10,
                    marginBottom: 25,
                }}>
                <View style={{ width: width / 2.3, height: 200, backgroundColor: '#fff', borderRadius: 20, justifyContent: 'space-evenly', borderWidth: 0.5, borderColor: '#dedede' }}>
                    <Image
                        source={{ uri: item?.viewmenuitem?.image }}
                        style={{ width: "100%", height: 110, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 2, marginTop: -10 }}
                    />
                    <View style={{ padding: '4%' }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Poppins-Bold', textAlign: 'left' }} numberOfLines={1}>
                            {item.first_name}
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Image source={starSelect} style={{ width: 14, height: 14, marginRight: 3 }} />
                                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 12, color: '#989898' }}>4.2</Text>
                            </View>
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 12, color: '#989898' }}>Fast Delivery</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={styles.delLoc}>
                                <Image
                                    style={{
                                        width: 16,
                                        height: 16,
                                    }}
                                    source={distanceIcon}
                                />
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontFamily: 'Poppins-Medium',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        // marginLeft: 6,
                                    }}>
                                    {item.distance} km
                                </Text>
                            </View>
                            <View style={styles.delLoc}>
                                <Image style={{ width: 12, height: 12 }} source={timingIcon} />
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontFamily: 'Poppins-Medium',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginLeft: 6,
                                    }}>
                                    {item.dtime} mins
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>);
    };

    const FilterSlider = ({ index }) => {
        return (
            <View
                style={{
                    width: index == 1 ? 160 : 130,
                    height: index == 1 ? 55 : 50,
                    borderRadius: 128.5,
                    backgroundColor: 'silver',
                    flexDirection: 'row',
                    borderWidth: 2,
                    borderColor: '#ffffff',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginLeft: 20,
                    marginRight: index == 1 ? 0 : 20,
                }}>
                <View style={{
                    width: index == 1 ? 70 : 55,
                    height: index == 1 ? 55 : 50,
                    borderRadius: 128.5,
                    backgroundColor: 'silver',
                    borderWidth: 2,
                    borderColor: '#fff',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {/* <Image source={{ uri: item?.icon }} style={{ width: 55, height: 50, borderRadius: 50 }} /> */}
                </View>
                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', width: '45%', marginRight: 5 }}>
                    <Text style={{
                        fontFamily: 'Poppins-Bold', color: '#fff',// happyIndex === index ? '#fff' : PrimaryGreen,
                        fontSize: 14, fontWeight: '600'
                    }}></Text>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {modal == false && (
                <>
                    {/* <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{ marginBottom: -30 }}
                        data={[2]}
                        listKey={(item, index) => `_key${index.toString()}`}
                        keyExtractor={(item, index) => `_key${index.toString()}`}
                        renderItem={({ item }) => {
                            return ( */}
                    <ScrollView>
                        <View
                            style={{
                                backgroundColor: '#fff',
                                width: width,
                                flexDirection: 'row',
                                // paddingVertical: 5,
                                paddingBottom: 10,
                                paddingHorizontal: 10,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                // backgroundColor: 'red'
                            }}>
                            <TouchableOpacity onPress={() => navigation.navigate('AddressChoose', { type: 'Home', profile: home_page })} style={{ backgroundColor: '#fff' }}>
                                {/* <View style={{ width, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'red' }}> */}
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        // marginBottom: 5,
                                        marginTop: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Image
                                        source={location_bar_icon}
                                        style={{ width: 22, aspectRatio: 1, resizeMode: 'stretch' }}
                                    />
                                    <View style={{ height: 40 }} >
                                        {!!user?.defaultaddress ? <><Text
                                            style={{
                                                fontFamily: 'Poppins-Bold',
                                                fontSize: 18,
                                                marginLeft: 8,
                                                textTransform: 'uppercase',
                                            }}>
                                            {user?.defaultaddress?.type}
                                        </Text>
                                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 13, marginTop: -10, marginLeft: 8, color: '#1f2220', marginBottom: 10 }}>
                                                {user?.defaultaddress?.door_no
                                                    ? user.defaultaddress.door_no + ' ,'
                                                    : null}
                                                {user?.defaultaddress?.block
                                                    ? user.defaultaddress.block + ' ,'
                                                    : null}
                                                {user?.defaultaddress?.apartment_name
                                                    ? user.defaultaddress.apartment_name + ' ,'
                                                    : null}
                                                {user?.defaultaddress?.street.length
                                                    ? user?.defaultaddress?.street.length > 20 ?
                                                        `${user?.defaultaddress?.street.slice(0, 20)}...` :
                                                        user.defaultaddress.street + ', '
                                                    : null}
                                                {user?.defaultaddress?.city
                                                    ? user.defaultaddress.city + ', '
                                                    : null}
                                                {user?.defaultaddress?.pin_code
                                                    ? user.defaultaddress.pin_code + '. '
                                                    : null}
                                            </Text></> : <Text> Add New Address</Text>}
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {/* <View style={{ backgroundColor: '#fff', alignItems: 'flex-end' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'relative', backgroundColor: '#fff' }}>
                                    <Image source={offerIcon2} style={{ width: 15, aspectRatio: 1, marginRight: 3 }} /> */}
                            {/* <LinearTextGradient
                                        // style={{ fontWeight: "bold", fontSize: 16 }}
                                        locations={[0, 1]}
                                        colors={['#09b44d', '#017944']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                    > */}
                            {/* <Text style={{ textTransform: 'uppercase', color: '#757575', fontSize: 14 }}>Homee</Text> */}
                            {/* </LinearTextGradient> */}
                            {/* </View> */}
                            {/* <LinearTextGradient
                                    // style={{ fontWeight: "bold", fontSize: 18, marginTop: -5 }}
                                    locations={[0, 1]}
                                    colors={['#09b44d', '#017944']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                > */}
                            {/* <Text style={{ textTransform: 'uppercase', color: '#757575', fontSize: 16 }}>Offers</Text> */}
                            {/* </LinearTextGradient> */}
                            {/* </View> */}
                            {/* </View> */}
                        </View>
                        <LinearGradient colors={['#7bffb0', '#fede1d', '#09b44d']} style={{ width: '100%', height: 3, marginBottom: 10 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
                        <View style={{ marginBottom: 130, backgroundColor: HomeBgColor }}>
                            <View>
                                {banner && banner.length > 0 ? (
                                    // <>
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        {/* <HomeBanner /> */}
                                        <Carousel
                                            style={{ borderRadius: 25, overflow: 'hidden' }}
                                            loop={true}
                                            data={banner}
                                            renderItem={render_Banner_Item}
                                            sliderWidth={BannerCarouselImg}
                                            itemWidth={width}
                                            // inactiveSlideScale={0.98}
                                            // inactiveSlideOpacity={0.5}
                                            autoplay={true}
                                            autoplayDelay={1000}
                                            autoplayInterval={3000}
                                            activeSlideAlignment={'center'}
                                            contentContainerCustomStyle={{
                                                height: 210,
                                                marginLeft: 3,
                                                borderRadius: 10,
                                                overflow: 'hidden',
                                            }}
                                        />
                                        {/* {banner.length > 0 &&
                                            <View style={{ flexDirection: 'row' }}>
                                                {banner.map(item =>
                                                    <View style={{ width: 5, height: 5, backgroundColor: 'red', marginRight: 10, borderRadius: 10 }} />
                                                )}
                                            </View>
                                        } */}
                                    </View>
                                ) :
                                    <View style={{ width: '98%', alignSelf: 'center', justifyContent: 'center', alignContent: 'center', marginVertical: 10 }}>
                                        <Shimmer tilt={30}>
                                            {/* <View style={{ width, height: 200, justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}> */}
                                            <View style={{ height: 200, backgroundColor: 'silver', borderRadius: 25, alignSelf: 'center' }} />
                                            {/* </View> */}
                                        </Shimmer>
                                    </View>
                                    //     {/* </>
                                    // ) : null */}
                                }
                                <View
                                    style={{
                                        // paddingBottom: 15,
                                        backgroundColor: '#deece5',
                                        height: 15
                                    }} />
                                <Text
                                    style={{
                                        color: '#262626',
                                        fontFamily: 'Poppins-Bold',
                                        fontSize: 18,
                                        marginVertical: 10,
                                        marginLeft: 15,
                                    }}>
                                    {t('homePage.quickFilter')}
                                </Text>
                                {food_types && food_types.length > 0 ? (
                                    <>
                                        {/* <FlatList
                                                    style={{ margin: 10 }}
                                                    horizontal={true}
                                                    data={food_types}
                                                    keyExtractor={(item, index) => index.toString()}
                                                    renderItem={poprenderItem}
                                                    onEndReachedThreshold={0}
                                                    showsHorizontalScrollIndicator={false}
                                                /> */}
                                        <Carousel
                                            data={food_types}
                                            renderItem={poprenderItem}
                                            // ref={eatHappyRef}
                                            loop
                                            sliderWidth={BannerCarouselImg}
                                            itemWidth={170}
                                            inactiveSlideScale={0.8}
                                            inactiveSlideOpacity={0.7}
                                            // autoplay
                                            autoplayDelay={750}
                                            autoplayInterval={4000}
                                            activeSlideAlignment={'start'}
                                            // onSnapToItem={index => setHappyIndex(index)}
                                            contentContainerCustomStyle={{
                                                height: 70,
                                                marginLeft: 3,
                                                borderRadius: 10,
                                                overflow: 'hidden',
                                            }} />
                                    </>
                                ) : (
                                    <View style={{ width: '100%', height: 70, flexDirection: 'row', alignItems: 'center' }}>
                                        <Shimmer tilt={30}>
                                            <FilterSlider index={1} />
                                        </Shimmer>
                                        <Shimmer tilt={30}>
                                            <FilterSlider index={2} />
                                        </Shimmer>
                                        <Shimmer tilt={30}>
                                            <FilterSlider index={3} />
                                        </Shimmer>
                                    </View>)}
                                <View
                                    style={{
                                        // paddingBottom: 15,
                                        backgroundColor: '#deece5',
                                        height: 15
                                    }} />
                                <Text style={styles.h2}>
                                    {t('homePage.offersAroundYou')}
                                </Text>
                                {coupons && coupons.length > 0 ? (
                                    // <View
                                    //     style={{
                                    //         // paddingBottom: 15,
                                    //         borderBottomColor: '#deece5',
                                    //         borderBottomWidth: 15,
                                    //     }}>
                                    <>
                                        <FlatList
                                            style={{ margin: 10 }}
                                            horizontal={true}
                                            data={coupons}
                                            listKey={(item, index) => `_key${index.toString()}`}
                                            keyExtractor={(item, index) => `_key${index.toString()}`}
                                            renderItem={_renderItem}
                                            onEndReachedThreshold={0}
                                            showsHorizontalScrollIndicator={false}
                                        />
                                    </>
                                    // </View>
                                ) : (
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ width, height: 150 }}>
                                        <Shimmer tilt={30} style={{ marginHorizontal: 20, marginVertical: 10, }}>
                                            <View style={{ width: 100, height: 150, borderRadius: 30, backgroundColor: 'silver' }} />
                                        </Shimmer>
                                        <Shimmer tilt={30} style={{ marginHorizontal: 20, marginVertical: 10, }}>
                                            <View style={{ width: 100, height: 150, borderRadius: 30, backgroundColor: 'silver' }} />
                                        </Shimmer>
                                        <Shimmer tilt={30} style={{ marginHorizontal: 20, marginVertical: 10, }}>
                                            <View style={{ width: 100, height: 150, borderRadius: 30, backgroundColor: 'silver' }} />
                                        </Shimmer>
                                        <Shimmer tilt={30} style={{ marginHorizontal: 20, marginVertical: 10, }}>
                                            <View style={{ width: 100, height: 150, borderRadius: 30, backgroundColor: 'silver' }} />
                                        </Shimmer>
                                    </ScrollView>
                                )}
                                {((top_rated_cooks && top_rated_cooks.length > 0) || (nearby_cooks && nearby_cooks.length > 0)) &&
                                    <View>
                                        {top_rated_cooks && top_rated_cooks.length > 0 && (
                                            <View style={{
                                                borderBottomColor: '#deece5',
                                                borderBottomWidth: 15,
                                                // backgroundColor: "#fff2ff",
                                                backgroundColor: "#dff0e3",
                                            }}>
                                                <View
                                                    style={{
                                                        justifyContent: 'flex-end',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        // paddingHorizontal: 20,
                                                        paddingTop: 15,
                                                        paddingBottom: 10,
                                                    }}>
                                                    <Text
                                                        style={{
                                                            color: '#5bb4f4',
                                                            fontFamily: 'Poppins-Bold',
                                                            fontSize: 18,
                                                        }}>
                                                        {t('homePage.topHomeePicks')}
                                                    </Text>
                                                    <TouchableOpacity
                                                        onPress={() =>
                                                            navigation.navigate('CookSeeAll', {
                                                                type: 'top_rated_cooks',
                                                            })}
                                                        style={{ width: "20%", justifyContent: 'center', alignItems: 'flex-end', marginRight: "3%" }}>
                                                        <Text
                                                            style={{ fontSize: 13, fontFamily: 'Poppins-Regular', }}>
                                                            {t('homePage.viewMore')}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ width: '100%', height: 2, justifyContent: 'center', alignItems: 'center', paddingBottom: 15 }}>
                                                    <View style={{ backgroundColor: '#09b44d', width: '40%', height: 1.5 }} />
                                                </View>
                                                <View>
                                                    <View style={{ marginLeft: 0, marginTop: 10, alignItems: 'center', }}>
                                                        <FlatList
                                                            data={top_rated_cooks}
                                                            renderItem={topHomeePicksRender2}
                                                            listKey={(item, index) => `_key${index.toString()}`}
                                                            keyExtractor={(item, index) => `_key${index.toString()}`}
                                                            numColumns={2} />
                                                        {/* <Carousel
                                                                    loop={false}
                                                                    data={top_rated_cooks}
                                                                    renderItem={newrenderItem}
                                                                    sliderWidth={BannerCarouselImg}
                                                                    itemWidth={350}
                                                                    inactiveSlideScale={1}
                                                                    inactiveSlideOpacity={0.8}
                                                                    activeSlideAlignment={'start'}
                                                                    contentContainerCustomStyle={{
                                                                        marginTop: 15,
                                                                    }}
                                                                /> */}
                                                    </View>
                                                </View>
                                            </View>
                                        )}
                                        {popular_foods && popular_foods.length > 0 ?
                                            <View style={{
                                                borderBottomColor: '#deece5',
                                                borderBottomWidth: 15,
                                            }}>
                                                {/* <Text
                                                    style={{
                                                        color: '#262626',
                                                        fontFamily: 'Poppins-Bold',
                                                        fontSize: 18,
                                                        marginTop: 10,
                                                        marginLeft: 15,
                                                    }}>
                                                    {t('homePage.featuredcooksoffer')}
                                                    </Text> */}
                                                <View
                                                    style={{
                                                        justifyContent: 'center',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        // paddingHorizontal: 20,
                                                        paddingTop: 15,
                                                        paddingBottom: 10,
                                                    }}>
                                                    <Text
                                                        style={{
                                                            color: '#f45b80',
                                                            fontFamily: 'Poppins-Bold',
                                                            fontSize: 18,
                                                        }}>
                                                        {t('homePage.featuredcooksoffer')}
                                                    </Text>
                                                    {/* <TouchableOpacity
                                                                onPress={() =>
                                                                    navigation.navigate('CookSeeAll', {
                                                                        type: 'top_rated_cooks',
                                                                    })}
                                                                style={{ width: "20%", justifyContent: 'center', alignItems: 'flex-end', marginRight: "3%" }}>
                                                                <Text
                                                                    style={{ fontSize: 13, fontFamily: 'Poppins-Regular' }}>
                                                                    {t('homePage.viewAll')}
                                                                </Text>
                                                            </TouchableOpacity> */}
                                                </View>
                                                <View style={{ width: '100%', height: 2, justifyContent: 'center', alignItems: 'center', paddingBottom: 15 }}>
                                                    <View style={{ backgroundColor: '#09b44d', width: '40%', height: 1.5 }} />
                                                </View>
                                                {/* <FlatList
                                                        style={{ margin: 10, marginBottom: 0, }}
                                                        horizontal={true}
                                                        data={popular_foods}
                                                        keyExtractor={(item, index) => index.toString()}
                                                        renderItem={_renderItem1}
                                                        onEndReachedThreshold={0}
                                                        showsHorizontalScrollIndicator={false}
                                                        /> */}
                                                <Carousel
                                                    data={popular_foods}
                                                    renderItem={_renderItem1}
                                                    // style={{ borderRadius: 25, overflow: 'hidden' }}
                                                    loop
                                                    sliderWidth={BannerCarouselImg}
                                                    itemWidth={130}
                                                    // inactiveSlideScale={0.8}
                                                    inactiveSlideOpacity={1}
                                                    // apparitionDelay={200}
                                                    autoplay
                                                    autoplayDelay={2000}
                                                    autoplayInterval={3000}
                                                    activeSlideAlignment={'center'}
                                                />
                                            </View> :
                                            // <View style={{ marginTop: 10 }}>
                                            //     <Loader />
                                            // </View>

                                            <Shimmer tilt={30}>
                                                <View style={{ width: 100, height: 200, backgroundColor: 'silver' }} />
                                            </Shimmer>
                                        }

                                        {top_new_cooks && top_new_cooks.length > 0 && (
                                            <View style={{
                                                borderBottomColor: '#deece5',
                                                borderBottomWidth: 15,
                                            }}>
                                                <View
                                                    style={{
                                                        justifyContent: 'center',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        // paddingHorizontal: 20,
                                                        paddingTop: 15,
                                                        paddingBottom: 10,
                                                    }}>
                                                    <Text
                                                        style={{
                                                            color: '#ffb84f',
                                                            fontFamily: 'Poppins-Bold',
                                                            fontSize: 18,
                                                        }}>
                                                        {t('homePage.mostlovedfoods')}
                                                    </Text>
                                                    {/* <TouchableOpacity
                                                                onPress={() =>
                                                                    navigation.navigate('CookSeeAll', {
                                                                        type: 'top_rated_cooks',
                                                                    })}
                                                                style={{ width: "25%", justifyContent: 'center', alignItems: 'flex-end', marginRight: "3%" }}>
                                                                <Text
                                                                    style={{ fontSize: 13, fontFamily: 'Poppins-Regular' }}>
                                                                    {t('homePage.seeAll')}
                                                                </Text>
                                                            </TouchableOpacity> */}
                                                    {/* <TouchableOpacity
                                                                onPress={() =>
                                                                    navigation.navigate('CookSeeAll', {
                                                                        type: 'top_rated_cooks',
                                                                    })}
                                                                style={{ width: "20%", justifyContent: 'center', alignItems: 'flex-end', marginRight: "3%" }}>
                                                                <Text
                                                                    style={{ fontSize: 13, fontFamily: 'Poppins-Regular' }}>
                                                                    {t('homePage.viewAll')}
                                                                </Text>
                                                            </TouchableOpacity> */}
                                                </View>
                                                <View style={{ width: '100%', height: 2, justifyContent: 'center', alignItems: 'center', paddingBottom: 15 }}>
                                                    <View style={{ backgroundColor: '#09b44d', width: '40%', height: 1.5 }} />
                                                </View>
                                                <View>
                                                    <View style={{ marginLeft: 0 }}>
                                                        <Carousel
                                                            loop
                                                            data={top_new_cooks}
                                                            renderItem={newrenderItem}
                                                            sliderWidth={BannerCarouselImg}
                                                            itemWidth={100}
                                                            autoplay
                                                            autoplayDelay={1800}
                                                            autoplayInterval={1500}
                                                            inactiveSlideScale={1}
                                                            inactiveSlideOpacity={0.8}
                                                            activeSlideAlignment={'start'}
                                                            contentContainerCustomStyle={{
                                                                marginTop: 15,
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        )}
                                        {nearby_cooks && nearby_cooks.length > 0 && (
                                            <View style={{ width: width * 0.98 }}>
                                                <Text
                                                    style={{
                                                        color: '#262626',
                                                        fontFamily: 'Poppins-Bold',
                                                        fontSize: 18,
                                                        marginTop: 15,
                                                        marginLeft: 15,
                                                    }}>
                                                    {t('homePage.allCooksNearby')}
                                                </Text>
                                                <Text
                                                    style={{
                                                        color: '#262626',
                                                        fontFamily: 'Poppins-Regular',
                                                        fontSize: 14,
                                                        marginTop: -7,
                                                        marginLeft: 15,
                                                        fontWeight: '300',
                                                        color: '#1f2220',
                                                    }}>
                                                    {t('homePage.discoverYourFavouriteRecipes')}
                                                </Text>
                                                <FlatList
                                                    style={{ marginVertical: 10, marginLeft: 0, }}
                                                    data={nearby_cooks}
                                                    listKey={(item, index) => `_key${index.toString()}`}
                                                    keyExtractor={(item, index) => `_key${index.toString()}`}
                                                    renderItem={cooksNearbyrenderItem}
                                                    onEndReachedThreshold={0}
                                                // numColumns={2}
                                                />
                                            </View>
                                        )}
                                    </View>
                                    // :
                                    // // <View style={{ marginTop: 10 }}>
                                    // //     <Loader />
                                    // // </View>

                                    // <Shimmer tilt={30}>
                                    //     <View style={{ width: 100, height: 200, backgroundColor: 'silver' }} />
                                    // </Shimmer>
                                }


                                <Image source={footerImage1} style={styles.footerImage} />
                            </View>
                        </View>
                    </ScrollView>
                    {/* );
                        }}
                    /> */}
                </>
            )
            }
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    couponBack: {
        width: 100,
        height: 150,
        resizeMode: "contain",
        position: "absolute",
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        // top: -80
    },
    iconBack: {
        width: 90,
        height: 90,
        // backgroundColor: '#09b44d',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    carouselImg: {
        width: 70,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerImage: {
        width: "100%",
        height: Dimensions.get('window').width - 50,
        resizeMode: 'center',
        marginBottom: -75,
        marginTop: -50
    },
    h2: {
        color: '#262626',
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        marginTop: 10,
        marginLeft: 15,
        // marginBottom: 10,
    },
    package: {
        fontFamily: 'Poppins-Medium',
        fontWeight: "400",
        fontSize: 14,
        marginTop: 20,
        marginLeft: 10,
        textAlign: 'left',
        // lineHeight: 25,
        // textTransform: 'uppercase',
    },
    percentage: {
        fontSize: 32,
        color: '#fff',
        fontFamily: 'Poppins-Black',
        marginTop: -15,
        marginLeft: 10,
    },
    offer: {
        color: '#262626',
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        marginTop: -23,
        // textAlign: 'center',
        marginLeft: 10,
        // lineHeight: 31,
        // textTransform: 'uppercase',
    },
    offerName: {
        fontFamily: 'Corinthia-Regular',
        fontWeight: '400',
        fontSize: 38,
        color: '#fff',
        marginLeft: 10,
        marginTop: -15,
        zIndex: 9,
    },
    delLoc: {
        flexDirection: 'row',
        // marginTop: 5,
        alignItems: 'center'
    },
});

export default React.memo(HomeNew);
