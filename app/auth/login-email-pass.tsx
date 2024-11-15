import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';

function login(email: string, password: string){
  console.log('login', email, password);
  
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User logged in!');
      router.navigate("../(tabs)/explore")
    })
    .catch((error:any) => {
      console.error('login error:',error);
    });
}

export default function LoginEmailPass() {

  const [email, onChangeEmail] = React.useState('jane.doe@example.com');
  const [password, onChangePassword] = React.useState('SuperSecretPassword!');
  
  useEffect(() => {
  }, []);

  return (
    <View>
      <Text>email password login</Text>
      <TextInput placeholder="email" value={email} onChangeText={onChangeEmail} />
      <TextInput secureTextEntry={true} placeholder="password" value={password} onChangeText={onChangePassword} />
      <Button title="Login" onPress={() => login(email, password)} />
    </View>
  );
}