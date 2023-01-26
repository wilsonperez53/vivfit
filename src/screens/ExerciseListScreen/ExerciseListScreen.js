import React, { useState, useEffect, useCallback  } from 'react';
import {
    Text,
    View,
    FlatList,
    ActivityIndicator,
    TextInput,
    Linking,
    Button
  } from 'react-native';
import filter from 'lodash.filter';
import {useNavigation} from '@react-navigation/native';

import { Auth } from 'aws-amplify';
import ExerciseCard from '../../components/ExerciseCard/ExerciseCard';
import styles from './ExerciseList.Style';



const ExerciseListScreen  = () => {

    
    const API_ENDPOINT = 'https://exercisesbucket.s3.amazonaws.com/exerciseList.json?seed=1&page=1&results=20';

const navigation = useNavigation();
const GetListItem = (name) => {
  Alert.alert(name);
}

const ItemSeparatorLine = () => {
  return (
    <View
    style={{height: .5,width: "100%",backgroundColor: "#111a0b",}}
    />
  );
}

    const onSendPressed = data => {
      debugger;
        try {
           // const response = Auth.forgotPassword(data.username);
           // navigation.navigate('NewPassword');

        } catch (e) {
            Alert.alert('Error', e.message);
        }
        console.warn("onSendPressed");
    }

    const onSignInPressed = () => {
        console.warn("Sign in");
        navigation.navigate('SignIn');
    }

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [fullData, setFullData] = useState([]);
    
    _onPress = newName => {
      console.log(newName.id);
      this.setState({ item: newName });
      Alert.alert("New Taxon: "+this.state.item.name.toString());
  };

    useEffect(() => {
      setIsLoading(true);
  
      fetch(API_ENDPOINT)
        .then(response => response.json())
        .then(response => {  
          setData(response.results);
          setIsLoading(false);
          setFullData(response.results);
        })
        .catch(err => {
          setIsLoading(false);
          setError(err);
        });
    }, []);

    if (isLoading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#5500dc" />
          </View>
        );
      }
    
      if (error) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18}}>
              Error fetching data... Check your network connection!
            </Text>
          </View>
        );
      }

      function renderHeader() {
        return (
          <View
            style={{
              backgroundColor: '#fff',
              padding: 10,
              marginVertical: 10,
              borderRadius: 20
            }}
          >
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
              value={query}
              onChangeText={queryText => handleSearch(queryText)}
              placeholder="Search"
              style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
            />
          </View>
        );
      }

      const handleSearch = text => {
        const formattedQuery = text.toLowerCase();
        const filteredData = filter(fullData, user => {
          return contains(user, formattedQuery);
        });
        setData(filteredData);
        setQuery(text);
      };
      
      const contains = ({ name, email }, query) => {
        const { first, last } = name;
      
        if (first.includes(query) || last.includes(query) || email.includes(query)) {
          return true;
        }
      
        return false;
      };

      const OpenURLButton = ({ url, children }) => {
        const handlePress = useCallback(async () => {
          // Checking if the link is supported for links with custom URL scheme.
          const supported = await Linking.canOpenURL(url);
      
          if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
          } else {
            //Alert.alert(`Don't know how to open this URL: ${url}`);
          }
        }, [url]);
      
        return <Button title={children} onPress={handlePress} />;
      };

      return (
        <View style={styles.container}>
        <FlatList
          key={(item, index) => index}
          data={ data }
          ItemSeparatorComponent = {this.ItemSeparatorLine}
          renderItem={({ item }) => (
            <ExerciseCard exercise={item} />
          )}
          
          keyExtractor={(item, index) => index}
    />
   </View> 
       
      );

}

export default ExerciseListScreen