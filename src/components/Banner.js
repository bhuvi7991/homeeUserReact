import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Image, StyleSheet, Dimensions, Modal } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Loader from '../screens/Loader';

const BannerCarouselImg = Dimensions.get('window').width;

const Banner = (props) => {
  const [banner, setBanner] = useState([]);
  const [isready, setIsready] = useState(false);
  const [modal, setModal] = useState(false);
  const _renderItem = ({ item, index }) => {
    return <Image source={{ uri: item.image }} style={styles.carouselImg} />;
  };
  useEffect(() => {
    setModal(true);
    // let arr = [];
    if (props?.value && props.value.length > 0) {
      setBanner(props.value);
      setIsready(true);
      // props.value.map((item) => {
      //   console.log(item);
      //   arr.push(item);
      // })
    }
    setModal(false);
    // console.log(arr);
  }, [])
  const [bannerImage, setbannerCarousel] = useState([
    {
      image: require('../assets/img/banner/1.png'),
      title: 'banner1',
    },
    {
      image: require('../assets/img/banner/2.png'),
      title: 'banner1',
    },
  ]);

  return (
    <View>
      {isready && modal == false &&
        <Carousel
          loop={true}
          data={banner}
          renderItem={_renderItem}
          sliderWidth={BannerCarouselImg}
          itemWidth={395}
          inactiveSlideScale={0.98}
          inactiveSlideOpacity={0.5}
          autoplay={true}
          autoplayDelay={1000}
          autoplayInterval={3000}
          activeSlideAlignment={'center'}
          contentContainerCustomStyle={{ height: 200, marginLeft: 0 }}
        />
      }
      <View>
        {modal &&
          <Modal transparent={false} visible={modal}>
            <Loader />
          </Modal>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselImg: {
    width: '100%',
    height: 200,
  },
});

export default Banner;
