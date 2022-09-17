import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
  receive,
  complete,
  queue,
  delivery,
  orderImg,
} from '../assets/img/Images';

const Dashboard = () => {
  return (
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
        <TouchableOpacity>
          <Text style={styles.reportBtn}>View Report</Text>
        </TouchableOpacity>
        <Image source={orderImg} style={styles.orderImg} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxDash: {
    width: '47%',
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
});

export default Dashboard;
