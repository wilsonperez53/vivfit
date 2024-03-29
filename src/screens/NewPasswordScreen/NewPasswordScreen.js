import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import Logo from "../../../assets/images/Logo.png";
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native'


const ForgotPasswordScreen  = () => {
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const { height } = useWindowDimensions(); 
    const navigation = useNavigation();


  
    const onSubmitPressed = async data => {
        try {
          await Auth.forgotPasswordSubmit(data.username, data.code, data.password);
          navigation.navigate('SignIn');
        } catch (e) {
          Alert.alert('Oops', e.message);
        }
      };
    
      const onSignInPress = () => {
        navigation.navigate('SignIn');
      };
    
  
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
            <Text style={styles.title}>Reset your password</Text>

        <CustomInput
        placeholder="Username"
        name="username"
        control={control}
        rules={{required: 'Username is required'}}
        />

        <CustomInput
        placeholder="Code"
        name="code"
        control={control}
        rules={{required: 'Code is required'}}
        />

        <CustomInput
        placeholder="Enter your new password"
        name="password"
        control={control}
        secureTextEntry
        rules={{
            required: 'Password is required',
            minLength: {
            value: 8,
            message: 'Password should be at least 8 characters long',
            },
        }}
        />

        <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />

        <CustomButton
        text="Back to Sign in"
        onPress={onSignInPress}
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