import firebase from 'firebase'
import {USER_STATE_CHANGE} from '../constans/index'

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
					console.log("snapshot2", snapshot);
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