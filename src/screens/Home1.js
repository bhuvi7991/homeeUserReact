import React from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import {
  wcBg,
  nav,
  switchTgl,
  notif,
  receive,
  complete,
  queue,
  delivery,
  orderImg,
} from '../assets/img/Images';

const Home = ({ navigation }) => {
  return (
    <ScrollView>
      <StatusBar barStyle="light-content" backgroundColor="#09b44d" />
      <View style={{ flexDirection: 'column' }}>
        <ImageBackground
          source={wcBg}
          style={{
            width: '100%',
            height: 200,
            borderBottomEndRadius: 30,
            borderBottomStartRadius: 30,
            overflow: 'hidden',
          }}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                padding: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 40,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onPress={() => navigation.toggleDrawer()}
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 15,
                  }}>
                  <Image style={{ width: 28, height: 20 }} source={nav} />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text style={[styles.pageTitle, { alignItems: 'center' }]}>
                    Homee Foodz
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                  <Image source={switchTgl} style={{ width: 38, height: 22 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingRight: 20, paddingLeft: 10 }}>
                  <Image source={notif} style={{ width: 22, height: 26 }} />
                  <Text style={styles.notifCnt}>25</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ flex: 2 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.wcTxt}>Welcome Back</Text>
              <Text style={styles.nameTxt}>Rubesh John Raj</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Text style={styles.profTxt}>Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>


      <View
        style={{
          padding: '0.5%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          <View style={[styles.boxDash, { backgroundColor: '#eee6ba' }]}>
            <Image source={receive} style={styles.dashIcon} />
            <Text style={styles.cntTxt}>65</Text>
            <Text style={[styles.constTxt, { color: '#978719' }]}>
              Total Recived Order
            </Text>
          </View>
          <View style={[styles.boxDash, { backgroundColor: '#f4daef' }]}>
            <Image source={complete} style={styles.dashIcon} />
            <Text style={styles.cntTxt}>65</Text>
            <Text style={[styles.constTxt, { color: '#b86ea9' }]}>
              Total Recived Order
            </Text>
          </View>
          <View style={[styles.boxDash, { backgroundColor: '#cbd8f6' }]}>
            <Image source={queue} style={styles.dashIcon} />
            <Text style={styles.cntTxt}>65</Text>
            <Text style={[styles.constTxt, { color: '#4e6fb3' }]}>
              Total Recived Order
            </Text>
          </View>
          <View style={[styles.boxDash, { backgroundColor: '#d1f0dd' }]}>
            <Image source={delivery} style={styles.dashIcon} />
            <Text style={styles.cntTxt}>65</Text>
            <Text style={[styles.constTxt, { color: '#09b44d' }]}>
              Total Recived Order
            </Text>
          </View>
        </View>
        <View
          style={{
            borderRadius: 20,
            backgroundColor: '#c4e3f8',
            padding: 15,
            marginTop: 5,
            width: '97%',
            marginBottom: 80,
          }}>
          <Text style={styles.orderTxt}>Order Reports</Text>
          <TouchableOpacity onPress={() => navigation.navigate('OrderReport')}>
            <Text style={styles.reportBtn}>View Report</Text>
          </TouchableOpacity>
          <Image source={orderImg} style={styles.orderImg} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wcTxt: {
    color: '#fff',
    fontSize: 18,
    color: '#000',
    fontFamily: 'Poppins-Bold',
  },
  pageTitle: {
    color: '#fff',
    fontSize: 21,
    fontFamily: 'Poppins-Bold',
    marginTop: 12,
  },
  nameTxt: {
    color: '#fff',
    fontSize: 25,
    color: '#fff',
    marginVertical: 2,
    fontFamily: 'Poppins-Bold',
  },
  profTxt: {
    color: '#fff',
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    paddingVertical: 3,
  },
  notifCnt: {
    position: 'absolute',
    top: 0,
    right: 7,
    backgroundColor: '#09b44d',
    borderColor: '#fff',
    borderWidth: 1.7,
    borderRadius: 25,
    height: 20,
    width: 22,
    color: '#fff',
    textAlign: 'center',
    fontSize: 9,
    paddingTop: 4,
    fontFamily: 'Poppins-Bold',
  },

  //dashboard start
  boxDash: {
    width: '46.9%',
    margin: '1.5%',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
  dashIcon: {
    width: 70,
    height: 70,
  },
  cntTxt: {
    color: '#fff',
    fontSize: 33,
    marginTop: 15,
    color: '#000',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  constTxt: {
    color: '#fff',
    fontSize: 17.5,
    marginTop: 14,
    fontFamily: 'Poppins-Bold',
    textAlign: 'right',
  },
  //dashboard end
  //order start
  orderTxt: {
    color: '#000',
    fontSize: 17.5,
    marginTop: 14,
    fontFamily: 'Poppins-Bold',
  },
  reportBtn: {
    borderRadius: 50,
    backgroundColor: '#09b44d',
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    marginTop: 7,
    width: 140,
  },
  orderImg: {
    width: 150,
    height: 88.5,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  //dashboard end
});

export default Home;
