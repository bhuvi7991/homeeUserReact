import React from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { arrow, timingIcon, offerIcon, photo1 } from '../assets/img/Images'

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

const NewSome = () => {
    const _renderItem = ({ item, index }) => {
        return (
            <View style={{ flexDirection: 'row', paddingHorizontal: 10, }}>
                <View style={{ flex: 4, }}>
                    <View style={{ width: '100%', borderRadius: 5, }}>
                        <Image source={photo1} style={{ width: '100%', height: 150, borderRadius: 5, }} />
                    </View>
                </View>
                <View style={{ flex: 5, paddingLeft: 8 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Poppins-Bold' }} > Iniya Kadamban</Text>

                    <View style={styles.delLoc}>
                        <Text style={{ fontSize: 14.5, fontFamily: 'Poppins-Regular', alignItems: 'center', lineHeight: 23, justifyContent: 'center', marginLeft: 3 }}>
                            Vadapalani, Adhav Street, Melai salai, Chennai, Tamilnadu.
                        </Text>
                    </View>
                    <View style={styles.delLoc}>
                        <Image style={{ width: 18, height: 18, }} source={timingIcon} />
                        <Text style={{ fontSize: 13.5, fontFamily: 'Poppins-Bold', alignItems: 'center', justifyContent: 'center', marginLeft: 6 }}> 4.3 . 30sec . ₹ 245</Text>
                    </View>
                    <View style={styles.delLoc}>
                        <Image style={{ width: 18, height: 18, }} source={offerIcon} />
                        <Text style={{ fontSize: 14.5, fontFamily: 'Poppins-Regular', alignItems: 'center', justifyContent: 'center', marginLeft: 6 }} >Try Homely Foodz</Text>
                    </View>
                </View>
            </View>
        );
    };
    return (
        <View style={{ paddingBottom: 15, marginBottom: 90 }}>
            <View style={{ marginLeft: 0 }}>
                <Carousel
                    loop={true}
                    data={categoriesImage}
                    renderItem={_renderItem}
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

    delLoc: {
        flexDirection: 'row',
        marginTop: 5,
    },
})
export default NewSome;
