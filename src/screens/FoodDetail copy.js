import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { arrow, searchIcon, wishListIcon, wishListFillIcon, vegIcon, costIcon, deliverycon, photo1, forkIcon, cartIcon } from '../assets/img/Images';

const FoodDetail = ({ navigation }) => {
  const [vegCheckBox, setVegCheckBox] = useState(false)
  const [nonVegCheckBox, setNonVegCheckBox] = useState(false)

  const [wishList, setWishList] = useState(false);
  const [arrowrot, setArrowrot] = useState(false);
  const [condiArrowrot, setCondiArrowrot] = useState(false);
  const [recomFood, setRecomFood] = useState(false)
  const [condiFood, setCondiRecomFood] = useState(false)

  const wishListHandle = () => {
    setWishList(!wishList)
  }
  const arwhandle = () => {
    setArrowrot(!arrowrot),
      setRecomFood(!recomFood)
  }
  const condihandle = () => {
    setCondiArrowrot(!condiArrowrot),
      setCondiRecomFood(!condiFood)
  }

  return (
    <SafeAreaView>
      <View style={{ paddingBottom: 20, borderBottomColor: '#e4e3e3', borderBottomWidth: 1, }}>
        <View style={{ justifyContent: "space-between", flexDirection: 'row' }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                paddingHorizontal: 15,
                paddingVertical: 15,
              }}>
              <Image style={{ width: 11, height: 19, tintColor: '#000' }} source={arrow} />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontFamily: 'Poppins-Bold', color: '#000', marginTop: 12, }}>Rubav Johny dfff sssd</Text>
          </View>
          <View style={{ flexDirection: 'row', marginRight: 8 }}>
            <TouchableOpacity onPress={wishListHandle} style={{ paddingVertical: 15, paddingHorizontal: 8 }}>

              {
                wishList
                  ?
                  <Image source={wishListIcon} style={{ width: 23.5, height: 20, }} />
                  :
                  <Image source={wishListFillIcon} style={{ width: 23.5, height: 20, }} />

              }

            </TouchableOpacity>
            <TouchableOpacity style={{ paddingVertical: 15, paddingHorizontal: 8 }}>
              <Image source={searchIcon} style={{ width: 23.5, height: 22, }} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ justifyContent: "flex-start", flexDirection: 'row', marginHorizontal: 20 }}>
          <Text style={{ fontSize: 14, fontFamily: 'Poppins-Regular', color: '#000', lineHeight: 20 }}>#5, Brundha Street, Jafarkhan Pet, K.K Nagar, Vadapalani - 600 089</Text>
        </View>
      </View>


      <View style={{ paddingHorizontal: 20, paddingVertical: 25, justifyContent: 'space-around', flexDirection: 'row', borderBottomColor: '#e4e3e3', borderBottomWidth: 1, }}>
        <View style>
          <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
            <Image source={deliverycon} style={{ width: 39, height: 24.5 }} />
            <Text style={{ fontSize: 18, fontFamily: 'Poppins-Bold', color: '#000', marginTop: 5, marginLeft: 3 }}> 30 Mins</Text>
          </View>
          <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15, marginVertical: 7 }}>Delivery Time</Text>
        </View>

        <View style={{ borderRightWidth: 1, borderColor: "#a8d8bb", }}></View>
        <View>
          <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
            <Image source={costIcon} style={{ width: 20, height: 29 }} />
            <Text style={{ fontSize: 18, fontFamily: 'Poppins-Bold', color: '#000', marginTop: 5, marginLeft: 3 }}> ₹300</Text>
          </View>
          <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15, marginVertical: 7 }}>Cost For 2</Text>
        </View>
        <View>
        </View>
      </View>


      <View style={{ flexDirection: 'row', padding: 15, alignItems: 'center', borderColor: '#d5e7dd', borderBottomWidth: 4 }}>
        <Image source={vegIcon} style={{ width: 35, height: 35 }} />
        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 16, marginLeft: 15 }}>Pure Veg</Text>
      </View>

      <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between', }}>
        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 18 }}>Recommended(3)</Text>
        <TouchableOpacity onPress={arwhandle} style={{ padding: 8 }}>
          {arrowrot ?
            <Image source={arrow} style={{ width: 10, height: 17, tintColor: '#000', transform: [{ rotate: '-90deg' }], }} /> :
            <Image source={arrow} style={{ width: 10, height: 17, tintColor: '#000', transform: [{ rotate: '90deg' }] }} />}
        </TouchableOpacity>
      </View>
      <View style={{ borderColor: '#d5e7dd', borderBottomWidth: 4 }}>

        {
          !recomFood ? null :

            <View>
              <TouchableOpacity onPress={() => navigation.navigate('FoodDetail')} style={{ flexDirection: 'row', paddingHorizontal: 10, marginBottom: 25 }}>
                <View style={{ flex: 3, }}>
                  <View style={{ width: '100%', borderRadius: 5, }}>
                    <Image source={photo1} style={{ width: '100%', height: 150, borderRadius: 5, }} />
                  </View>
                </View>
                <View style={{ flex: 5, paddingLeft: 14 }}>
                  <View style={{ width: 26, height: 26, borderColor: '#bbb', justifyContent: 'center', alignItems: 'center', borderWidth: 2, marginBottom: 8 }}>
                    <View style={{ width: 13, height: 13, borderRadius: 59, backgroundColor: '#09b44d' }}></View>
                  </View>
                  <Text style={{ fontSize: 16, fontFamily: 'Poppins-Bold' }} >Panner Cukka</Text>
                  <Text style={{ fontSize: 16, fontFamily: 'Poppins-Bold', marginTop: 5 }} > ₹300
                  </Text>
                  <TouchableOpacity style={{ marginTop: 15 }}><Text style={{ color: '#fff', backgroundColor: '#09b44d', width: 100, borderRadius: 28, padding: 10, fontFamily: 'Poppins-Bold', textAlign: 'center', fontSize: 16 }}>ADD</Text></TouchableOpacity>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('FoodDetail')} style={{ flexDirection: 'row', paddingHorizontal: 10, marginBottom: 25 }}>
                <View style={{ flex: 3, }}>
                  <View style={{ width: '100%', borderRadius: 5, }}>
                    <Image source={photo1} style={{ width: '100%', height: 150, borderRadius: 5, }} />
                  </View>
                </View>
                <View style={{ flex: 5, paddingLeft: 14 }}>
                  <View style={{ width: 26, height: 26, borderColor: '#bbb', justifyContent: 'center', alignItems: 'center', borderWidth: 2, marginBottom: 8 }}>
                    <View style={{ width: 13, height: 13, borderRadius: 59, backgroundColor: '#09b44d' }}></View>
                  </View>
                  <Text style={{ fontSize: 16, fontFamily: 'Poppins-Bold' }} >Panner Cukka</Text>
                  <Text style={{ fontSize: 16, fontFamily: 'Poppins-Bold', marginTop: 5 }} > ₹300
                  </Text>
                  <TouchableOpacity style={{ marginTop: 15 }}><Text style={{ color: '#fff', backgroundColor: '#09b44d', width: 100, borderRadius: 28, padding: 10, fontFamily: 'Poppins-Bold', textAlign: 'center', fontSize: 16 }}>ADD</Text></TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
        }
      </View>

      <View style={{ paddingTop: 18, paddingBottom: 10, borderColor: '#d5e7dd', borderBottomWidth: 4 }}>
        <View style={{ marginHorizontal: 20, justifyContent: "space-between", flexDirection: 'row' }}>
          <Text style={{ fontSize: 17, fontFamily: 'Poppins-Bold', color: '#000', marginBottom: 8 }}>Specialized Food</Text>
        </View>
        <View style={{ marginHorizontal: 20, paddingBottom: 10, borderBottomColor: '#e4e3e3', borderBottomWidth: 1, }}>
          <Text style={{ fontSize: 15.5, fontFamily: 'Poppins-Regular', color: '#09b44d', marginBottom: 8 }}>Dosa Varieties</Text>
          <View>
            <Text style={{ fontSize: 14, marginBottom: 5, fontFamily: 'Poppins-Regular', color: '#000', }}>- Onion Dasa</Text>
            <Text style={{ fontSize: 14, marginBottom: 5, fontFamily: 'Poppins-Regular', color: '#000', }}>- Masal Dasa</Text>
            <Text style={{ fontSize: 14, marginBottom: 5, fontFamily: 'Poppins-Regular', color: '#000', }}>- Ghee Dasa</Text>
          </View>
        </View>
        <View style={{ marginHorizontal: 20, paddingBottom: 10, paddingTop: 10, borderBottomColor: '#e4e3e3', }}>
          <Text style={{ fontSize: 15.5, fontFamily: 'Poppins-Regular', color: '#09b44d', marginBottom: 8 }}>Idly Varieties</Text>
          <View>
            <Text style={{ fontSize: 14, marginBottom: 5, fontFamily: 'Poppins-Regular', color: '#000', }}>- Bengalore Idly</Text>
            <Text style={{ fontSize: 14, marginBottom: 5, fontFamily: 'Poppins-Regular', color: '#000', }}>- Mini Idly</Text>
            <Text style={{ fontSize: 14, marginBottom: 5, fontFamily: 'Poppins-Regular', color: '#000', }}>- Sambar Idly</Text>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 10, justifyContent: 'space-between', }}>
        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 18 }}>SouthIndian</Text>
        <TouchableOpacity onPress={condihandle} style={{ padding: 8 }}>
          {arrowrot ?
            <Image source={arrow} style={{ width: 10, height: 17, tintColor: '#000', transform: [{ rotate: '-90deg' }], }} /> :
            <Image source={arrow} style={{ width: 10, height: 17, tintColor: '#000', transform: [{ rotate: '90deg' }] }} />}
        </TouchableOpacity>
      </View>
      <View style={{ marginLeft: 15, }}>
        {
          !condiFood ? null :
            <View>
              <Text style={{ fontSize: 14, marginBottom: 5, fontFamily: 'Poppins-Regular', color: '#000', }}>- Bengalore Idly</Text>
              <Text style={{ fontSize: 14, marginBottom: 5, fontFamily: 'Poppins-Regular', color: '#000', }}>- Mini Idly</Text>
              <Text style={{ fontSize: 14, marginBottom: 5, fontFamily: 'Poppins-Regular', color: '#000', }}>- Sambar Idly</Text>
            </View>
        }
      </View>
      <View style={{ justifyContent: 'center', marginVertical: 15, alignItems: 'center', width: '100%' }}>
        <TouchableOpacity style={{ backgroundColor: '#000', width: 230, padding: 14, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', borderRadius: 70 }}>
          <Image source={forkIcon} style={{ width: 17, height: 29 }} />
          <Text style={{ color: '#fff', fontFamily: 'Poppins-Bold', marginLeft: 10, fontSize: 18 }}>Browser Menu</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('cartPage')} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, width: '100%', backgroundColor: '#09b44d', borderTopLeftRadius: 25, borderTopRightRadius: 25, height: 60, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#fff', fontFamily: 'Poppins-Regular', fontSize: 16 }}>2 Items</Text>
          <View style={{ width: 2, height: 22, backgroundColor: '#d5e7dd', marginHorizontal: 10 }} ></View>
          <Text style={{ color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 16 }}>₹ 500</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 16, marginRight: 10 }}>View cart</Text>
          <Image source={cartIcon} style={{ width: 23, height: 20 }} />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  pageTitle: {
    color: '#fff',
    fontSize: 21,
    fontFamily: 'Poppins-Bold',
    marginTop: 12,
  },
})

export default FoodDetail;
