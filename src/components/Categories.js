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
//     title: 'Pomegran Curd Rice',
//     img: require('../assets/img/categories/1.png'),
//   },
//   {
//     title: 'Sambar Rice',
//     img: require('../assets/img/categories/2.png'),
//   },
//   {
//     title: 'Tomoto Rice',
//     img: require('../assets/img/categories/3.png'),
//   },
//   {
//     title: 'Vegitable Rice',
//     img: require('../assets/img/categories/4.png'),
//   },
// ];

const Categories = () => {
  const _renderItem = ({ item, index }) => {
    return (
      <View>
        <Image source={item.img} style={styles.carouselImg} />
        <Text style={styles.CategoriesName}>{item.title}</Text>
      </View>
    );
  };
  return (
    <View>
      <Text style={styles.h2}>Popular Foods</Text>
      {/* <Carousel
        loop={true}
        data={categoriesImage}
        renderItem={_renderItem}
        sliderWidth={BannerCarouselImg}
        itemWidth={115}
        inactiveSlideScale={1}
        inactiveSlideOpacity={0.8}
        activeSlideAlignment={'center'}
        contentContainerCustomStyle={{
          marginLeft: -5,
          marginTop: 15,
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  carouselImg: {
    width: 95,
    height: 95,
    borderRadius: 100,
    overflow: 'hidden',
  },
  h2: {
    color: '#262626',
    fontFamily: 'Poppins-Bold',
    fontSize: 19,
    marginTop: 20,
    marginLeft: 25,
  },
  CategoriesName: {
    color: '#262626',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    marginTop: 5,
    textAlign: 'center',
    marginLeft: -18,
    lineHeight: 25,
  },
});

export default Categories;
