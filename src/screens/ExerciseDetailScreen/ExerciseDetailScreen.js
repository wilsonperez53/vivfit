import React, { useState, useEffect, useCallback  } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Image,
    TextInput,
    Linking,
    Button,
    TouchableOpacity 
  } from 'react-native';
import filter from 'lodash.filter';

//import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress';
import { Auth } from 'aws-amplify';
import { useNavigation, useRoute } from '@react-navigation/native'



const ExerciseDetailScreen  = () => {
 
    /* 2. Get the param */
    //const { item } = route.params;
    //const updatePrice = navigation.getParam('name');
    const API_ENDPOINT = 'https://exercisesbucket.s3.amazonaws.com/exerciseList.json?seed=1&page=1&results=20';

   

    const [isLoading, setIsLoading] = useState(false);
    //const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [fullData, setFullData] = useState([]);
    //{navigation.getParam('name')}
      return (
        <View style={styles.container}>
                       <Text>hello</Text>

   </View> 
       
      );
     /* <View style={styles.container}>
          <Text style={styles.text}>Favorite Contacts</Text>
          
          <FlatList
            ListHeaderComponent={renderHeader}
            data={data}
            keyExtractor={item => item.first}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Image
                  source={{ uri: item.picture.thumbnail }}
                  style={styles.coverImage}
                />
                <View style={styles.metaInfo}>
                  <Text style={styles.title}>{`${item.name}`}</Text>
                </View>
                <OpenURLButton url={item.video}>Video</OpenURLButton>
              
              </View>
            )}
          />
        </View>*/
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f8f8',
      alignItems: 'center'
    },
    text: {
      fontSize: 20,
      color: '#101010',
      marginTop: 60,
      fontWeight: '700'
    },
    listItem: {
      marginTop: 10,
      paddingVertical: 20,
      paddingHorizontal: 20,
      backgroundColor: '#fff',
      flexDirection: 'row'
    },
    coverImage: {
      width: 100,
      height: 100,
      borderRadius: 8
    },
    metaInfo: {
      marginLeft: 10
    },
    title: {
      fontSize: 18,
      width: 200,
      padding: 10
    }
  });

export default ExerciseDetailScreen