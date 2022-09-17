import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TextInput,
  View,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
  Modal,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ImageBackground,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  searchIcon,
  emptyIcon,
  distanceIcon,
  tagIcon,
  timingIcon,
  location1,
  riceBowl,
  shop,
  bgvector,
  searchPageBg
} from '../assets/img/Images';
import TopTab from '../Navigation/MenuTopTab';
import { Picker } from '@react-native-picker/picker';
import { applyMiddleware } from 'redux';
import { api } from '../services/index';
import { useFocusEffect } from '@react-navigation/core';
import Loader from './Loader';
import { Dropdown } from 'react-native-element-dropdown';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const Search = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [emptySearch, setEmptySearch] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const [searchType, setSearchType] = useState('dish');
  const [sortType, setSortType] = useState('LH');
  const [foodTypes, setFoodTypes] = useState([]);
  const [foodTypesArr, setFoodTypesArr] = useState(null);
  const [selectedFoodTypesArr, setSelectedFoodTypesArr] = useState([]);
  const [modal, setModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [listItems, setListItems] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [cookList, setCookList] = useState([]);
  const [paginate, setPaginate] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [sortby, setSortby] = useState({ LH: false, HL: false });

  let sort_list = [
    {
      label: t('searchPage.priceLowToHigh'),
      value: 'LH'
    },
    {
      label: t('searchPage.priceHighToLow'),
      value: 'HL'
    },
  ]
  var arr = [];

  // const searchOperation = async value => {
  //   if (value !== '') {
  //     setLoader(true);
  //     var tem = [...foodTypesArr];
  //     foodTypesArr.map((item, index) => {
  //       tem[index] = { id: item.id, selected: false };
  //     });
  //     setFoodTypesArr(tem);
  //     setSelectedFoodTypesArr([]);
  //     var payload = {
  //       type: searchType,
  //       search: searchText,
  //       sort: value,
  //     };

  //     let response = await api.search(payload);
  //     if (searchType == 'cook' && response.status == 'success') {
  //       setListItems(response.cooks);
  //       setPagination(response.pagination);
  //     } else if (searchType == 'dish' && response.status == 'success') {
  //       setListItems(response.menu_items);
  //       setPagination(response.pagination);
  //     }
  //     setLoader(false);
  //   }
  // };
  // const searchChange = async e => {
  //   if (e != null && e !== '') {
  //     setSearchText(e);
  //     setLoader(true);
  //     var tem = [...foodTypesArr];
  //     foodTypesArr.map((item, index) => {
  //       tem[index] = { id: item.id, selected: false };
  //     });
  //     setFoodTypesArr(tem);
  //     setSelectedFoodTypesArr([]);
  //     setSortType('');

  //     setLoader(false);
  //   } else {
  //     setSearchText(null);
  //   }
  // };
  const searchChange = async e => {
    console.log("ranjith", e);
    if (e != null && e != '' && e.length > 0) {
      console.log("enrere");
      setSearchText(e);
      let res = await axios.get(`http://68.183.89.136:3000/search?searchText=${e}&sortBy=${sortType}`);
      console.log("response from ranjith in new node api", sortType, sortby);
      // const response = await JSON.stringify(res.data);
      const foodList = res.data.filter(item => { if (item?.food_image) return item })
      setFoodList(foodList);
      const cookList = res.data.filter(item => { if (!item?.food_image) return item })
      setCookList(cookList);
      // console.log("ranjith", cookList);
      // setListItems(res.data);
      // try {
      //   // return;
      // } catch (err) {
      // }
      setLoader(false);
    } else {
      setListItems([]);
      setFoodList([]);
      setCookList([]);
      setSearchText(null);
    }
  };

  const changeFilter = (filterType) => {
    console.log("anivemvvrvvrevre", filterType);
    if (filterType == "LH") {
      if (sortby.LH) {
        setSortby({ LH: false, HL: false })
        setSortType("LH")
      }
      else if (!sortby.LH) {
        setSortType("LH")
        setSortby({ LH: true, HL: false })
        // searchChange(searchText);
      }
    }
    else if (filterType == "HL") {
      if (sortby.HL) {
        setSortby({ LH: false, HL: false })
        setSortType("LH")
      }
      else {
        console.log("donrrrr");
        setSortType("HL");
        setSortby({ LH: false, HL: true })
        // searchChange(searchText);
      }
    }
  }

  useEffect(() => {
    // (sortby.HL == true && sortby.LH != true) ? setSortType("HL") : setSortType("LH");
    searchChange(searchText);
  }, [sortType])

  const searchSubmit = async () => {
    //   setLoader(true);
    //   if (searchType == 'dish') {
    //     let response = await api.search({ type: searchType, search: searchText });
    //     if (response.status == 'success') {
    //       setListItems(response.menu_items);
    //       setPagination(response.pagination);
    //     }
    //   } else {
    //     let response = await api.search({ type: searchType, search: searchText });
    //     if (response.status == 'success') {
    //       setListItems(response.cooks);
    //       setPagination(response.pagination);
    //     }
    //   }
    //   setLoader(false);
  }


  // const getFoodTypes = async () => {
  //   setModal(true);
  //   let response = await api.getFoodTypes();
  //   if (response.status == 'success') {
  //     setFoodTypes(response.food_types);
  //     response.food_types.map((item, index) => {
  //       arr.push({ id: item.id, selected: false });
  //     });
  //     setFoodTypesArr(arr);
  //   }
  //   setModal(false);
  // };
  // // useEffect(() => {
  // //   getFoodTypes();
  // // }, []);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     getFoodTypes();
  //   }, []),
  // );
  // const selectedFoodType = async (id, index) => {
  //   setLoader(true);
  //   var temp = [...foodTypesArr];
  //   var selecetedArr = [...selectedFoodTypesArr];
  //   if (temp[index].selected == false) {
  //     temp[index] = { id: id, selected: true };
  //     selecetedArr.push(id);
  //   } else {
  //     temp[index] = { id: id, selected: false };
  //     const ex = selecetedArr.indexOf(id);
  //     if (ex > -1) {
  //       selecetedArr.splice(ex, 1);
  //     }
  //   }
  //   var payload = {};
  //   if (sortType != '') {
  //     if (selecetedArr.length > 0) {
  //       payload = {
  //         type: searchType,
  //         search: searchText,
  //         sort: searchType,
  //         food_type: selecetedArr,
  //       };
  //     } else {
  //       payload = {
  //         type: searchType,
  //         search: searchText,
  //         sort: searchType,
  //       };
  //     }
  //   } else {
  //     if (selecetedArr.length > 0) {
  //       payload = {
  //         type: searchType,
  //         search: searchText,
  //         food_type: selecetedArr,
  //       };
  //     } else {
  //       payload = {
  //         type: searchType,
  //         search: searchText,
  //       };
  //     }
  //   }
  //   let response = await api.search(payload);
  //   if (searchType == 'cook' && response.status == 'success') {
  //     setListItems(response.cooks);
  //     setPagination(response.pagination);
  //   } else if (searchType == 'dish' && response.status == 'success') {
  //     setListItems(response.menu_items);
  //     setPagination(response.pagination);
  //   }
  //   setFoodTypesArr(temp);
  //   setSelectedFoodTypesArr(selecetedArr);
  //   setLoader(false);
  // };
  // const changeSort = value => {
  //   setSortType(value);
  //   searchOperation(value);
  // };

  // const changeSearchType = async value => {
  //   setSearchType(value);
  //   setLoader(true);
  //   var tem = [...foodTypesArr];
  //   foodTypesArr.map((item, index) => {
  //     tem[index] = { id: item.id, selected: false };
  //   });
  //   setFoodTypesArr(tem);
  //   setSelectedFoodTypesArr([]);
  //   setSortType('');
  //   if (value == 'dish' && searchText != null) {
  //     let response = await api.search({ type: value, search: searchText });
  //     if (response.status == 'success') {
  //       setListItems(response.menu_items);
  //       setPagination(response.pagination);
  //     }
  //   } else if (value == 'cook' && searchText != null) {
  //     let response = await api.search({ type: value, search: searchText });
  //     if (response.status == 'success') {
  //       setListItems(response.cooks);
  //       setPagination(response.pagination);
  //     }
  //   } else {
  //     setListItems([]);
  //     setPagination(null);
  //     setSelectedFoodTypesArr([]);
  //     setPaginate(1);
  //   }
  //   setLoader(false);
  // };
  const _rederCookList = ({ item, index }) => {
    return (
      <View
        style={{
          paddingTop: 15,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('FoodDetail', item)}
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
          }}>
          <View style={{ flex: 2 }}>
            <View style={{ width: '100%', borderRadius: 5, height: 100 }}>
              <Image
                source={{
                  uri: item?.viewmenuitem?.image
                    ? item.viewmenuitem.image
                    : null,
                }}
                style={{ width: '100%', borderRadius: 5, height: '100%' }}
              />
            </View>
          </View>
          <View style={{ flex: 5, paddingLeft: 8, marginBottom: 20, }}>
            <Text style={{ fontSize: 16, fontFamily: 'Poppins-Bold' }}>
              {item?.first_name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text
                style={{
                  fontSize: 14.5,
                  fontFamily: 'Poppins-Regular',
                  alignItems: 'center',
                  lineHeight: 23,
                  justifyContent: 'center',
                  marginLeft: 3,
                }}>
                {item?.address?.area ? item.address.area : null}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Image style={{ width: 18, height: 18 }} source={timingIcon} />
              <Text
                style={{
                  fontSize: 13.5,
                  fontFamily: 'Poppins-Bold',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 6,
                }}>
                {item?.delivery_time
                  ? item.delivery_time + t('searchPage.mins')
                  : null}
              </Text>
            </View>
            {/* <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Image style={{ width: 18, height: 18 }} source={tagIcon} />
              <Text
                style={{
                  fontSize: 13.5,
                  fontFamily: 'Poppins-Bold',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 6,
                }}>
                ₹ {item?.cost_for_two}
              </Text>
            </View> */}
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const _renderMenuList = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('FoodDetail', { id: item?.cook_id })}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            marginBottom: 10,
            elevation: 5
          }}>
          <View style={{ flex: 2 }}>
            <View style={{ width: '100%', borderRadius: 5, height: 110 }}>
              <Image
                source={{ uri: item?.image ? item.image : null }}
                style={{ width: '100%', borderRadius: 5, height: '100%' }}
              />
            </View>
          </View>
          <View style={{ flex: 5, paddingLeft: 8, backgroundColor: '#fff', paddingRight: 10 }}>
            <Text style={{ fontSize: 13, fontFamily: 'Poppins-Bold' }} numberOfLines={2}>
              {' '}
              {item?.userlanguage?.name ? item.userlanguage.name : null}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: 'Poppins-Regular',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 4,
                // marginTop: 5,
              }} numberOfLines={1}>
              {item?.cook?.first_name ? item.cook.first_name : null}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 2,
              }}>
              <Image style={{ width: 15, height: 15 }} source={timingIcon} />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Poppins-Regular',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 6,
                  marginRight: 20,
                }}>
                {item?.preparation_time
                  ? item.preparation_time + t('searchPage.mins')
                  : null}{' '}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Poppins-Bold',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 4,
                // marginTop: 7,
              }}>
              {item?.final_price ? '₹' + item.final_price : null}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const _renderFilterItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => selectedFoodType(item.id, index)}
        style={{
          backgroundColor:
            foodTypesArr[index].selected == true ? '#09b44d' : '#fff',
          paddingTop: 8,
          paddingRight: 5,
          paddingLeft: 5,
          borderRadius: 15,
          height: 30,
          width: 'auto',
          margin: 10,
          alignItems: 'center',
          borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderTopWidth: 1,
          borderStyle: 'solid',
          borderColor: '#09b44d',
        }}>
        <Text
          style={{
            color: foodTypesArr[index].selected == true ? '#fff' : '#09b44d',
            fontSize: 14,
            fontFamily: 'Poppins-Bold',
            flexGrow: 1,
            marginTop: -5
          }}>
          {item?.userlanguage?.name ? item.userlanguage.name : null}
        </Text>
      </TouchableOpacity>
    );
  };


  const _renderFoodList = ({ item, index }) => {
    // console.log("item type1111", item);

    return (
      <>
        <TouchableOpacity
          onPress={() => navigation.navigate('FoodDetail', item)}
          style={{ justifyContent: 'center', alignItems: 'center', }}>
          <View style={{ flexDirection: 'row', width: '100%', height: 100, alignItems: 'center' }}>
            {/* <View style={{ width: 100, height: 80, backgroundColor: '#000', borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#fff' }}>Food  Image</Text>
            </View> */}
            <Image source={{ uri: "https://homeefoodz-test.fra1.digitaloceanspaces.com/" + item?.food_image }} style={{ width: 100, height: 80, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }} />
            <View>
              <View style={{ width: "60%", flexDirection: 'row', paddingVertical: 3 }}>
                <Image source={riceBowl} style={{ width: 20, height: 20, marginHorizontal: 10 }} />
                <Text numberOfLines={1} style={{ width: "75%", color: "#2C2C2C", fontFamily: "Poppins-Medium", letterSpacing: 1.2 }}>{item?.name}</Text>
              </View>
              <View style={{ width: "65%", flexDirection: 'row', paddingVertical: 3 }}>
                <Image source={shop} style={{ width: 20, height: 20, marginHorizontal: 10 }} />
                <Text numberOfLines={1} style={{ width: "80%", color: "#9F0114", fontFamily: 'Poppins-Medium' }}>{item?.first_name}</Text>
              </View>
              <View style={{ width: "65%", flexDirection: 'row', paddingVertical: 3, alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ width: "80%", flexDirection: 'row', paddingVertical: 3 }}>
                  <Image source={location1} style={{ width: 20, height: 20, marginHorizontal: 10 }} />
                  <Text numberOfLines={1} style={{ width: '75%', color: "#8D9601", fontFamily: 'Poppins-Regular' }}>{!!item?.street && item?.street != 'null' ? item?.street : !!item?.area ? item?.area : item?.cit}</Text>
                </View>
                <Text style={{ width: "80%", fontFamily: 'Poppins-Bold', fontSize: 14, color: '#000000' }}>₹ {item?.final_price}</Text>
              </View>
            </View>
          </View >
          <View style={{ width: '85%', height: 1, backgroundColor: '#F6F6F6' }} />
        </TouchableOpacity >
      </>
    )
  }

  const _renderCookList = ({ item, index }) => {
    // console.log("item type1111", item?.food_image);

    return (
      <>
        <TouchableOpacity
          onPress={() => navigation.navigate('FoodDetail', item)}>
          <View style={{ flexDirection: 'row', width: '100%', height: 100, alignItems: 'center' }}>
            {/* <View style={{ width: 100, height: 80, backgroundColor: '#000', borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#fff' }}>Food  Image</Text>
            </View> */}
            <Image source={item?.cook_image ? { uri: "https://homeefoodz-test.fra1.digitaloceanspaces.com/" + item?.cook_image } : null} style={{ width: 100, height: 80, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }} />
            <View>
              <View style={{ flexDirection: 'row', paddingVertical: 3 }}>
                <Image source={shop} style={{ width: 20, height: 20, marginHorizontal: 10 }} />
                <Text numberOfLines={1} style={{ width: "65%", color: "#9F0114", fontFamily: 'Poppins-Medium' }}>{item?.first_name}</Text>
              </View>
              <View style={{ flexDirection: 'row', paddingVertical: 3 }}>
                <Image source={location1} style={{ width: 20, height: 20, marginHorizontal: 10 }} />
                <Text style={{ color: "#8D9601", fontFamily: 'Poppins-Regular' }}>{!!item?.street && item?.street != 'null' ? item?.street : !!item?.area ? item?.area : item?.city}</Text>
              </View>
            </View>
          </View >
          <View style={{ width: '85%', height: 1, backgroundColor: '#F6F6F6' }} />
        </TouchableOpacity >
        {/* <View style={{ justifyContent: 'center', alignItems: 'center', }}>
          <View style={{ flexDirection: 'row', width: '100%', height: 100, alignItems: 'center', }}>
            <Image source={{ uri: "https://homeefoodz-test.fra1.digitaloceanspaces.com/" + item?.cook_image }} style={{ width: 100, height: 80, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }} />
            <View>
              <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                <Image source={shop} style={{ width: 20, height: 20, marginHorizontal: 10 }} />
                <Text numberOfLines={1} style={{ width: "65%" }}>{item?.first_name}</Text>
              </View>
              <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                <Image source={location1} style={{ width: 20, height: 20, marginHorizontal: 10 }} />
                <Text>{!!item?.street && item?.street != 'null' ? item?.street : !!item?.area ? item?.area : item?.cit}</Text>
              </View>
            </View>
          </View >
        </View > */}
      </>
    )
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        flex: 1,
        // marginBottom: 35,
        // paddingTop: 15,
      }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      {modal != true && (
        <>
          <ImageBackground
            source={bgvector}
            resizeMode="cover"
            style={{ width: '100%', height: '100%' }}
          >
            <View
              style={{
                width: '95%',
                height: 54,
                marginHorizontal: 10,
                // backgroundColor: 'green',
                flexDirection: 'row',
                borderColor: '#e5e5e5',
                borderWidth: 1,
                borderRadius: 20,
                // position: 'relative',
                marginBottom: 10,
                // justifyContent: 'center'
              }}>
              <View style={{ flexDirection: 'row', width: '90%' }}>
                <Image
                  source={searchIcon}
                  style={{
                    width: 23,
                    height: 23,
                    // position: 'absolute',
                    top: 12,
                    left: 10,
                  }}
                />
                <TextInput
                  placeholder="Search for Food or Cooks"
                  value={searchText}
                  onChangeText={searchChange}
                  // onSubmitEditing={searchSubmit}
                  style={{
                    width: '80%',
                    marginHorizontal: 15,
                    fontFamily: 'Poppins-Regular',
                    height: 50,
                    color: '#000',
                    fontSize: width * 0.038,
                    // paddingRight: 50
                  }}
                />
              </View>
              {searchText != null && (
                <TouchableOpacity
                  onPress={() => {
                    setSearchText(null);
                    setListItems([]);
                    setFoodList([]);
                    setCookList([]);
                    setPagination(null);
                    setPaginate(1);
                    setSelectedFoodTypesArr([]);
                    setSortby({ LH: false, HL: false })
                  }}
                  style={{
                    // position: 'absolute',
                    right: 0,
                    top: 4,
                    backgroundColor: '#6c6c6c',
                    width: 29,
                    height: 29,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 30,
                    marginTop: 6,
                    marginRight: 8,
                    zIndex: 2,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#fff',
                      fontWeight: 'bold',
                      marginTop: -3,
                    }}>
                    x
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <ScrollView keyboardShouldPersistTaps={"always"}>
              <View style={{ width: '100%', flexDirection: 'row', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: '#C8C8C8', borderRadius: 50, marginHorizontal: 5, backgroundColor: sortby.LH ? '#5CC20A' : '#fff', opacity: 0.74 }}>
                  <Text style={{ fontSize: 12, color: sortby.LH ? '#fff' : '#000' }} onPress={() => changeFilter("LH")}>{'Price  (Low - High)'}</Text>
                </View>
                <View style={{ paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: '#C8C8C8', borderRadius: 50, marginHorizontal: 5, backgroundColor: sortby.HL ? '#5CC20A' : '#fff', opacity: 0.74 }}>
                  <Text style={{ fontSize: 12, color: sortby.HL ? '#fff' : '#000' }} onPress={() => changeFilter("HL")}>{'Price  (High - Low)'}</Text>
                </View>
              </View>
              {(foodList?.length > 0 || cookList?.length > 0) ?
                <View style={{ paddingHorizontal: 5 }}>
                  {foodList.length > 0 && <Text style={{ fontFamily: 'Poppins-Bold', fontWeight: '800', fontSize: 18, marginLeft: 10 }}>Dishes</Text>}
                  <FlatList
                    data={foodList}
                    renderItem={_renderFoodList}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ backgroundColor: '#FEFEFE', elevation: 20, borderRadius: 15, margin: 5, }} />
                  {cookList.length > 0 && <Text style={{ fontFamily: 'Poppins-Bold', fontWeight: '800', fontSize: 18, marginTop: 15, marginLeft: 10 }}>Cook</Text>}
                  <FlatList
                    data={cookList}
                    renderItem={_renderCookList}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ backgroundColor: '#FEFEFE', elevation: 20, borderRadius: 15, margin: 5, }}
                  />
                </View> : <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                  <Image style={{ width: 250, height: 400, resizeMode: 'cover', marginTop: 50 }} source={searchPageBg} />
                </View>}
            </ScrollView>
          </ImageBackground>
        </>
      )
      }

      <View
        style={{
          position: 'absolute',
          bottom: 0,
        }}>
        {modal && (
          <Modal transparent={true} visible={modal}>
            <Loader />
          </Modal>
        )}
      </View>
    </SafeAreaView >
  );
};
const styles = StyleSheet.create({
  pageTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
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
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
    color: '#09b44d',
    marginBottom: 0,
    paddingBottom: 0,
  },
  labelimg: {
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
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
  dropselect: {
    height: 45,
    width: '100%',
    fontFamily: 'Poppins-Bold',
    marginLeft: -15,
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
    flexDirection: 'row',
    marginTop: 15
  },
  checkLabel: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
  },
  buttonStyle: {
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#fff',
  },
});
export default Search;
