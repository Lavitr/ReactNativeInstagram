import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "./components/auth/Landing";
import Register from "./components/auth/Register";
import MainScreen from "./components/Main";
import Login from "./components/auth/Login";
import * as firebase from "firebase";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(thunk));

const firebaseConfig = {
	apiKey: "AIzaSyDyTI9Xxa9eEwBIf0s6StU4n6sakKXmFM8",
	authDomain: "instagram-dev-8898c.firebaseapp.com",
	projectId: "instagram-dev-8898c",
	storageBucket: "instagram-dev-8898c.appspot.com",
	messagingSenderId: "570389010173",
	appId: "1:570389010173:web:834a0e642526938c155094",
	measurementId: "G-9YC0L0QTWR",
};

if (firebase.apps.length === 0) {
	firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			loggedIn: false,
		};
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (!user) {
				this.setState({
					loaded: true,
					loggedIn: false,
				});
			} else {
				this.setState({
					loaded: true,
					loggedIn: true,
				});
			}
		});
	}

	render() {
		const { loaded, loggedIn } = this.state;

		if (!loaded) {
			return (
				<View style={{ flex: 1, justifyContent: "center" }}>
					<Text>Loading ...</Text>
				</View>
			);
		}
		if (!loggedIn) {
			return (
				<NavigationContainer>
					<Stack.Navigator initialRouteName="Landing">
						<Stack.Screen
							name="Landing"
							component={LandingScreen}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Register"
							component={Register}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Login"
							component={Login}
							options={{ headerShown: false }}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			);
		}
		return (
			<Provider store={store}>
				<MainScreen />
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "orange",
		alignItems: "center",
		justifyContent: "center",
	},
});
