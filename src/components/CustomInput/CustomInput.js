import React from 'react';
import { View, Text, TextInput, StyleSheet, useWindowDimensions } from 'react-native'
import Logo from "../../../assets/images/Logo.png";
import { Controller } from 'react-hook-form';

const CustomInput  = ({ control, name, rules = {}, placeholder, secureTextEntry }) => {
    const { height } = useWindowDimensions(); 
    return (
        <Controller 
            control={control}
            name={name}
            rules={{required: true}}
            render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                <>
                <View style={[styles.container, {borderColor: error ? 'red' : '#e8e8e8'}]}>
                    <TextInput value={value} 
                    placeholder={placeholder}
                    onChangeText={onChange}
                    onBlur={onBlur} 
                    style={[styles.input]}
                    secureTextEntry={secureTextEntry}/>
                </View>
                {error && (<Text style={{color:'red', alignSelf:'stretch'}}>{error.message || 'Error'}</Text>)}
                
                </>
            )}
        />
      
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

export default CustomInput