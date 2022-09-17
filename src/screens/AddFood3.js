import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Alert, Button, ActivityIndicator } from 'react-native';
import { nav, switchTgl, notif } from '../assets/img/Images';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';

const AddFood = ({ navigation }) => {

  const [isLoadingData, setIsLoadingData] = useState(true)
  const [timingFood, setTimingFood] = useState([]);

  useEffect(() => {
    getListPhotos();
    return () => {

    }
  }, [])


  getListPhotos = () => {
    const apiURL = 'https://jsonplaceholder.typicode.com/photos';
    fetch(apiURL)
      .then((res) => res.json())
      .then((resJson) => {
        setTimingFood(resJson);
      }).catch((err) => {
      }).finally(() => setIsLoadingData(false))
  }

  onCheckedHandling = (itemSelected, index) => {
    const newData = timingFood.map(item => {
      if (item.id == itemSelected.id) {
        return {
          ...item,
          selected: !item.selected
        }
      }
      return {
        ...item,
        selected: item.selected
      }
    })
    setTimingFood(newData)
  };


  renderItem = ({ item, index }) => {
    return (
      <View>
        <Text>{item.title}</Text>
        <CheckBox
          disabled={false} onAnimationType='fill'
          offAnimationType='fade'
          boxType='square'
          onFillColor="#000"
          onTintColor='red'
          tintColor='red'
          onValueChange={() => onCheckedHandling(item, index)}
        />
      </View>
    )
  }

  onShowItemSelected = () => {
    const listSelected = timingFood.filter(item => item.selected == true);
    let contentAlert = '';
    listSelected.forEach(item => {
      contentAlert = contentAlert + `$(item.id) .` + item.title + '\n';
    })
    Alert.alert(contentAlert);
  }

  return (
    <View style={{ flexDirection: 'column' }}>
      <View
        style={{
          height: 55,
          backgroundColor: '#09b44d',
        }}>
        <View
          style={{
            padding: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
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
      <View style={styles.checkBox}>
        {isLoadingData ? <ActivityIndicator /> : (<FlatList
          data={timingFood}
          renderItem={renderItem}
          keyExtractor={item => `key- ${item.id} `} />
        )}


        {/* <TouchableOpacity
          style={styles.checkBox}
          key={key}
          onPress={onCheckedHandling(items.val)}>
          <CheckBox value={items.checked} onValueChange={() => { onCheckedHandling(val) }} />
          <Text>{items.name}</Text>
        </TouchableOpacity> */}
      </View>
      <View>
        <Button title='butn' onPress={onShowItemSelected} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  labelTxt: {
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
    color: '#09b44d',
    marginBottom: 0,
    paddingBottom: 0,
  },
  picker: {
    fontSize: 23,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    backgroundColor: '#000',
    borderColor: '#c5c5c5',
    borderWidth: 1,
  },
  inputBox: {
    fontSize: 21,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    borderBottomColor: '#a3d8b8',
    borderBottomWidth: 0.7,
    marginBottom: 10,
    marginTop: 15,
  },
  checkBox: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // paddingHorizontal: 7,
    // paddingVertical: 3,
    color: '#000',
    height: 600,
  },
  checkBoxTocuh: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  checkLabel: {
    color: '#000',
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
  },
});

export default AddFood;
