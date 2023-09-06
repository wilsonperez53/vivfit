import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, 
  Button, 
  ActivityIndicator,
  Image} from 'react-native';
import {Auth} from 'aws-amplify';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExerciseListScreen from '../ExerciseListScreen/index';
import PeopleListScreen from '../PeopleListScreen/index';
import { useSelector } from 'react-redux';

const Index = () => {

  const currentUser = useSelector((state) => state.currentUser);
  
  console.log("currentUser:-", currentUser);


  const signOut = () => {
    Auth.signOut();
  };

  function DetailsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <HomeStack/>
      </View>
    );
  }
/*
  const Home = ({ navigation }) => {
    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          
        <FlatList
          data={data}
          keyExtractor={item => item.first}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Image
                source={{ uri: item.picture.thumbnail }}
                style={styles.coverImage}
              />
              <View style={styles.metaInfo}>
                <Text style={styles.title}>{`${item.name.first} ${
                  item.name.last
                }`}</Text>
              </View>
            </View>
          )}
        />
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    );
  }
  
  const SettingsScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
      
    );
  }
*/
  const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Community" component={PeopleListScreen} />
      <HomeStack.Screen name="My Plan" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
return (
    <SettingsStack.Navigator>
    <SettingsStack.Screen name="Settings" component={ExerciseListScreen} />
    <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
);
}
  const Tab = createBottomTabNavigator();

  return (
    <View style={{flex: 1}}>
      <Text style={{fontSize: 24, alignSelf: 'center'}}>Home, sweet home {currentUser}!</Text>
      <Text
        onPress={signOut}
        style={{
          width: '100%',
          textAlign: 'center',
          color: 'red',
          marginTop: 'auto',
          marginVertical: 20,
          fontSize: 20,
        }}>
        Sign out
      </Text>
      <NavigationContainer independent={true}>
      <Tab.Navigator  screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Comunidad" component={HomeStackScreen} options={{ tabBarBadge: 3 }}/>
        <Tab.Screen name="Entrenamiento" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </View>
  );
};

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

export default Index;
