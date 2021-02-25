import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { connect } from 'react-redux'
import firebase from 'firebase'
import "firebase/firestore"

export function Profile(props) {
	const [userPost, setUserPost] = useState([])
	const [user, setUser] = useState(null)


	useEffect(() => {
		const { currentUser, posts } = props
		console.log('snapshot', posts)
		console.log('currentUser', currentUser)
		if (props.route.params.uid === firebase.auth().currentUser.uid) {
			setUser(currentUser)
			setUserPost(posts)
		} else {
			firebase
			.firestore()
			.collection("users")
			.doc(props.route.params.uid)
			.get()
			.then((snapshot) => {
				if (snapshot.exists) {
					setUser(snapshot.data())
				} else {
					console.log("user does not exist");
				}
			});
			firebase
			.firestore()
			.collection("posts")
			.doc(props.route.params.uid)
			.collection("userPosts")
			.orderBy('creation','asc')
			.get()
			.then((snapshot) => {
				let posts = snapshot.docs.map(doc => {
					const data = doc.data()
					const id = doc.id
					return {
						id, ...data
					}
				})
				setUserPost(posts)
			});
		}
	}, [props.route.params.uid])

	if (user === null) {
		return <Text>'EMPTY</Text>
	}

	return (
		<View style={styles.container}>
			<View style={styles.containerInfo}>
				<Text>{user.name}</Text>
				<Text>{user.email}</Text>
			</View>
			<View style={styles.containerGalery}>
				<FlatList
					numColumns={3}
					horizontal={false}
					data={userPost}
					renderItem={
						({ item }) => (
							<View style={styles.containerImage}>

								<Image
									style={styles.image}
									source={{ uri: item.getDownloadURL }}
								/>
							</View>
						)
					}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 40
	},
	containerInfo: {
		margin: 20
	},
	containerGalery: {

	},
	image: {
		flex: 1,
		aspectRatio: 1/1
	},
	containerImage: {
		flex: 1/3
	}

})
	
const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser,
	posts: store.userState.posts
})

export default connect(mapStateToProps, null)(Profile)