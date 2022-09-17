import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  SafeAreaView,
  Modal,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { arrow, photo1, timingIcon, offerIcon } from '../assets/img/Images';
import { useTranslation } from 'react-i18next';
import { api } from '../services/index';
import Loader from './Loader';
import { RadioGroup } from 'react-native-radio-buttons-group';
import { PrimaryGreen } from '../helper/styles.helper';

const Language = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [modal, setModal] = useState(true);
  const [radioButtons, setRadioButtons] = useState([]);
  const [languageValue, setLanguageValue] = useState(1);
  const [languages, setLanguages] = useState(null);

  const get_Languages = async () => {
    setModal(true);
    let response = await api.languages();
    setLanguages(response);
    setModal(false);
    var arr = [];
    for (var i = 0; i < response.languages.length; i++) {
      if (response.languages[i].id == response.user_language) {
        arr.push({ id: response.languages[i].id, label: response.languages[i].name, value: response.languages[i].id, selected: true })
      } else {
        arr.push({ id: response.languages[i].id, label: response.languages[i].name, value: response.languages[i].id, selected: false })
      }
    }
    setRadioButtons(arr);
  }
  useEffect(() => {
    get_Languages();
  }, [])

  const changeLanguage = async () => {
    console.log(languageValue);
  }


  const onPressRadioButton = (radioButtonsArray) => {
    console.log(radioButtonsArray);
    setRadioButtons(radioButtonsArray);
  }
  console.log(radioButtons);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {modal != true && languages &&
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#09b44d',
              height: 70,
              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 25,
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                paddingHorizontal: 15,
                paddingVertical: 15,
              }}>
              <Image style={{ width: 10, height: 18 }} source={arrow} />
            </TouchableOpacity>
            <Text style={styles.pageTitle}>{t("languagePage.language")}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginHorizontal: 20, marginTop: 6, alignItems: 'stretch' }}>
              <RadioGroup
                radioButtons={radioButtons}
                onPress={onPressRadioButton}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{ backgroundColor: PrimaryGreen, borderRadius: 10, padding: 10, margin: 10, width: '90%' }}
            onPress={changeLanguage}
          >
            <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Bold', fontSize: 14, color: '#fff' }}>
              {t("languagePage.proceed")}
            </Text>
          </TouchableOpacity>
        </View>
      }
      <View>
        {modal && (
          <Modal transparent={false} visible={modal}>
            <Loader />
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  pageTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
});

export default Language;
