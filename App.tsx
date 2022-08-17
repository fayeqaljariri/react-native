import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';


export default function App() {
  // declarations for move object
  interface move {
    id: string;
    title: string;
    releaseYear: string

  }
// make a state for array of object   
  const [data, setData] = useState<move[]>([]);
  const [isLoading, setLoading] = useState(true);

// make a function for fetch data from api 
  const getMovies = async () => {
    try {
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();
      setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
// use useEffect to Runs only on the first render

  useEffect(() => {
    getMovies()
  }, []);



  return (

    <View style={styles.container}>
      {isLoading ? <ActivityIndicator /> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text style={styles.element} ><Text style={styles.blodeText}> move title</Text>  {item.title}, {item.releaseYear}</Text>
          )}
        />
      )}
    </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: "center",
    marginTop: 100
  },
  element: {
    hight: 100,
    padding: 20,
    backgroundColor: "pink",
    borderRadius: 4,
    borderColor: "black",
    marginBottom: 10
},
  blodeText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15
  }
});
