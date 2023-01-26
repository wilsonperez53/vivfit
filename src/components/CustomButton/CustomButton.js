import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Logo from "../../../assets/images/Logo.png";

const CustomButton  = ({ onPress, text, type = "primary", bgColor, fgColor }) => {
    return (
        <Pressable 
            onPress={onPress} 
            style={[
                styles.container, 
                styles[`container_${type}`],
                bgColor ? {backgroundColor: bgColor} : {}
                ]}
            >
           <Text style={[
                styles.text, 
                styles[`text_${type}`],
                fgColor ? {color: fgColor} : {}
                ]}>
                    {text}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
       
        width: '100%',

        padding: 15,
        marginVertical: 5,

        alignItems: 'center',
        borderRadius: 5,
    },
    container_primary: {
        backgroundColor: '#3b71f3',
    },
    container_secondary: {
        borderColor: '#3b71f3',
        borderWidth: 2,
    },
    container_tertiary: {
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
    },
    text_secondary: {
        color: '#3b71f3',
    }, 
    text_tertiary: {
        color: 'grey',
    },
})

export default CustomButton