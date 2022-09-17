import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native';
import {
  arrow,
  photo1,
  filterIcon,
  timingIcon,
  offerIcon,
} from '../assets/img/Images';

const ProductList = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [filterVis, setFilterVis] = useState(false);

  const handleBtn = val => {
    setFilterVis(!filterVis);
  };

  return (
    <ScrollView>
      <ImageBackground source={photo1} style={{ width: '100%', height: 280 }}>
        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', height: 280 }}>
          <View style={{ paddingVertical: 12, paddingHorizontal: 15 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={arrow} style={{ width: 11, height: 20 }} />
            </TouchableOpacity>
            <Text
              style={{
                color: '#fff',
                fontSize: 31,
                fontFamily: 'Poppins-Bold',
                textTransform: 'uppercase',
                marginTop: 25,
                marginRight: 35,
                lineHeight: 40,
              }}>
              {t("productListPage.trySomthingNewAtHomelyFoodz")}
            </Text>
            <Text
              style={{
                color: '#beedd0',
                fontFamily: 'Poppins-Regular',
                fontSize: 16,
                marginTop: 14,
              }}>
              {t("productListPage.useCode")}TRY Homee Foodz
            </Text>
          </View>
        </View>
      </ImageBackground>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 8,
          marginBottom: 10,
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#09b44d',
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
            marginTop: 10,
          }}>
          {t("productListPage.homelyFoodzNearby")}
        </Text>
        <TouchableOpacity
          onPress={handleBtn}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={filterIcon}
            style={{ width: 19, height: 24, paddingTop: 5, paddingRight: 5 }}
          />
          <Text
            style={{
              color: '#000',
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
              marginTop: 12,
            }}>
            {t("productListPage.sortOrFilter")}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('FoodDetail')}
        style={{ flexDirection: 'row', paddingHorizontal: 10, marginBottom: 25 }}>
        <View style={{ flex: 4 }}>
          <View style={{ width: '100%', borderRadius: 5 }}>
            <Image
              source={photo1}
              style={{ width: '100%', height: 170, borderRadius: 5 }}
            />
          </View>
        </View>
        <View style={{ flex: 5, paddingLeft: 8 }}>
          <Text style={{ fontSize: 16, fontFamily: 'Poppins-Bold' }}>
            {' '}
            Iniya Kadamban
          </Text>

          <View style={styles.delLoc}>
            <Text
              style={{
                fontSize: 14.5,
                fontFamily: 'Poppins-Regular',
                alignItems: 'center',
                lineHeight: 23,
                justifyContent: 'center',
                marginLeft: 3,
              }}>
              Vadapalani, Adhav Street, Melai salai, Chennai, Tamilnadu.
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
              {' '}
              4.3 . 30sec . ₹ 245
            </Text>
          </View>
          <View
            style={[
              styles.delLoc,
              {
                paddingTop: 10,
                marginTop: 10,
                borderColor: '#e2e2e2',
                borderTopWidth: 1,
              },
            ]}>
            <Image style={{ width: 18, height: 18 }} source={offerIcon} />
            <Text
              style={{
                fontSize: 14.5,
                fontFamily: 'Poppins-Regular',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 6,
              }}>
              {t("productListPage.tryHomelyFoodz")}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {filterVis ? (
        <View
          style={{
            backgroundColor: '#fff',
            position: 'absolute',
            marginTop: 280,
            top: 0,
            width: '100%',
            height: 350,
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              padding: 20,
              borderBottomWidth: 1,
              borderBottomColor: '#c6c6c6',
            }}>
            <Text style={{ color: '#000', fontFamily: 'Poppins-Bold', fontSize: 18 }}>
              {t("productListPage.sortOrFilter")}
            </Text>
            <Text
              style={{ color: '#09b44d', fontFamily: 'Poppins-Regular', fontSize: 18 }}>
              {t("productListPage.clearAll")}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 2, backgroundColor: '#ddf3e5', height: '100%' }}>
              <Text style={styles.sortHead}> {t("productListPage.sort")}</Text>
              <Text style={styles.sortHead}> {t("productListPage.foodzType")}</Text>
              <Text style={styles.sortHead}> {t("productListPage.cuisines")}</Text>
            </View>
            <View style={{ flex: 3, backgroundColor: '#fff', padding: 15 }}>
              <Text
                style={{ fontFamily: 'Poppins-Bold', color: '#000', fontSize: 15 }}>
                {t("productListPage.sortByPrice")}
              </Text>
              <Text style={styles.sortDet}> {t("productListPage.sort")}</Text>
              <Text style={styles.sortDet}> {t("productListPage.foodzType")}</Text>
              <Text style={styles.sortDet}> {t("productListPage.cuisines")}</Text>
              <TouchableOpacity
                style={{
                  marginTop: 25,
                  justifyContent: 'center',
                  width: '100%',
                }}>
                <Text
                  style={{
                    backgroundColor: '#09b44d',
                    borderRadius: 50,
                    color: '#fff',
                    textAlign: 'center',
                    paddingVertical: 8,
                    fontFamily: 'Poppins-Bold',
                    fontSize: 21,
                    width: 150,
                  }}>
                  {t("productListPage.apply")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}
      <View></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  delLoc: {
    flexDirection: 'row',
    marginTop: 5,
    paddingTop: 2,
  },
  sortHead: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    paddingVertical: 13,
    paddingHorizontal: 15,
    color: '#000',
    borderColor: '#d4e4d8',
    borderBottomWidth: 1,
  },
  sortDet: {
    color: '#666',
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
});

export default ProductList;
