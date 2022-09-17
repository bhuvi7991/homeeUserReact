import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput, View, Image, Text, TouchableOpacity } from 'react-native';
import { searchIcon, emptyIcon } from '../assets/img/Images';
import TopTab from '../Navigation/MenuTopTab';

const Search = () => {
  const { t, i18n } = useTranslation();
  const [emptySearch, setEmptySearch] = useState(false);
  const [searchText, setSearchText] = useState(null);
  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <View
        style={{
          marginTop: 20,
          marginHorizontal: 15,
          position: 'relative',
          height: 50,
        }}>
        {searchText &&
          <TouchableOpacity
            style={{
              position: 'absolute',
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
        }
        <TextInput
          inlineImageLeft="search_icon"
          placeholder={t("searchPage.pleaseSearchYourFoodzPreference")}
          value={searchText}
          style={{
            fontFamily: 'Poppins-Regular',
            borderColor: '#e5e5e5',
            borderWidth: 1,
            height: 50,
            borderRadius: 80,
            paddingLeft: 45,
            fontSize: 17,
          }}
        />
        <Image
          source={searchIcon}
          style={{
            width: 27,
            height: 27,
            position: 'absolute',
            top: 12,
            left: 10,
          }}
        />
      </View>
      {/* {emptySearch ? (
        <View
          style={{
            backgroundColor: '#fff',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <Image source={emptyIcon} style={{ width: 260, height: 150 }} />
          <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15 }}>
            {t("searchPage.pleaseSearchYourFoodzPreference")}
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <TopTab />
        </View>
      )} */}
    </View>
  );
};

export default Search;
