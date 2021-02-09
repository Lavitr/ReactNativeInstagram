import React, { Component } from "react";
import { Text, View, Button, TextInput } from "react-native";
import firebase from "firebase";

export class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			name: "",
		};
		this.onSignUp = this.onSignUp.bind(this);
	}

	onSignUp() {
		const { email, name, password } = this.state;
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				firebase
					.firestore()
					.collection("users")
					.doc(firebase.auth().currentUser.uid)
					.set({ email, name });
				console.log(result);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<View>
				<TextInput
					placeholder="name"
					onChangeText={(name) => {
						this.setState({ name });
					}}
				/>
				<TextInput
					placeholder="email"
					onChangeText={(email) => {
						this.setState({ email });
					}}
				/>
				<TextInput
					placeholder="password"
					secureTextEntry
					onChangeText={(password) => {
						this.setState({ password });
					}}
				/>
				<Button onPress={() => this.onSignUp()} title="Sign Up" />
			</View>
		);
	}
}

export default Register;
