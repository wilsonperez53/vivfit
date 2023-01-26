import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, Alert } from 'react-native'
import Logo from "../../../assets/images/Logo.png";
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useForm } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native'
import { Auth } from 'aws-amplify';


const ConfirmEmailScreen  = () => {
    const route = useRoute();
    const { control , handleSubmit, watch } = useForm({ 
            defaultValues: { username: route?.params?.username }
        });

    const username = watch('username');
    
    //const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const { height } = useWindowDimensions(); 
    
    const navigation = useNavigation();

    const onConfirmPressed = async (data) => {
        try {
            await Auth.confirmSignUp(data.username, data.code);
            navigation.navigate('SignIn');
        } catch (e) {
            Alert.alert('Invalid code');
        }
        /*console.warn("onConfirmPressed in");
        */
    }
    const onSignInPressed = () => {
        console.warn("Sign in");
        navigation.navigate('SignIn');
    }

    const onResendCodePressed = () => {
        console.warn("onResendCodePressed");
    }
    const onResendPress = async () => {
        try {
          await Auth.resendSignUp(username);
          Alert.alert('Success', 'Code was resent to your email');
        } catch (e) {
          Alert.alert('Oops', e.message);
        }
      };
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Confirm your email</Text>
                
                <CustomInput
                    name="username"
                    control={control}
                    placeholder="Username"
                    rules={{
                        required: 'Username code is required',
                    }}
                />
                 <CustomInput
                    name="code"
                    control={control}
                    placeholder="Enter your confirmation code"
                    rules={{
                        required: 'Confirmation code is required',
                    }}
                />
                <CustomButton text="Confirm" onPress={handleSubmit(onConfirmPressed)} />

                <CustomButton
                text="Resend code"
                onPress={onResendPress}
                type="SECONDARY"
                />

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

export default ConfirmEmailScreen