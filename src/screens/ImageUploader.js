import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { upLoad } from '../assets/img/Images'

const ImageUploader = () => {
    const [imageUri, setimageUri] = useState('');
    const [imageUriGallary, setimageUriGallary] = useState('');


    const openCamara = () => {
        const options = {
            storageOptions: {
                path: 'images',
                mediaType: 'photo',
            },
            includeBase64: true,
        }

        launchCamera(options, response => {
            console.log('Response =', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error:', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button:', response.customButton);
            }
            else {
                // You can also display the image using data:
                const source = { uri: 'data:image/jpeg;base64,' + response.base64 };
                setimageUri(source);
            }
        })
    };

    const openGallery = () => {
        const options = {
            storageOptions: {
                path: 'images',
                mediaType: 'photo',
            },
            includeBase64: true,
        };

        launchImageLibrary(options, response => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error:', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button:', response.customButton);
            } else {
                // You can also display the image using data:
                const source = { uri: 'data:image/jpeg;base64,' + response.base64 };
                setimageUriGallary(source);
            }
        });
    };


    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Button
                title={'Open Camara'}
                onPress={() => {
                    openCamara();
                }}
            />
            <Image
                source={imageUri}
                style={{
                    height: 100,
                    width: 100,
                    borderRadius: 100,
                    borderWidth: 2,
                    borderColor: '#000',
                }}
            />
            <Button
                title={'Open Gallary'}
                onPress={() => {
                    openGallery();
                }}
            />
            <Image
                source={imageUriGallary}
                style={{
                    height: 100,
                    width: 100,
                    borderRadius: 100,
                    borderWidth: 2,
                    borderColor: '#000',
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    text: { color: '#000' }
})

export default ImageUploader;