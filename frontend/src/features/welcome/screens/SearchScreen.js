import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Provider as PaperProvider, TextInput } from 'react-native-paper';
import formTheme from '../themes/FormTheme';
import { Searchbar } from 'react-native-paper';

export const SearchScreen = ({ navigation }) => {
  const handleSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  const handleSignInPress = () => {
    navigation.navigate('SignIn');
  };

  // Définissez les catégories ici
  const categories = ['Bricolage', 'Sport', 'Musique', 'Multimédia'];

  return (
    <PaperProvider theme={formTheme}>
      <View style={styles.container}>
	
        <View style={styles.imageContainer}>
          <Image source={require('../../../../assets/LogoCash.png')} style={styles.image} />
        </View>
		{/* Barre de recherche */}
	<View><TextInput
style={styles.textInput}
label="Rechercher"
mode="outlined"
Left={<TextInput.Icon icon="search" />}
/>      
        </View>

        {/* Affichage des boutons de catégorie */}
        <View style={styles.buttonCategorie}>
          
          {categories.map((category, index) => (
            <TouchableOpacity key={index} style={styles.button}>
              <Text style={styles.buttonText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoBar}>
          
        </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: '80%',
  },
  image: {
    flex: 1,
    maxWidth: '100%',
  },
  buttonCategorie: {
    position: 'absolute',
    bottom: '40%', // Ajustez cette valeur pour déplacer les boutons vers le bas
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
	height: 200,// hauteur des boutons 
  },

  button: {
    backgroundColor: '#155263',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
    marginVertical: 8,
    alignItems: 'center',
	width: 200,//largeur des boutons
  },
  buttonText: {
    color: '#FFCE52',
    textAlign: 'center',
    fontSize: 18,
  },

  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },

  buttonOutlined: {
    margin: 10,
    backgroundColor: '#FFCE52',
    borderWidth: 1,
    width: '45%',
    margin: 12,
	bottom: '10%',
  },

  infoBar: {
    backgroundColor: '#155263',
    paddingVertical: 8,
    paddingHorizontal: 16,
	position: 'absolute',
    bottom: '0%', // Ajustez cette valeur pour déplacer les boutons vers le bas
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },


  textInput: {
	marginTop: 110, 
		paddingVertical: 1,
		paddingHorizontal: 1,
		fontSize: 12,
		height: 35,
		backgroundColor: '#E8E8E8',
  },
});