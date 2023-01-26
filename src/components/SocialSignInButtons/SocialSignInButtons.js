import React from 'react';
import { View, Text, TextInput, StyleSheet, useWindowDimensions } from 'react-native'
import CustomButton from "../../components/CustomButton";

const SocialSignInButtons  = ({ value, setValue, placeholder, secureTextEntry }) => {

    const onGoogleSignInPressed = () => {
        console.warn("Google Sign in");
    }
    const onFacebookSignInPressed = () => {
        console.warn("Sign in with FB");
    }
    const onAppleIDSignInPressed = () => {
        console.warn("Sign in with Apple");
    }
    
    const { height } = useWindowDimensions(); 
    return (
        <>
             <CustomButton  onPress={onFacebookSignInPressed} 
                    text="Sign in with Facebook" 
                    type="tertiary"
                    bgColor="#E7EAF4"
                    fgColor="#4765A9"
                />
                <CustomButton  onPress={onGoogleSignInPressed} text="Sign in with Google" 
                    type="tertiary"
                    bgColor="#FAE9EA"
                    fgColor="#DD4D44"
                />
                <CustomButton  
                    onPress={onAppleIDSignInPressed} 
                    text="Sign in with Apple ID" 
                    type="tertiary"
                    bgColor="#E3E3E3"
                    fgColor="#363636"
                />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 5,
    },
    input: {
        width: '70%',
        maxWidth: 500,
        maxHeight: 200,
    },
})

export default SocialSignInButtons