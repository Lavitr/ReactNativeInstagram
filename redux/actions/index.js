import firebase from 'firebase'
import {USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE} from '../constans/index'

export function fetchUser() {
	const userId = firebase.auth().currentUser.uid;
	return (dispatch) => {
		firebase
			.firestore()
			.collection("users")
			.doc(userId)
			.get()
			.then((snapshot) => {
				if (snapshot.exists) {
					dispatch({
						type: USER_STATE_CHANGE,
						currentUser: snapshot.data(),
					});
				} else {
					console.log("user does not exist");
				}
			});
	};
}

export function fetchUserPosts() {
	const userId = firebase.auth().currentUser.uid;
	return (dispatch) => {
		firebase
			.firestore()
			.collection("posts")
			.doc(userId)
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
				dispatch({
					type: USER_POSTS_STATE_CHANGE,
					posts
				});
			});
	};
}