import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions/index";

export class Main extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		const { currentUser } = this.props;
		return currentUser ? (
			<View style={{ flex: 1, justifyContent: "center" }}>
				<Text>User logged in </Text>
				<Text>Name: {currentUser.name}</Text>
				<Text>Email: {currentUser.email}</Text>
			</View>
		) : null;
	}
}

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
	bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
