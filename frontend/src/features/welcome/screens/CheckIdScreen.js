import React, {useState} from 'react';
import { Controller, useController, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View, Text, Image} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Button, HelperText, Provider as PaperProvider, TextInput } from 'react-native-paper';
import { CustomTextInput } from '../components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import formTheme from '../themes/FormTheme';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import placeholderImage from '../../../../assets/Vacant.png';
import CheckBox from 'expo-checkbox';

export const CheckIdScreen = () => {
	/* const navigation = useNavigation();
	const handleSignUpPress = () => {
		navigation.navigate('SignUpScreen');
	}; */
	const pickImageFromGallery = async (field) => {
		const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
	  
		if (status === 'granted') {
		  const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		  });
	  
		  if (!result.canceled) {
			field.onChange(result.assets[0].uri);
		  }
		} else {
		  console.log('Permission not granted');
		}
	  };
	  
	  const takePhoto = async (field) => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
	  
		if (status === 'granted') {
		  const result = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		  });
	  
		  if (!result.cancelled) {
			field.onChange(result.uri);
			setLivePhoto(result.uri); 
		  }
		} else {
		  console.log('Permission not granted');
		}
	  };
	  
	
	const [livePhoto, setLivePhoto] = useState('');
  
	const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [sendRecto, setSendRecto] = useState('');
	const [sendVerso, setSendVerso] = useState('');

	const {
		handleSubmit,
		control,
		formState: { errors },
		getValues,
		reset,
	} = useForm();

	const toggleTermsAcceptance = () => {
		setAcceptedTerms(!acceptedTerms);
	  };
	const onSubmit = (data) => {
		data.livePhoto = livePhoto;
		console.log(data);
	};

	const onReset = () => {
		reset();
	};

	return (
		<PaperProvider theme={formTheme}>
			<View style={styles.container}>
				{/* <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={50}> */}
				<ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
				<Controller
  name="rectoID"
  control={control}
  defaultValue=""
  rules={{
  required: "Le recto de votre pièce d'identité est obligatoire",	}}
  render={({ field }) => (
    <View>
      <TextInput
        {...field}
		style={styles.textInput}
		value={field.value}
		label="Recto de votre pièce d'identité"
		mode="outlined"
        right={<TextInput.Icon icon="plus" onPress={() => pickImageFromGallery(field)} />}
      />
      {errors.rectoID && <HelperText type="error">{errors.rectoID.message}</HelperText>}
    </View>
  )}
/>

<Controller
  name="versoID"
  control={control}
  defaultValue=""
  rules={{
  required: "Le verso de votre pièce d'identité est obligatoire",
  }}
  render={({ field }) => (
    <View>
      <TextInput
        style={styles.textInput}
		value={field.value}
		label="Verso de votre pièce d'identité"
		mode="outlined"
		error={errors.versoID}
        right={<TextInput.Icon icon="plus" onPress={() => pickImageFromGallery(field)} />}
      />
      {errors.versoID && <HelperText type="error">{errors.versoID.message}</HelperText>}
    </View>
  )}
/>

<Controller
  name="livePhoto"
  control={control}
  defaultValue=""
  rules={{
  required: "Une photo immédiate est requise",
  }}
  render={({ field }) => (
    <View>
      <TextInput
        {...field}
		style={styles.textInput}
		value={field.value}
		label="Une photo prise à l'instant"
		mode="outlined"
		error={errors.versoID}
        right={<TextInput.Icon icon="camera" onPress={() => takePhoto(field)} />}
      />
      {errors.livePhoto && <HelperText type="error">{errors.livePhoto.message}</HelperText>}
    </View>
  )}
/>
 {/* ... */}
      {/* Image placeholder */}
      {!livePhoto && <Image source={placeholderImage} style={styles.placeholderImage} />}
<ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
  {/* Affichez la "livePhoto" conditionnellement */}
  {livePhoto ? <Image source={{ uri: livePhoto }} style={styles.image} /> : null}

  {/* Le reste de votre code pour les champs TextInput */}
</ScrollView>

<Button style={styles.buttonNewPhoto}
mode="outlined"
onPress={() => {
field.onChange(''); 
setLivePhoto(''); 
}}
        >
          Prendre une nouvelle photo
        </Button>	
		
					
					<View style={styles.checkboxContainer}>
        <CheckBox
          value={acceptedTerms}
          onValueChange={toggleTermsAcceptance}
        />
        <Text style={styles.checkboxLabel}>
		Je reconnais avoir pris connaissance du réglement et je certifie la conformité des informations soumises.
        </Text>
      </View>
	  <Button style={styles.buttonOutlined}>
					<Text style={styles.buttonText}>Valider mon compte</Text>
					</Button>
					<Button style={styles.buttonReset} onPress={onReset}>
						Reset
					</Button>
				</ScrollView>
			</View>
			
		</PaperProvider>
	);
};

const styles = StyleSheet.create({
	buttonNewPhoto:{
		marginTop: 15,
	},
	container: {
		flex: 1,
		padding: 25,
		justifyContent: 'space-between',
	},
	scrollContainer: {
		flexGrow: 1,
	},
	buttonsContainer: {
		flex: 1,
		alignContent: 'flex-end',
		marginTop: 10,
	},
	
	  checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 15,
		marginBottom: 10,
		marginLeft: 10,
		marginRight: 5,
	  },
	  checkboxLabel: {
		marginLeft: 8,
		fontSize: 14,
	  },
	buttonText: {
		color: 'white',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 16,
	  },
	buttonOutlined: {
		margin: 5,
		backgroundColor: '#FFCE52',
		fontColor: 'black',
		borderWidth: 1,
		width: '100%',
		alignSelf: 'center',
		
	},
	textInput: {
		paddingVertical: 1,
		paddingHorizontal: 1,
		fontSize: 12,
		height: 35,
		backgroundColor: '#E8E8E8',
	},
	image: {
		width: 300,
		height: 300,
		borderRadius: 8,
		resizeMode: 'cover',
		alignSelf: 'center',
		marginTop: 20,
	  },
	scrollContainer:{
		flex: 1,
	},
	placeholderImage:{
		width: 300,
		height: 300,
		borderRadius: 8,
		resizeMode: 'cover',
		alignSelf: 'center',
		marginTop: 20,
	  },
});
