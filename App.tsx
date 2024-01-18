import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PasswordGenerator from './component/PasswordGenerator';
import Header from './component/Header';

export default function App() {
  return (
    <ScrollView>
      <SafeAreaView style={styles.appContainer}>
        <Header />
        <View style={styles.formControl}>
          <PasswordGenerator />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formControl: {
    margin: 8,
    padding: 10,
  },
});
