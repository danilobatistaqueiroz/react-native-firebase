import { StyleSheet, Image, Platform, Button, View, Alert, Text, Pressable } from 'react-native';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { useLocalSearchParams, Link, router } from 'expo-router';
import { doc, onSnapshot, DocumentSnapshot, QuerySnapshot, DocumentData  } from "firebase/firestore";

// console.log(__DEV__);
// if (__DEV__) {
//   firestore().useEmulator('localhost', 8080);
// }

let db:FirebaseFirestoreTypes.Module;

  async function bootstrap() {
    await firestore().settings({
      //persistence: false, // disable offline persistence
    });
    db = firestore();
    //db.useEmulator('192.168.1.26', 8080);

    // const unsub = db.collection("Users").onSnapshot(
    //   (snapshot:any) => {
    //     if(!snapshot) return;
    //     snapshot.docChanges().forEach((change:any) => {
    //       console.log('data:',change.doc.data());
    //     });
    // });

  }

type User = {email:string,age:number,name:string}
const UsersScreen = (props:any) => {

  bootstrap();



  

  //console.log('props',props);

  const local = useLocalSearchParams();

  //console.log("Local:", local);
  //console.log("Local.Email:", local.email);

  const [user, setUser] = useState<User>({email:'',age:0,name:''});

  useEffect(()=> {
    const user:User = {
      name: 'Jackie Jonie',
      age: 13,
      email: local.email.toString()
    };
    setUser(user);
  },[]);

  async function getMarker() {
    console.log('getMarker');
    
    const snapshot = await db.collection('Users').get()
    let markers = snapshot.docs.map(doc => doc.id);
    markers.forEach(m => getPending(m));
  }

  function getPending(id:string){
    db.collection("Users").doc(id).onSnapshot((d:any) => {
      var source = d.metadata.hasPendingWrites ? "Local" : "Server";
      console.log(source, " from cache: ", d.metadata.fromCache, " data: ", d.data());
    });
  }

  function getDocument(){

    // db.collection("Users").doc("1SHj7fLRr2LuML3bvpNJ")
    // .onSnapshot((doc:any) => {
    //     var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
    //     console.log(source, " data: ", doc.data());
    // });
    getMarker();
    
    //console.log('getDocument',db);
    const usersCollection = db.collection('Users');
    //console.log('usersCollection',usersCollection);
    usersCollection
    //.where("email", "==", user.email)
    .get({source:'default'}).then((documentSnapshot:FirebaseFirestoreTypes.DocumentData) => {
      //console.log('todos:',documentSnapshot);
      documentSnapshot.forEach((doc:DocumentData) => {
        //console.log(doc);



        console.log('Document data:', doc.data());
        //setUser(documentSnapshot.data());
      });
      if (documentSnapshot.empty) {
        console.error('No such document!');
      }
    }).catch((error) => {
      console.error('Error getting document:', error);
    });
  }

  function createCollection(){
    //console.log('createCollection');
    const usersCollection = db.collection('Users');
    //console.log('usersCollection',usersCollection);
    try {
      //console.log('user',user);
      usersCollection.add(user).then(() => {
        //console.log('document added');
        Alert.alert('Document added!');
      }).catch(reason => {
        console.error(reason);
      });
    } catch(e){
      console.error(e);
    } finally {
      //console.log('fim');
    }
  }

  return (
    <View style={{marginTop:150}}>
      <Text>Welcome {user.email}</Text>
      <Pressable onPress={() => {createCollection()}} style={styles.btn} ><Text>criar coleção</Text></Pressable>
      <Pressable onPress={() => {getDocument()}} style={styles.btn} ><Text>exibir documento</Text></Pressable>
      <Pressable onPress={() => {
        auth().signOut();
        router.navigate("../(tabs)/explore");
      }} style={styles.btn} ><Text>logout</Text></Pressable>
    </View>
  );

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
    paddingTop: 5,
    paddingLeft: 30,
    paddingBottom: 5,
    marginTop: 9,
    marginBottom: 9,
  }
});


export default UsersScreen;