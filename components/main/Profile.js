import React from 'react'
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import {connect} from 'react-redux'


export function Profile(props) {
	const {currentUser, posts} = props
	console.log('snapshot', posts)
	console.log('currentUser', currentUser)

	return (
		<View>
			<Text>Profile</Text>
		</View>
	);
}

const mapStateToProps = (store)=> ({
	currentUser: store.userState.currentUser,
	posts: store.userState.posts
})

export default  connect(mapStateToProps, null)(Profile)