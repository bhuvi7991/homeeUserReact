import React, { useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { locationIcon, timingIcon, qtyIcon, photo1, tagIcon } from '../../assets/img/Images'


const Chef = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>

      <View style={{ flexDirection: 'row', paddingHorizontal: 10, marginBottom: 10, }}>
        <View style={{ flex: 2, }}>
          <View style={{ width: '100%', borderRadius: 5, height: 100, }}>
            <Image source={photo1} style={{ width: '100%', borderRadius: 5, height: '100%' }} />
          </View>
        </View>
        <View style={{ flex: 5, paddingLeft: 8 }}>
          <Text style={{ fontSize: 15, fontFamily: 'Poppins-Bold' }} > Pomegran Curd Rice</Text>
          <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', alignItems: 'center', justifyContent: 'center', marginLeft: 4, marginTop: 5 }} >
            South Indian
          </Text>
          <View style={styles.delLoc}>
            <Image style={{ width: 18, height: 18, }} source={timingIcon} />
            <Text style={{ fontSize: 14, fontFamily: 'Poppins-Regular', alignItems: 'center', justifyContent: 'center', marginLeft: 6, marginRight: 20 }} >25 Min</Text>
          </View>
          <Text style={{ fontSize: 17, fontFamily: 'Poppins-Bold', alignItems: 'center', justifyContent: 'center', marginLeft: 4, marginTop: 7 }} >
            ₹. 200
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', paddingHorizontal: 10, marginBottom: 10, }}>
        <View style={{ flex: 2, }}>
          <View style={{ width: '100%', borderRadius: 5, height: 100, }}>
            <Image source={photo1} style={{ width: '100%', borderRadius: 5, height: '100%' }} />
          </View>
        </View>
        <View style={{ flex: 5, paddingLeft: 8 }}>
          <Text style={{ fontSize: 15, fontFamily: 'Poppins-Bold' }} > Pomegran Curd Rice</Text>
          <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', alignItems: 'center', justifyContent: 'center', marginLeft: 4, marginTop: 5 }} >
            South Indian
          </Text>
          <View style={styles.delLoc}>
            <Image style={{ width: 18, height: 18, }} source={timingIcon} />
            <Text style={{ fontSize: 14, fontFamily: 'Poppins-Regular', alignItems: 'center', justifyContent: 'center', marginLeft: 6, marginRight: 20 }} >25 Min</Text>
          </View>
          <Text style={{ fontSize: 17, fontFamily: 'Poppins-Bold', alignItems: 'center', justifyContent: 'center', marginLeft: 4, marginTop: 7 }} >
            ₹. 200
          </Text>
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
export default Chef;
