import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Provider as PaperProvider, TextInput } from 'react-native-paper';
import formTheme from '../themes/FormTheme';
import { useNavigation } from '@react-navigation/native';

export const MesAnnonces = () => {

    const persons = [
        {
          name: "Guitare",
          surname: "bon état",
          date: "du 30/08/2023 au 18/09/2023",
          statut: "à venir",
          image: require('../../../../assets/SuperM.png')
        },
        {
          name: "Tondeuse",
          surname: "usé",
          date: "du 07/08/2023 au 19/09/2023",
          statut: "en cours",
          image: require('../../../../assets/chien.png')
        },
        {
          name: "Raquette",
          surname: "bon etat",
          date: "du 08/08/2023 au 30/09/2023",
          statut: "en cours",
          image: require('../../../../assets/SuperM.png')
        },
        {
            name: "Piano",
            surname: "bon etat",
            date: "du 08/08/2023 au 30/09/2023",
            statut: "en cours",
          image: require('../../../../assets/chien.png')
        },
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
      {/* Your component logic here */}
      {persons.map((person, index) => (
        <View key={index} style={styles.itemContainer}>
          <View style={styles.imageContainer}>
            
          </View>
          <View style={styles.infoContainer}>
          <Image source={person.image} style={styles.profileImage} />
            <Text style={styles.label}>titre produit: {person.name}</Text>
            <Text style={styles.label}>etat produit: {person.surname}</Text>
            <Text style={styles.label}>date de location: {person.date}</Text>
            <Text style={styles.label}>statut location: {person.statut}</Text>
          </View>
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
      padding: 9,
      borderRadius: 7,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
      bottom: '-3%',
    },

    infoContainer: {
        backgroundColor: '#ffffff',
        padding: 9,
        borderRadius: 8,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        bottom: '8%',
      },

    label: {
        fontSize: 13,
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'justify',
    left: 80,
    },
 
    value : {
        fontSize: 15,
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'right',
      color :'#FFCE52',
    },

    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    
    container: {
      flex: 1,
      backgroundColor: '#F1F1F1',
     },
    imageContainer: {
      position: 'absolute',
      top: 0,
      left: 15,
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
      paddingVertical: 1,
      marginVertical: 7,
      width: 290, //largeur des boutons
      borderRadius: 50, //  pour des bords arrondis
      bottom: '-10%',
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
      paddingVertical: 1,
      marginVertical: 7,
      width: 290, //largeur des boutons
      borderRadius: 50, //  pour des bords arrondis
      bottom: '5%',
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
    width: 60, // Adjust the size of the profile photo as needed
    height: 60,
    borderRadius: 2, // Set the borderRadius to half of the width and height to create a circle
    borderWidth: 0,
    borderColor: '#fff', // Optionally, you can set a border color for the profile photo
    position: 'absolute',
    top: 16,
    left: 16,
  },

  labelImage: {
    width: 30, // Ajustez la taille de l'image du label selon vos besoins
    height: 30,
    marginRight: 35, // Ajoutez une marge à droite pour séparer l'image du texte
  },

  });
  
  