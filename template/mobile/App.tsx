/// <reference types="numic/types" />
import React from 'react'
import { StatusBar, StyleSheet, View, Text, Image } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import logo from './logo.png'

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  wrapper: {
    padding: 20,
    alignItems: 'center',
    gap: 40,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 40,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  mode: {
    fontSize: 16,
  },
  green: {
    color: '#3add85',
  },
})

export function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={styles.wrapper}>
          <Image style={styles.image} source={logo} />
          <Text style={styles.text}>
            Welcome to <Text style={styles.green}>numic</Text>!
          </Text>
          <Text style={styles.mode}>Running in {__DEV__ ? 'Debug' : 'Release'} Mode</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
