import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Pressable, ScrollView, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { arrow } from '../assets/img/Images';
import { useTranslation } from 'react-i18next';



const OrderReport = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <ScrollView>
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
              onPress={() => navigation.goBack()}
              style={{
                paddingHorizontal: 15,
                paddingVertical: 15,
              }}>
              <Image style={{ width: 13, height: 22 }} source={arrow} />
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={[styles.pageTitle, { alignItems: 'center' }]}>
                {t("orderReportPage.orderReport")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 12 }}>
          <Pressable onPress={showDatepicker} style={{ borderRadius: 25, justifyContent: 'center', height: 40, width: 150, alignItems: 'center', backgroundColor: '#09b44d', }} >
            <Text style={{ color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 18, }}>{t("orderReportPage.from")}</Text>
          </Pressable>
          <Pressable onPress={showDatepicker} style={{ borderRadius: 25, justifyContent: 'center', height: 40, width: 150, alignItems: 'center', backgroundColor: '#09b44d', }} >
            <Text style={{ color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 18, }}>{t("orderReportPage.upTo")}</Text>
          </Pressable>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      <View style={{ marginHorizontal: 20, paddingTop: 0, paddingBottom: 10, marginBottom: 10, borderBottomColor: '#e4e3e3', borderBottomWidth: 1, }}>
        <Text style={{ fontSize: 18, fontFamily: 'Poppins-Bold', color: '#000', marginBottom: 6 }}>Garlic Curd Paste</Text>
        <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: '#000', marginBottom: 6 }}>{t("orderReportPage.orderId")} #890765895</Text>
        <Text style={{ fontSize: 14, fontFamily: 'Poppins-Regular', color: '#e74c3c', }}>05-07-2021</Text>
      </View>
      <View style={{ marginHorizontal: 20, paddingTop: 0, paddingBottom: 10, marginBottom: 10, borderBottomColor: '#e4e3e3', borderBottomWidth: 1, }}>
        <Text style={{ fontSize: 18, fontFamily: 'Poppins-Bold', color: '#000', marginBottom: 6 }}>Garlic Curd Paste</Text>
        <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: '#000', marginBottom: 6 }}>{t("orderReportPage.orderId")} #890765895</Text>
        <Text style={{ fontSize: 14, fontFamily: 'Poppins-Regular', color: '#e74c3c', }}>21-05-2021</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageTitle: {
    color: '#fff',
    fontSize: 21,
    fontFamily: 'Poppins-Bold',
    marginTop: 15,
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
})

export default OrderReport;
