import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { swithTheme } from '../../redux/themeAction';
import { lightTheme, darkTheme } from '../../services/Theme';

const Test = () => {

    const theme = useSelector((state) => state.themeReducer.theme);
    const dispatch = useDispatch;

    return (
        <View theme={theme} style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.txt}>Ninos</Text>

            {theme.mode === 'light' ?

                <Text onClick={() => dispatch(swithTheme(darkTheme))} style={styles.btn}>Lit btn</Text>
                :

                <Text onClick={() => dispatch(swithTheme(lightTheme))} style={styles.btn}>Dark btn</Text>
            }

        </View>
    );
};


const styles = StyleSheet.create({
    txt: {
        color: `${(props) => props.theme.YelBox}`,
        textAlign: 'center'
    },
    btn: {
        color: `${(props) => props.theme.YelBox}`,
        backgroundColor: `${(props) => props.theme.PinkRound}`,
        width: 100,
        textAlign: 'center'
    }
})
export default Test;