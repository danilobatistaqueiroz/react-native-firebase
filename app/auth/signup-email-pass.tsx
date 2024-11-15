import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';

function signup(email: string, password: string){
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User account created & signed in!');
      router.navigate("../(tabs)/explore")
    })
    .catch((error:any) => {
      if (error.code === 'auth/email-already-in-use') {
        console.error('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.error('That email address is invalid!');
      }

      console.error('signup error:',error);
    });
}

export default function SigninEmailPass() {

  const [email, onChangeEmail] = React.useState('jane.doe@example.com');
  const [password, onChangePassword] = React.useState('SuperSecretPassword!');
  
  useEffect(() => {
  }, []);

  return (
    <View>
      <Text>email password login</Text>
      <TextInput placeholder="email" value={email} onChangeText={onChangeEmail} />
      <TextInput secureTextEntry={true} placeholder="password" value={password} onChangeText={onChangePassword} />
      <Button title="Signup" onPress={() => signup(email, password)} />
    </View>
  );
}