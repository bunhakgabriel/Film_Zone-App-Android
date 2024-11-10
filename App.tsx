import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Home } from './src/screens/home/Home';
import { Routes } from './src/routes';
import { MovieProvider } from './src/contexts/MoviesContext';
import { Login } from './src/components/Login/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Cadastro } from './src/components/Cadastro/Cadastro';
import { Details } from './src/screens/Details/Details';

const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={Login}
          options={{
            title: 'Entrar',
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Cadastro'
          component={Cadastro}
          options={{ title: 'Voltar' }}
        />
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            title: 'Voltar',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>

    // <MovieProvider>
    //   <View style={styles.container}>
    //     <Routes />
    //     <StatusBar style="auto" />
    //   </View>
    // </MovieProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242A32',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
