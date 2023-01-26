import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, Alert } from 'react-native'
import Logo from "../../../assets/images/Logo.png";
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';

import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { Auth } from 'aws-amplify';



const ForgotPasswordScreen  = ({ code, setCode }) => {
    const [username, setUsername] = useState('');
    const { height } = useWindowDimensions(); 
    const navigation = useNavigation();
    const { control, handleSubmit, formState: {errors}} = useForm();



    const onSendPressed = async (data) => {
        try {
            const response = await Auth.forgotPassword(data.username);
            navigation.navigate('NewPassword');

        } catch (e) {
            Alert.alert('Error', e.message);
        }
        console.warn("onSendPressed");
    }
    const onSignInPressed = () => {
        console.warn("Sign in");
        navigation.navigate('SignIn');
    }

  
  
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Reset your password</Text>
                
                <CustomInput
                    name="username"
                    control={control}
                    placeholder="Username"
                    rules={{
                        required: 'Username is required',
                    }}
                />

                <CustomButton text="Send" onPress={handleSubmit(onSendPressed)} />

                <CustomButton
                    text="Back to Sign in"
                    onPress={onSignInPressed}
                    type="TERTIARY"
                />

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 10,
        color: '#051C60',
    },
    text: {
        marginVertical: 10,
        color: 'gray',
    },
    link: {
        marginVertical: 10,
        color: 'orange',
    },
})

export default ForgotPasswordScreen