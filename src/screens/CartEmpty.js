import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { arrow, emptyCartIcon } from '../assets/img/Images';

const CartEmpty = () => {
  const { t, i18n } = useTranslation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
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
            paddingLeft: 15,
            paddingRight: 8,
          }}>
          <Image
            style={{ width: 10, height: 18, resizeMode: 'stretch' }}
            source={arrow}
          />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Cart</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Image
          style={{ width: 100, height: 110, resizeMode: 'stretch' }}
          source={emptyCartIcon}
        />
        <Text style={{ marginTop: 15, fontFamily: 'Poppins-Bold', opacity: 0.3 }}>
          Preferred Food not yet listed
        </Text>
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

  inputBorder: {
    width: '99%',
    height: 59,
    marginBottom: 30,
  },
});

export default CartEmpty;
