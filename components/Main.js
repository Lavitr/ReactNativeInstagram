import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import firebase from 'firebase'
import { fetchUser, fetchUserPosts, fetchUserFollowing } from "../redux/actions/index";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FeedScreen from './main/Feed'
import SearchScreen from './main/Search'
import ProfileScreen from './main/Profile'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createMaterialBottomTabNavigator();
const EmptyScreen = () => null

export class Main extends Component {
	componentDidMount() {
		this.props.fetchUser();
		this.props.fetchUserPosts();
		this.props.fetchUserFollowing();
	}

	render() {
		return (
			<Tab.Navigator initialRouteName="Feed" labeled={false}>
				<Tab.Screen
					name="Feed"
					component={FeedScreen}
					options={{
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons
								name="home"
								color={color}
								size={26}
							/>
						),
					}}
				/>
				<Tab.Screen
					name="Search"
					component={SearchScreen}
					navigation={this.props.navigation}
					options={{
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons
								name="magnify"
								color={color}
								size={26}
							/>
						),
					}}
				/>
				<Tab.Screen
					name="AddContainer"
					listeners={({ navigation }) => ({
						tabPress: event => {
							event.preventDefault()
							navigation.navigate("Add")
						}
					})}
					component={EmptyScreen}
					options={{
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons
								name="plus-box"
								color={color}
								size={26}
							/>
						),
					}}
				/>
				<Tab.Screen
					name="Profile"
					listeners={({ navigation }) => ({
						tabPress: event => {
							event.preventDefault()
							navigation.navigate("Profile", { uid: firebase.auth().currentUser.uid })
						}
					})}
					component={ProfileScreen}
					options={{
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons
								name="account-circle"
								color={color}
								size={26}
							/>
						),
					}}
				/>
			</Tab.Navigator>
		);
	}
}

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
	bindActionCreators({ fetchUser, fetchUserPosts, fetchUserFollowing }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
