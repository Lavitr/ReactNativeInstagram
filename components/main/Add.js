import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from 'expo-image-picker';

export default function App({navigation}) {
	const [hasPermission, setHasPermission] = useState(null);
	const [galleryPermission, setGalleryPermission] = useState(null);
	const [camera, setCamera] = useState(null);
	const [image, setImage] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			setHasPermission(status === "granted");

			const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
			setGalleryPermission(galleryStatus.status !== 'granted')
		})();
	}, []);

	if (hasPermission === null || galleryPermission === null) {
		return <View />;
	}
	if (hasPermission === false || galleryPermission === null) {
		return <Text>No access to camera</Text>;
	}

	// const takePicture = async () => {
	// 	if (camera) {
	// 		console.log('1')
	// 		camera.resumePreview()
	// 		console.log('33')

	// 		const data = await camera.takePictureAsync();
	// 		console.log(data.uri);
	// 	}
	// };

	const takePicture = async () => {
		if (camera) {
			console.log('takePicture')
		  const options = { quality: 0.5, base64: true };
		  try {
			camera.resumePreview();
			const data = await camera.takePictureAsync(null);
			setImage(data.uri)
		  } catch (error) {
			console.log(JSON.stringify(error, null, 2));
		  }
		}
	  };

	  const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
		  mediaTypes: ImagePicker.MediaTypeOptions.Images,
		  allowsEditing: true,
		  aspect: [1, 1],
		  quality: 1,
		});
		
		if (!result.cancelled) {
		  setImage(result.uri);
		}
	  };
	

	return (
		<View style={{ flex: 1, margin:40 }}>
			<View style={styles.cameraContainer}>
				<Camera
					style={styles.fixedRatio}
					type={type}
					ratio={"1:1"}
					ref={(ref) => setCamera(ref)}
					onCameraReady={ ()=>{console.log('camera Ready')}}

				/>
			</View>
			<Button
				style={{ flex: 1 }}
				title="Flip image"
				onPress={() => {
					setType(
						type === Camera.Constants.Type.back
							? Camera.Constants.Type.front
							: Camera.Constants.Type.back
					);
				}}
			></Button>
			<Button title="Take picture" onPress={() => takePicture()}></Button>
			<Button title="Pick Image from Gallery" onPress={() => pickImage()}></Button>
			<Button title="Save" onPress={() => navigation.navigate('Save',{image})}></Button>
			{image && <Image source={{uri: image}} style={{flex: 1}}></Image>}
		</View>
	);
}

const styles = StyleSheet.create({
	cameraContainer: {
		flex: 1,
		flexDirection: "row",
	},
	fixedRatio: {
		flex: 1,
		aspectRatio: 1,
	},
});
