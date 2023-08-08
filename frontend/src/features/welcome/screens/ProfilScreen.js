import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Provider as PaperProvider, TextInput } from 'react-native-paper';
import formTheme from '../themes/FormTheme';
import { useNavigation } from '@react-navigation/native';

export const ProfilScreen = () => {
  const informations = [
    { label: "Nom", value: "Mr Tard" },
    { label: "Niveau d'expérience", value: "Amateur" },
    { label: "Évaluation propriétaire", value: "5/5" },
    { label: "Avis sur le profil", value: "7" },
    { label: "Objet en location", value: "12" },
    { label: "Nombre d'objets loués", value: "6" },
  ];

  const handleContractPress = () => {
    // Navigate to the "Contrat de location" screen
    navigation.navigate('ContratDeLocationScreen');
  };

  const handleChecklistPress = () => {
    // Navigate to the "Outils d'état des lieux" screen
    navigation.navigate('OutilsDEtatDesLieuxScreen');
  };

  const profilePhotoUri = require('../../../../assets/SuperM.png');

  return (
    <PaperProvider theme={formTheme}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {/* Your image here */}
          <View style={styles.imageContainer}>
          <Image source={profilePhotoUri} style={styles.profileImage} />
        </View>
        </View>
      </View>

      {/* Your component logic here */}
      {informations.map((info, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.label}>{info.label}: </Text>
          <Text style={styles.value}>{info.value}</Text>
        </View>
      ))}

      <Button style={styles.button1} onPress={handleContractPress} labelStyle={styles.buttonText1}>Retour Page Produit</Button>
      <Button style={styles.button2} onPress={handleChecklistPress} labelStyle={styles.buttonText2}>Home</Button>
      <View style={styles.infoBar}></View>
    </PaperProvider>
  );
};


const styles = StyleSheet.create({
    itemContainer: {
      backgroundColor: '#ffffff',
      padding: 16,
      borderRadius: 8,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
      bottom: '9%',
    },
    label: {
        fontSize: 13,
      fontWeight: 'bold',
      marginBottom: 5,
      textAlign:'left'
    },
    title1: {
      fontSize: 29,
      fontWeight: 'bold',
      marginBottom: 12,
      textAlign:'center',
    },
  
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    title2: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    info: {
      fontSize: 16,
      marginBottom: 4,
    },
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
  
  button1: {
      backgroundColor:'#155263',
      alignItems: 'center',
      paddingVertical: 12,
      marginVertical: 7,
      width: 290, //largeur des boutons
      borderRadius: 50, //  pour des bords arrondis
      bottom: '9%',
      left: '12%', // Ajustez cette valeur pour déplacer les boutons vers la gauche
  },

  buttonText1: {
      color: '#FFCE52',
      textAlign: 'center',
      fontSize: 18,
  },

  button2: {
      backgroundColor: '#FFCE52',
      alignItems: 'center',
      paddingVertical: 12,
      marginVertical: 7,
      width: 290, //largeur des boutons
      borderRadius: 50, //  pour des bords arrondis
      bottom: '9%',
      left: '12%', // Ajustez cette valeur pour déplacer les boutons vers la gauche
  },

  buttonText2: {
      color: '#155263',
      textAlign: 'center',
      fontSize: 18,
  },
  
  infoBar: {
      backgroundColor: '#155263',
      paddingVertical: 8,
      paddingHorizontal: 16,
      position: 'absolute',
      bottom: '-10%', // Ajustez cette valeur pour déplacer les boutons vers le bas
      width: '100%',
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
  },
  
  profileImage: {
    width: 50, // Adjust the size of the profile photo as needed
    height: 50,
    borderRadius: 25, // Set the borderRadius to half of the width and height to create a circle
    borderWidth: 2,
    borderColor: '#fff', // Optionally, you can set a border color for the profile photo
    position: 'absolute',
    top: 16,
    left: 16,
  },
  });
  
  


