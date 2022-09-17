import React, { useEffect, useState } from 'react';
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
  const [top_rated_cooks, setTop_rated_cooks] = useState([]);
  var { width, height } = Dimensions.get('window');

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
    setModal(true);
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
    if (response.status == 'success') {
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
      setNearby_cooks(response?.cook_near);
    }
  };
  const getCookNew = async () => {
    let response = await api.homeCookNew(1);
    if (response.status == 'success') {
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
        source={{ uri: item.image }}
        style={{
          width: width * 0.98,
          height: 200,
          borderRadius: 15,
          overflow: 'hidden',
        }}
      />
    );
  };
  const _renderItem = ({ item, index }) => {
    let backgroundImg = null;
    // if (index % 2) {
    //   backgroundImg = require('../assets/img/coupon/1.png');
    // } else {
    backgroundImg = require('../assets/img/coupon/3.png');
    // }
    return (
      <View>
        <ImageBackground tintColor='#fc62e0' style={styles.couponBack} source={backgroundImg}>
          <View style={styles.iconBack}>
            <Image
              source={{ uri: item.image }}
              style={{
                width: 95,
                height: 95,
                borderRadius: 100,
                overflow: 'hidden',
              }}
            />
          </View>
          <Text style={styles.package}>{item.type}</Text>
          <Text style={styles.offer}>{item.code}</Text>
        </ImageBackground>
      </View>
    );
  };

  const _renderItem1 = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{ marginRight: 20 }}
        onPress={() => navigation.navigate('FoodDetail', { id: item.cook_id })}>
        <Image
          source={{ uri: item.image }}
          style={{
            width: 95,
            height: 95,
            borderRadius: 100,
            overflow: 'hidden',
          }}
        />
        <Text
          style={{
            color: '#262626',
            fontFamily: 'Poppins-Regular',
            fontSize: 13,
            marginTop: 5,
            textAlign: 'center',
            lineHeight: 25,
          }}>
          {item.userlanguage?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const poprenderItem = ({ item, index }) => {
    return (
      <View style={{ marginLeft: 10 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('FoodListFilter', item)}
          style={{ alignItems: 'center' }}>
          <Image
            source={{ uri: item?.icon }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 100,
            }}
          />
          <Text
            style={{
              color: '#262626',
              fontFamily: 'Poppins-Regular',
              fontSize: 15,
              marginTop: 5,
              textAlign: 'center',
              lineHeight: 25,
              maxWidth: 100
            }}>
            {item?.userlanguage?.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const newrenderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('FoodDetail', item)}
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          marginBottom: 10,
        }}>
        <View style={{ flex: 4 }}>
          <View style={{ width: '100%', borderRadius: 5 }}>
            <Image
              source={{ uri: item?.viewmenuitem?.image }}
              style={{ width: 120, height: 120, borderRadius: 5 }}
            />
          </View>
        </View>
        <View style={{ flex: 5, marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontFamily: 'Poppins-Bold' }}>
            {item.first_name}
          </Text>
          <View style={styles.delLoc}>
            <Text
              style={{
                fontSize: 14.5,
                fontFamily: 'Poppins-Regular',
                alignItems: 'center',
                lineHeight: 23,
                justifyContent: 'center',
              }}>
              {item?.viewmenuitem?.cuisine
                ? item.viewmenuitem.cuisine.userlanguage.name + ', '
                : null}
              {item?.area ? item.area + '. ' : null}
            </Text>
          </View>
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
                fontSize: 13.5,
                fontFamily: 'Poppins-Bold',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 6,
              }}>
              {item.distance} km
            </Text>
          </View>
          <View style={styles.delLoc}>
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
          </View>
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {modal == false ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: -30 }}
          data={[1]}
          renderItem={({ item }) => {
            return (
              <View>
                <TouchableOpacity onPress={() => navigation.navigate('AddressChoose', { type: 'Home', profile: home_page })}>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginBottom: 5,
                          marginTop: 5,
                        }}>
                        <Image
                          source={locatIcon}
                          style={{ width: 14, height: 20, resizeMode: 'stretch' }}
                        />
                        <Text
                          style={{
                            fontFamily: 'Poppins-Bold',
                            fontSize: 20,
                            marginLeft: 8,
                          }}>
                          {user?.defaultaddress?.type}
                        </Text>
                      </View>
                      <View>
                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15 }}>
                          {user?.defaultaddress?.door_no
                            ? user.defaultaddress.door_no + ' ,'
                            : null}
                          {user?.defaultaddress?.block
                            ? user.defaultaddress.block + ' ,'
                            : null}
                          {user?.defaultaddress?.apartment_name
                            ? user.defaultaddress.apartment_name + ' ,'
                            : null}
                          {user?.defaultaddress?.street
                            ? user.defaultaddress.street + ', '
                            : null}
                          {user?.defaultaddress?.city
                            ? user.defaultaddress.city + ', '
                            : null}
                          {user?.defaultaddress?.pin_code
                            ? user.defaultaddress.pin_code + '. '
                            : null}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={{ marginBottom: 130 }}>
                  <View>
                    {banner && banner.length > 0 && (
                      <View style={{
                        borderBottomColor: '#deece5',
                        borderBottomWidth: 8,
                      }}>
                        <Carousel
                          style={{ borderRadius: 25, overflow: 'hidden' }}
                          loop={true}
                          data={banner}
                          renderItem={render_Banner_Item}
                          sliderWidth={BannerCarouselImg}
                          itemWidth={width}
                          inactiveSlideScale={0.98}
                          inactiveSlideOpacity={0.5}
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
                      </View>
                    )}
                    <View style={{
                      borderBottomColor: '#deece5',
                      borderBottomWidth: 8,
                    }}>
                      <Text
                        style={{
                          color: '#262626',
                          fontFamily: 'Poppins-Bold',
                          fontSize: 18,
                          marginTop: 10,
                          marginLeft: 15,
                        }}>
                        {t('homePage.popularFoods')}
                      </Text>
                      <FlatList
                        style={{ margin: 10, marginBottom: 0, }}
                        horizontal={true}
                        data={popular_foods}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={_renderItem1}
                        onEndReachedThreshold={0}
                        showsHorizontalScrollIndicator={false}
                      />
                    </View>
                    {coupons && coupons.length > 0 && (
                      <View
                        style={{
                          // paddingBottom: 15,
                          borderBottomColor: '#deece5',
                          borderBottomWidth: 8,
                        }}>
                        <Text style={styles.h2}>
                          {t('homePage.couponsForYou')}
                        </Text>
                        <FlatList
                          style={{ margin: 10, }}
                          horizontal={true}
                          data={coupons}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={_renderItem}
                          onEndReachedThreshold={0}
                          showsHorizontalScrollIndicator={false}
                        />
                      </View>
                    )}
                    {food_types && food_types.length > 0 && (
                      <View
                        style={{
                          // paddingBottom: 15,
                          borderBottomColor: '#deece5',
                          borderBottomWidth: 8,
                        }}>
                        <Text
                          style={{
                            color: '#262626',
                            fontFamily: 'Poppins-Bold',
                            fontSize: 18,
                            marginTop: 10,
                            marginLeft: 15,
                          }}>
                          {t('homePage.quickFilter')}
                        </Text>
                        <FlatList
                          style={{ margin: 10 }}
                          horizontal={true}
                          data={food_types}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={poprenderItem}
                          onEndReachedThreshold={0}
                          showsHorizontalScrollIndicator={false}
                        />
                      </View>
                    )}
                    {top_new_cooks && top_new_cooks.length > 0 && (
                      <View>
                        <View
                          style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 20,
                            paddingTop: 15,
                          }}>
                          <Text
                            style={{
                              color: '#262626',
                              fontFamily: 'Poppins-Bold',
                              fontSize: 18,
                            }}>
                            {t('homePage.trySomethingNew')}
                          </Text>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('CookSeeAll', {
                                type: 'try_something_new',
                              })
                            }>
                            <Text
                              style={{ fontSize: 13, fontFamily: 'Poppins-Regular' }}>
                              {t('homePage.seeAll')}{' '}
                            </Text>
                          </TouchableOpacity>
                        </View>

                        <View>
                          <View style={{ marginLeft: 0 }}>
                            <Carousel
                              loop={false}
                              data={top_new_cooks}
                              renderItem={newrenderItem}
                              sliderWidth={BannerCarouselImg}
                              itemWidth={350}
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
                    {(top_rated_cooks && top_rated_cooks.length > 0) || (nearby_cooks && nearby_cooks.length > 0) || (nearby_cooks && nearby_cooks.length > 0) ?
                      <View>
                        {top_rated_cooks && top_rated_cooks.length > 0 && (
                          <View>
                            <View
                              style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingHorizontal: 20,
                                // paddingTop: 15,
                              }}>
                              <Text
                                style={{
                                  color: '#262626',
                                  fontFamily: 'Poppins-Bold',
                                  fontSize: 18,
                                }}>
                                {t('homePage.topRatedCooks')}
                              </Text>
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate('CookSeeAll', {
                                    type: 'top_rated_cooks',
                                  })
                                }>
                                <Text
                                  style={{ fontSize: 13, fontFamily: 'Poppins-Regular' }}>
                                  {t('homePage.seeAll')}{' '}
                                </Text>
                              </TouchableOpacity>
                            </View>

                            <View>
                              <View style={{ marginLeft: 0 }}>
                                <Carousel
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
                                />
                              </View>
                            </View>
                          </View>
                        )}
                        {nearby_cooks && nearby_cooks.length > 0 && (
                          <View>
                            <Text
                              style={{
                                color: '#262626',
                                fontFamily: 'Poppins-Bold',
                                fontSize: 18,
                                // marginTop: 20,
                                marginLeft: 25,
                              }}>
                              {t('homePage.cookNearByYou')}
                            </Text>
                            <FlatList
                              style={{ margin: 10, marginLeft: 0, marginRight: 25 }}
                              data={nearby_cooks}
                              keyExtractor={(item, index) => index.toString()}
                              renderItem={newrenderItem}
                              onEndReachedThreshold={0}
                            />
                          </View>
                        )}
                      </View>
                      :
                      <View style={{ marginTop: 10 }}>
                        <Loader />
                      </View>
                    }
                  </View>
                </View>
              </View>
            );
          }}
        />
      ) : (
        <Text></Text>
      )}

      <View>
        {modal && (
          <Modal transparent={false} visible={modal}>
            <Loader />
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  couponBack: {
    width: 180,
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBack: {
    width: 90,
    height: 90,
    backgroundColor: '#09b44d',
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

  h2: {
    color: '#262626',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    marginTop: 10,
    marginLeft: 15,
    // marginBottom: 10,
  },
  package: {
    color: '#262626',
    fontFamily: 'Poppins-Bold',
    fontSize: 13,
    marginTop: 5,
    textAlign: 'center',
    lineHeight: 25,
    textTransform: 'uppercase',
  },
  offer: {
    color: '#262626',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginTop: 5,
    textAlign: 'center',
    marginLeft: 8,
    lineHeight: 31,
    textTransform: 'uppercase',
  },

  delLoc: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center'
  },
});

export default HomeNew;
