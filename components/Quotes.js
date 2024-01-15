import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const Quotes = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Fetch a random quote from the Quotable API
    const fetchQuote = async () => {
      try {
        const response = await axios.get('https://api.quotable.io/random');
        const { content, author } = response.data;
        setQuote(`${content} - ${author}`);
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    fetchQuote();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.quoteText}>{quote}</Text>
      <Button title="Get Another Quote" onPress={() => fetchQuote()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  quoteText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Quotes;
