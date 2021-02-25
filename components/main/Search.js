import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from "react-native";
import firebase from 'firebase'
import "firebase/firestore"
import { baseProps } from 'react-native-gesture-handler/dist/src/handlers/gestureHandlers';

export default function Search(props) {
    const [users, setUsers] = useState([])

    const fetchUsers = (search) => {
        firebase.firestore()
            .collection('users')
            .where('name', '>=', search)
            .get()
            .then(snapshot => {
                let users = snapshot.docs.map(doc => {
                    const data = doc.data()
                    const id = doc.id
                    return {
                        id, ...data
                    }
                })
                console.log('users', users)
                setUsers(users)
            })
    }

    return (
        <View style={{ margin: 40 }}>
            <TextInput
                placeholder='Type Here...'
                onChangeText={(search) => fetchUsers(search)}
            />
            <FlatList
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={(item) => (
                    <TouchableOpacity
                        style={{margin: 20}}
                    onPress={()=> props.navigation.navigate('Profile', {uid: item.item.id})}
                    >
                        <Text>{item.item.name}</Text>
                    </TouchableOpacity>
                )

                }
            />
        </View>
    );
}
