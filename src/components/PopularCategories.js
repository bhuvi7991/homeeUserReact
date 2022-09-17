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

const categoriesImage = [
  {
    title: 'Offers',
    img: require('../assets/img/popular/offers.png'),
  },
  {
    title: 'Veg Only',
    img: require('../assets/img/popular/veg.png'),
  },
  {
    title: 'Non-Veg',
    img: require('../assets/img/popular/non-veg.png'),
  },
  {
    title: 'Top Rated',
    img: require('../assets/img/popular/rate.png'),
  },
];

const PopularCategories = () => {
  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ marginLeft: -25 }}>
        <Image source={item.img} style={styles.carouselImg} />
        <Text style={styles.CategoriesName}>{item.title}</Text>
      </View>
    );
  };
  return (
    <View style={{ paddingBottom: 15, borderBottomColor: '#deece5', borderBottomWidth: 8, }}>
      <Text style={styles.h2}>Popular Foods</Text>
      <View style={{ marginLeft: 0 }}>
        <Carousel
          loop={true}
          data={categoriesImage}
          renderItem={_renderItem}
          sliderWidth={BannerCarouselImg}
          itemWidth={100}
          inactiveSlideScale={1}
          inactiveSlideOpacity={0.8}
          activeSlideAlignment={'center'}
          contentContainerCustomStyle={{
            marginTop: 15,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselImg: {
    width: 70,
    height: 70,
  },
  h2: {
    color: '#262626',
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    marginTop: 20,
    marginLeft: 25,
  },
  CategoriesName: {
    color: '#262626',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    marginTop: 5,
    textAlign: 'center',
    marginLeft: -45,
    lineHeight: 25,
  },
});

export default PopularCategories;
