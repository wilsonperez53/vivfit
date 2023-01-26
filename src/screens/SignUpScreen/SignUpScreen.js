import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, Alert } from 'react-native'
import Logo from "../../../assets/images/Logo.png";
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const SignUpScreen  = () => {
    const { height } = useWindowDimensions(); 

    const navigation = useNavigation();
    const { control, handleSubmit, watch} = useForm();
    const pwd = watch('password');


    const onRegisterPressed = async (data) => {
        const {username, password, email, name} = data;
        try {
            const response = await Auth.signUp(
                {
                    username,
                    password,
                    attributes: { email, name }
                }
            );
            navigation.navigate('ConfirmEmail', { username: username});
        } catch (e) {
            Alert.alert('There was an issue', e.message);
        }
        /*console.warn("Sign in");
        navigation.navigate('SignUp');*/
    }
    const onSignInScreenPressed = () => {
        console.warn("Sign in");
        navigation.navigate('SignIn');
    }

    const onPrivacyPolicyPressed = () => {
        console.warn("onPrivacyPolicyPressed");
    }
    const onTermsOfUsePressed = () => {
        console.warn("onTermsOfUsePressed");
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Create an Account</Text>
                
                <CustomInput 
                    name="name"
                    placeholder="Name"
                    control={control} 
                    rules={{required: 'Name is required'}}/>
                <CustomInput 
                    name="username"
                    placeholder="Username"
                    control={control} 
                    rules={{required: 'Username is required'}}/>
                <CustomInput 
                    name="email"
                    placeholder="Email"
                    control={control} 
                    rules={{required: 'Email is required', pattern: {value: EMAIL_REGEX, message: 'Invalid email format'}}}/>
               
               <CustomInput 
                    name="password"
                    placeholder="Password" 
                    control={control} 
                    rules={{required: 'Password is required', minLength: {value: 3, message: 'Password should be 4 characters'}}}
                    secureTextEntry={true}/>
                
                <CustomInput 
                    name="password-repeat"
                    placeholder="Confirm" 
                    control={control} 
                    rules={{
                        validate: value => value == pwd || 'Password does not match',
                    }}
                    secureTextEntry/>
                
                <CustomButton  onPress={handleSubmit(onRegisterPressed)} text="Register"/>
                <Text style={styles.text}>
                    By registering, you accept our 
                    <Text onPress={onTermsOfUsePressed} style={styles.link}>terms of use </Text> 
                    and <Text onPress={onPrivacyPolicyPressed} style={styles.link}>privacy policy</Text>.
                </Text>
                
                <SocialSignInButtons />
           

                <CustomButton  onPress={onSignInScreenPressed} text="Have an account? Sign In" type="tertiary"/>


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

export default SignUpScreen