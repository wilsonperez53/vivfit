import React from 'react'
import { StyleSheet, TouchableHighlight, Text, View, Image } from 'react-native';
import { Image as RNImage } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'


const ExerciseCard = ({ exercise }) => {
    const navigation = useNavigation();

    const _onPressButton = ()=>{
        navigation.navigate('SignIn');
        //alert('You tapped the button!111');
        //navigation.navigate('ExerciseDetail');
      };

    return (
        <View style={styles.container} >
             <TouchableHighlight onPress={_onPressButton} underlayColor="white">
                <>
                <Image
                    source={{uri: exercise.picture.thumbnail}}
                    style={styles.image}
                />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Ejercicio {exercise.id}: {exercise.name}</Text>
                </View>
                </>
            </TouchableHighlight>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        flexDirection: 'row'
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 10
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        flexWrap: 'wrap',
        marginHorizontal: 10,
    }
});


export default ExerciseCard