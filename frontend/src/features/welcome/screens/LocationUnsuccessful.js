import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Provider as PaperProvider, TextInput } from 'react-native-paper';
import formTheme from '../themes/FormTheme';
import { useNavigation } from '@react-navigation/native';

const RentalInformationCard = ({
  title,
  rentalPeriod,
  pricePerDay,
  totalPrice,
  depositPrice,
  paymentMethod,
}) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title1}>Resumé de Location</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.info}>Période de location: {rentalPeriod}</Text>
      <Text style={styles.info}>Prix par jour: {pricePerDay}€</Text>
      <Text style={styles.info}>Prix total: {totalPrice}€</Text>
      <Text style={styles.info}>Prix de caution: {depositPrice}€</Text>
      <Text style={styles.info}>Mode de paiement: {paymentMethod}</Text>
	  <Text style={styles.title2}>Etat de la demande : Demande refusée par le propriétaire.</Text>
    </View>
  );
};

export const LocationUnsuccessful = ({ navigation }) => {
  const handleContractPress = () => {
    // Navigate to the "Contrat de location" screen
    navigation.navigate('ContratDeLocationScreen');
  };

  const handleChecklistPress = () => {
    // Navigate to the "Outils d'état des lieux" screen
    navigation.navigate('OutilsDEtatDesLieuxScreen');
  };

  return (
    <PaperProvider theme={formTheme}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          
        </View>

        
      </View>

      {/* Your component logic here */}
      <View>
        {/* Render other UI components here */}
        <RentalInformationCard
          title="Tondeuse"
          rentalPeriod="10 days"
          pricePerDay="50"
          totalPrice="500"
          depositPrice="100"
          paymentMethod="Credit Card"
        />

        <Button style={styles.button1} onPress={handleContractPress}labelStyle={styles.buttonText1}>Poursuivre mes recherches</Button>
        
		<View style={styles.infoBar}></View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
	bottom: '60%',
  },
  title1: {
	fontSize: 29,
    fontWeight: 'bold',
    marginBottom: 12,
	textAlign:'center'
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
	bottom: '60%',
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
	bottom: '60%',
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
	bottom: '0%', // Ajustez cette valeur pour déplacer les boutons vers le bas
	width: '100%',
	height: 100,
	alignItems: 'center',
	justifyContent: 'center',
},

});