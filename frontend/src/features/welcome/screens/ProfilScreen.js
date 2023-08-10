import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Button, Provider as PaperProvider, TextInput } from 'react-native-paper';
import formTheme from '../themes/FormTheme';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const ProfilScreen = () => {
  const informations = [
    { label: "Nom", value: "Mr Tard" },
    { label: "Niveau d'expérience", value: "confirmé" },
    { label: "Évaluation propriétaire", value: "      5/5" },
    { label: "Avis sur le profil", value: "7" },
    { label: "Objet en location", value: "12" },
    { label: "Nombre d'objets loués", value: "6" },
  ];

    
  const navigation = useNavigation();
  
  const handleContractPress = () => {
    // Navigate to the "Contrat de location" screen
    navigation.navigate('ContratDeLocationScreen');
  };

  const handleChecklistPress = () => {
    // Navigate to the "Outils d'état des lieux" screen
    navigation.navigate('OutilsDEtatDesLieuxScreen');
  };

  const handleHomeScreen = () => {
		navigation.navigate('HomeScreen');
	  };

  const profilePhotoUri = require('../../../../assets/SuperM.png');


  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating - filledStars > 0.5;
    const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(<Icon key={`star-${i}`} name="star" size={18} color="gold" />);
    }

    if (halfStar) {
      stars.push(<Icon key={`star-half`} name="star-half" size={18} color="gold" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Icon key={`star-empty-${i}`} name="star-outline" size={18} color="gold" />);
    }

    return stars;
  };

  return (
    <PaperProvider theme={formTheme}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {/* Your image here */}
          <View style={styles.imageContainer}>
  <Image source={profilePhotoUri} style={styles.profileImage} />
  <View style={styles.verifiedIconContainer}>
    <Icon name="check-circle" size={18} color="#00FF00" />
  </View>
</View>
        </View>
      </View>

      {/* Your component logic here */}
      {informations.map((info, index) => (
        <View key={index} style={styles.itemContainer}>
        <Text style={styles.label}>{info.label}: </Text>
        {info.label === "Évaluation propriétaire" ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {renderStars(parseFloat(info.value))}
            <Text style={styles.value}>{info.value}</Text>
        </View>
         ) : (
          <Text style={styles.value}>{info.value}</Text>
          )}
          </View>
      ))}

      <Button style={styles.button1} onPress={handleContractPress} labelStyle={styles.buttonText1}>Retour Page Produit</Button>
      <Button style={styles.button2} onPress={handleHomeScreen} labelStyle={styles.buttonText2}>Home</Button>
      <View style={styles.greenRectangle}>
				<Text style={styles.rectangleText}>
					Economies futées,{'\n'}
					Des revenus assurés !{' '}
				</Text>
			</View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
    itemContainer: {
      backgroundColor: '#ffffff',
      padding: 10,
      borderRadius: 8,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
      bottom: '20%',
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#155263',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    width: '80%',
    paddingHorizontal: 1,
    borderRadius: 20,
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: {
    width: 0,
    height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 4,
      bottom: '14%',
      left: '10%', // Ajustez cette valeur pour déplacer les boutons vers la gauche
  },

  buttonText1: {
      color: 'white',
      textAlign: 'center',
      fontSize: 18,
  },

  button2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFCE52',
    borderWidth: 1,
    borderColor: 'black', // Change the border color to black
    width: '80%',
    paddingHorizontal: 1,
    borderRadius: 20,
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 4,
    bottom: '12%',
    left: 40, // Ajustez cette valeur pour déplacer les boutons vers la gauche
  },

  buttonText2: {
      color: 'white',
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
    width: 110, // Adjust the size of the profile photo as needed
    height: 90,
    borderRadius: 25, // Set the borderRadius to half of the width and height to create a circle
    borderWidth: 2,
    borderColor: '#fff', // Optionally, you can set a border color for the profile photo
    position: 'absolute',
    top: 16,
    left: 16,
  },

  verifiedIconContainer: {
    position: 'absolute',
    bottom: -109,
    right: 355,
    backgroundColor: '#fff',
    borderRadius: 9,
    padding: 2,
    borderWidth: 2,
    borderColor: '#00FF00',
    left: 15,
  },

  greenRectangle: {
    weight: 40,
    backgroundColor: '#155263',
    paddingVertical: 2,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  rectangleText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },

  });
  
  