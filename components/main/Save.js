import React, { useState } from "react";
import {
	StyleSheet,
	TextInput,
	View,
	TouchableOpacity,
	Button,
	Image,
} from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/firebase-storage";

export default function Save(props) {
	const [caption, setCaption] = useState("");

	const uploadImage = async () => {
		const uri = props.route.params.image;
		const response = await fetch(uri);
		const blob = await response.blob();
		const picturePath = `post/${
			firebase.auth().currentUser.uid
		}/${Math.random().toString(36)}`;
		console.log("picturePath", picturePath);

		const task = firebase.storage().ref().child(picturePath).put(blob);

		const taskProgress = (snapshot) => {
			console.log(`transfers: ${snapshot.bitesTransfered}`);
		};

		const taskCompleted = () => {
			task.snapshot.ref.getDownloadURL().then((snapshot) => {
				savePostData(snapshot, caption)
				console.log("snapshot", snapshot);
			});
		};

		const taskError = (snapshot) => {
			console.log(snapshot);
		};

		task.on("state_changed", taskProgress, taskError, taskCompleted);
	};

	const savePostData = (getDownloadURL, caption) => {
		firebase
			.firestore()
			.collection("posts")
			.doc(firebase.auth().currentUser.uid).collection('userPosts').add({
				getDownloadURL,
				caption,
				creation: firebase.firestore.FieldValue.serverTimestamp()
			}).then(function(){
				props.navigation.popToTop()
			})
	};

	return (
		<View style={{ flex: 1, margin: 40 }}>
			<Image source={{ uri: props.route.params.image }} />
			<TextInput
				placeholder="Write a caption..."
				onChangeText={(caption) => setCaption(caption)}
			/>
			<Button title="Save" onPress={() => uploadImage()} />
		</View>
	);
}
