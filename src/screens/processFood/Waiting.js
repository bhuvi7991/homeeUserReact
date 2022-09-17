import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { locationIcon, timingIcon, qtyIcon, photo1 } from '../../assets/img/Images'


const Waiting = () => {
  return (
    <ScrollView>
      <View style={{ flexDirection: 'row', paddingHorizontal: 10, }}>
        <View style={{ flex: 3, }}>
          <View style={{ width: '100%', borderRadius: 5, }}>
            <Image source={photo1} style={{ width: '100%', height: 150, borderRadius: 5, height: '100%' }} />
          </View>
        </View>
        <View style={{ flex: 5, paddingLeft: 8 }}>
          <Text style={{ fontSize: 15, fontFamily: 'Poppins-Bold' }} > Pomegran Curd Rice</Text>
          <View style={styles.delLoc}>
            <Image style={{ width: 18, height: 17.5, }} source={qtyIcon} />
            <Text style={{ fontSize: 12.5, fontFamily: 'Poppins-Regular', alignItems: 'center', justifyContent: 'center', marginLeft: 6 }} >
              South Indian
            </Text>
          </View>
          <View style={styles.delLoc}>
            <Image style={{ width: 18, height: 18, }} source={timingIcon} />
            <Text style={{ fontSize: 12.5, fontFamily: 'Poppins-Regular', alignItems: 'center', justifyContent: 'center', marginLeft: 6 }} >Delivery - 9:40 AM</Text>
          </View>
          <View style={styles.delLoc}>
            <Image style={{ width: 14, height: 20.3, }} source={locationIcon} />
            <Text style={{ fontSize: 12.5, fontFamily: 'Poppins-Regular', alignItems: 'center', justifyContent: 'center', marginLeft: 6 }} >
              Vadapalani
            </Text>
          </View>
          <View style={styles.delLoc}>
            <TouchableOpacity style={{ backgroundColor: '#49bd58', borderRadius: 50, paddingVertical: 7, paddingHorizontal: 20, marginRight: 10 }}>
              <Text style={{ fontSize: 12.5, fontFamily: 'Poppins-Regular', color: '#fff', }}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: '#e6b137', borderRadius: 50, paddingVertical: 7, paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 12.5, fontFamily: 'Poppins-Regular', color: '#fff', }}>Reject</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  delLoc: {
    flexDirection: 'row',
    marginTop: 8,
  }
})
export default Waiting;
