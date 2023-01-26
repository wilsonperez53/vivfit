import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator, Button } from 'react-native';
import ExerciseCard from '../../components/ExerciseCard/ExerciseCard';
//import { connect } from 'react-redux';
//import { topHeadlineRequest } from '../../store/action';
import NewsCard from '../../components/ExerciseCard/ExerciseCard';
import styles from './ExerciseList.Style';

const ExerciseListScreen2 = ({ exerciseModel, dispatch }) => {

    const [page, setPage] = useState(1);

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [fullData, setFullData] = useState([]);
    const API_ENDPOINT = 'https://exercisesbucket.s3.amazonaws.com/exerciseList.json?seed=1&page=1&results=20';

    useEffect(() => {
      setIsLoading(true);
  
      fetch(API_ENDPOINT)
        .then(exerciseModel => exerciseModel.json())
        .then(exerciseModel => {  
          setData(exerciseModel);
          setIsLoading(false);
          setFullData(exerciseModel);
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
      
    const requestAPI = () => {
       /* dispatch(topHeadlineRequest({
            country: 'my', page: page
        }))*/
    }

    useEffect(() => {
        requestAPI();
        console.log("CURRENT PAGE", page);
    }, [page])

    const fetchMoreData = () => {
       /* if (!exerciseModel.isListEnd && !exerciseModel.moreLoading) {
            setPage(page + 1)
        }*/
    }

    const renderHeader = () => (
        <Text style={styles.title}>RN News</Text>
    )

    const renderFooter = () => (
        <></>
     /*   <View style={styles.footerText}>
            {exerciseModel.moreLoading && <ActivityIndicator />}
            {exerciseModel.isListEnd && <Text>No more exerciseModel at the moment</Text>}
        </View>*/
    )

    const renderEmpty = () => (
        <View style={styles.emptyText}>
            <Text>No Data at the moment</Text>
            <Button onPress={() => requestAPI()} title='Refresh'/>
        </View>
    )

    console.log({exerciseModel})

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ?
                <View style={styles.loading}>
                    <ActivityIndicator size='large' />
                </View>
                :
                <FlatList
                contentContainerStyle={{flexGrow: 1}}
                    data={data.results}
                    renderItem={({ item }) => (
                        <ExerciseCard exercise={item} />
                    )}
                    ListHeaderComponent={renderHeader}
                    ListFooterComponent={renderFooter}
                    ListEmptyComponent={renderEmpty}
                    onEndReachedThreshold={0.2}
                    onEndReached={fetchMoreData}
                />
            }

        </SafeAreaView>
    )
}

const mapStateToProps = (state) => {
    return {
        exerciseModel: state.news
    }
};

export default ExerciseListScreen2;