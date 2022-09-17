import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const BannerCarouselImg = Dimensions.get('window').width;

// const categoriesImage = [
//   {
//     backgroundImg: require('../assets/img/coupon/1.png'),
//     icon: require('../assets/img/coupon/icon.png'),
//     package: '-Super Exclusive-',
//     offer: 'Buy 1 Get 1 Free',
//   },
//   {
//     backgroundImg: require('../assets/img/coupon/2.png'),
//     icon: require('../assets/img/coupon/icon.png'),
//     package: '-Super Exclusive-',
//     offer: 'Buy 1 Get 1 Free',
//   },
//   {
//     backgroundImg: require('../assets/img/coupon/3.png'),
//     icon: require('../assets/img/coupon/icon.png'),
//     package: '-Super Exclusive-',
//     offer: 'Buy 1 Get 1 Free',
//   },
// ];

const Categories = () => {
  const _renderItem = ({ item, index }) => {
    return (
      <View>
        <ImageBackground style={styles.couponBack} source={item.backgroundImg}>
          <View style={styles.iconBack}>
            <Image source={item.icon} style={styles.carouselImg} />
          </View>
          <Text style={styles.package}>{item.package}</Text>
          <Text style={styles.offer}>{item.offer}</Text>
        </ImageBackground>
      </View>
    );
  };
  return (
    <View style={{ paddingBottom: 15, borderBottomColor: '#deece5', borderBottomWidth: 8, }}>
      <Text style={styles.h2}>Coupons For You</Text>
      {/* <Carousel
        loop={true}
        data={categoriesImage}
        renderItem={_renderItem}
        sliderWidth={BannerCarouselImg}
        itemWidth={190}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        activeSlideAlignment={'start'}
        contentContainerCustomStyle={{
          height: 240,
          marginLeft: 10,
          marginTop: 0,
        }}
      /> */}
    </View>
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
    width: 100,
    height: 100,
    backgroundColor: '#09b44d',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselImg: {
    width: 80,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

  h2: {
    color: '#262626',
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 10
  },
  package: {
    color: '#262626',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
    marginLeft: 8,
    lineHeight: 25,
    textTransform: 'uppercase',
  },
  offer: {
    color: '#262626',
    fontFamily: 'Poppins-Bold',
    fontSize: 25,
    marginTop: 5,
    textAlign: 'center',
    marginLeft: 8,
    lineHeight: 31,
    textTransform: 'uppercase',
  },
});

export default Categories;
