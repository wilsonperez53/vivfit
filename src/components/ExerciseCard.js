import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import FastImage from 'react-native-fast-image';
import colors from '../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import OpenVideoButton from './OpenVideoButton';

const onOpenVideoButtonPress = () => {
  Linking.openURL( 'https://www.youtube.com/watch?v=zOqMbTcMbvo');
};

const ExerciseCard = ({exImage, exName, exDescription, exReps}) => {
  return (
    <>
      <View style={styles.container}>
        <FastImage
          source={exImage}
          style={[styles.imageContainer, {width: wp('90%'), height: hp('50%')}]}
          resizeMode="contain"
        />
      </View>
      <View style={[styles.subContainer, {marginHorizontal: 40, top: -40}]}>
        <Text style={styles.textContainer}>{exName}</Text>
        <Text style={styles.paraContainer}>{exDescription}</Text>
      </View>
      <View>
        <OpenVideoButton  onPress={onOpenVideoButtonPress} text="View in Youtube" 
                    type="tertiary"
                    bgColor="#FAE9EA"
                    fgColor="#DD4D44"
                />
           
      </View>
    </>
  );
};
export default ExerciseCard;

const styles = StyleSheet.create({
  headContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    justifyContent: 'center',
    marginTop: 20,
  },
  headText: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.app_color_primary,
  },
  container: {
    margin: 30, 
    height: hp('60%'), 
    marginHorizontal: 20,
    alignItems: 'center'
  },
  subContainer: {
    alignItems: 'center'
  },
  imageContainer: {
    borderRadius: 20,
  },
  textContainer: {
    color: colors.app_color_primary,
    fontSize: 28,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Raleway-Bold',
  },
  paraContainer: {
    color: colors.app_color_secondary,
    fontSize: 20,
    marginTop: 10,
    fontFamily: 'Raleway-Medium',
  },
  repsContainer: {
    color: colors.description,
    fontSize: 20,
    marginTop: 10,
    fontWeight: '500'
  },
});
