import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';

import { Link, router, Stack } from 'expo-router';

class User {
  email: string = '';
  constructor(email: string) {
    this.email = email;
  }
  toString():string{
    return `${this.email}`;
  }
}

export default function TabTwoScreen() {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User|null>();

  const fire = auth()
  //fire.useEmulator("http://192.168.1.26:9099")


  function onAuthStateChanged(user:any) {
    //console.log('user',user);
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    //console.log('onAuthStateChanged');
    const subscriber = fire.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  
  if (initializing) return null;
  //console.log('initializing:',initializing);

  //console.log('user:',user)
  if (!user) {
    return (
      <View style={{marginTop:150}}>
        <Text>Login</Text>
        <Link href="/auth/signup-email-pass" style={styles.btn}>signup</Link>
        <Link href="/auth/login-email-pass" style={styles.btn}>login</Link>
      </View>
    );
  }

  if (user) {
    return (
      <View style={{marginTop:150}}>
        <Text>Welcome {user.email}</Text>
        <Link href={`/dashboard/users?email=${user.email}`} style={styles.btn}>Go to home screen</Link>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  btn: {
    backgroundColor: '#99aaff',
    shadowColor: '#9900ff',
    color: 'white',
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    minHeight: 30,
    minWidth: 30,
    padding: 10,
    margin: 3,
  }
});
