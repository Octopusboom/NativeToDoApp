import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

const Quotes = () => {
  const [quote, setQuote] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchQuote = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api.quotable.io/random');
      const { content } = response.data;
      setQuote(`"${content}"`);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#3C79B0" />
      ) : (
        <>
          <Text style={styles.quoteText}>{quote}</Text>
          <TouchableOpacity style={styles.newQuoteButton} onPress={fetchQuote}>
            <Text style={styles.buttonText}>Get Another Quote</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    borderRadius: 20,
    backgroundColor: "#EBF1F5",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10
  },
  quoteText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#3C79B0'
  },
  newQuoteButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    backgroundColor: "#3C79B0",
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff'
  }
});

export default Quotes;