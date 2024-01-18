import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Header() {
  return (
    <View style={styles.Navbar}>
      <Text style={styles.title}>Password Generator</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title:{
    fontSize:32,
    fontWeight:'600',
    marginBottom:15,
  },
  Navbar:{
    backgroundColor:'#E74292',
    flexDirection:'row',
    justifyContent:'center',
    alignContent:'center',
    marginBottom:20,
  }
})