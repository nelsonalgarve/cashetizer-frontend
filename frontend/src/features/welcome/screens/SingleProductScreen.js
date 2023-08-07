import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import { ScrollView, Image, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Modal, Portal, Button, Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import PhotoViewerModal from '../../helpers/PhotoViewerModal';

export const SingleProductScreen = () => {
	const navigation = useNavigation();
	const SignInScreen = () => {
		navigation.navigate('SignIn');
	};
        const fakeItem = {
          ownerId: '12345',
          name: "Fond Photo 'Les Mignons'",
          description: "Transformez vos photos en chef-d'œuvre avec ce fond photo unique en son genre. Donnez à vos clichés une touche très artistique et plus professionnelle en utilisant notre magnifique fond 'Les Mignons'.",
          photos: ['/Users/meon/Downloads/Cashetizer/cashetizer-frontend/frontend/assets/fakeImage.jpg'],
          etat: "Excellent",
          prices: {
            day: 15,
            week: 90,
            month: 300,
          },
          caution: 50,
          category: 'Electronics',
          localisation: 'Paris, France',
          periodes: [
            { start: '2023-08-01', end: '2023-08-07' },
            { start: '2023-08-10', end: '2023-08-20' },
          ],
        };

        const calculateDays = (startDate, endDate) => {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const timeDifference = end.getTime() - start.getTime();
            const days = timeDifference / (1000 * 3600 * 24);
            return Math.ceil(days);
          };
        const calculateTotalCost = (pricePerDay, startDate, endDate) => {
            const days = calculateDays(startDate, endDate);
            return pricePerDay * days;
          };
        const [selectedPeriodIndex, setSelectedPeriodIndex] = useState(0);

          const handlePeriodChange = (index) => {
          setSelectedPeriodIndex(index);
          };
        const numberOfStars = "3"
        const [isModalVisible, setModalVisible] = useState(false);
        const toggleModal = () => {
            setModalVisible(!isModalVisible);
          };
          
  
        const selectedPeriod = fakeItem.periodes[selectedPeriodIndex];
  const totalCost = calculateTotalCost(
    fakeItem.prices.day, 
    selectedPeriod.start,
    selectedPeriod.end
  );
  const [photoViewerVisible, setPhotoViewerVisible] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const openPhotoViewer = (index) => {
    setSelectedPhotoIndex(index);
    setPhotoViewerVisible(true);
  };

  const closePhotoViewer = () => {
    setPhotoViewerVisible(false);
  };


	return (
        <PaperProvider>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <View style={styles.container}>
          <Modal visible={photoViewerVisible} transparent={true}>
        <PhotoViewerModal
          visible={photoViewerVisible}
          photos={fakeItem.photos}
          currentIndex={selectedPhotoIndex}
          onClose={closePhotoViewer}
          onNext={() => setSelectedPhotoIndex(selectedPhotoIndex + 1)}
          onPrev={() => setSelectedPhotoIndex(selectedPhotoIndex - 1)}
          showDeleteIcon={false} 
        />
      </Modal>
            <View style={styles.greyRectangle}>
              <Text style={styles.name}>{fakeItem.name} à {totalCost}€</Text>
              <View style={styles.periodesContainer}>
                <Text style={styles.periodes}>Périodes de location:</Text>
                {fakeItem.periodes.map((periode, index) => (
                  <Text key={index} style={styles.periode}>
                    {periode.start} à {periode.end}
                  </Text>
                ))}
              </View>
              <Button style={styles.buttonOutlined} mode="outlined" onPress={SignInScreen}>
                <Text style={styles.buttonText}>Valider la location</Text>
              </Button>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
              <View style={styles.contentContainer}>
                <View style={styles.imageContainer}>
                <TouchableOpacity onPress={() => openPhotoViewer(0)}>
                <Image source={require('../../../../assets/fakeImage.jpg')} style={styles.image} />
      </TouchableOpacity>      
                   

                    {/* <Image source={{ uri: fakeItem.photos[0] }} style={styles.image} /> */}
					
                    
                    
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: -130 }}>
  <View>
    <Text style={{ color:"black", fontWeight:600 }}>36 évaluations</Text>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {Array.from({ length: numberOfStars }).map((_, index) => (
        <Ionicons
          key={index}
          name={'star'}
          size={25}
          color={'gold'}
        />
      ))}
    </View>
  </View>
  <View style={{ marginTop: -10 }}>
    <Text>À 1 km</Text>
    <Text style={{ color:"green", fontWeight:500 }} >Disponible</Text>
  </View>
</View>
<Text style={styles.description}>{fakeItem.description}</Text>

<View style={styles.infoContainer}>
<View style={styles.infoRow}>
  <Text style={styles.infoLabel}>Prix:</Text>
  <Text style={styles.infoText}>
    {fakeItem.prices.day}€ par jour{' '}
    <Ionicons name="information-circle-outline" size={20} color="blue" onPress={toggleModal} />
  </Text>
</View>
<Portal>
  <Modal visible={isModalVisible} onDismiss={toggleModal} contentContainerStyle={styles.modalContainer}>
  <Text style={styles.modalTitle}>Plus je loue, moins je paye 😀</Text>
  <Text style={styles.modalText}>Prix par jour: {fakeItem.prices.day}€</Text>
  <Text style={styles.modalText}>Prix par semaine: {fakeItem.prices.week}€</Text>
    <Text style={styles.modalText}>Prix par mois: {fakeItem.prices.month}€</Text>
    <Button style={{ marginTop:20, alignItems: 'center', backgroundColor: '#155263', color:"white" }} mode="outlined" onPress={toggleModal}>
     <Text style={{ fontWeight:600, color:"white" }}> Fermer</Text> 
    </Button>
  </Modal>
</Portal>


<View style={styles.infoRow}>
    <Text style={styles.infoLabel}>État:</Text>
    <Text style={styles.infoText}>{fakeItem.etat}</Text>
  </View>
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>Caution:</Text>
    <Text style={styles.infoText}>{fakeItem.caution}€</Text>
  </View>
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>Mode de remise:</Text>
    <Text style={styles.infoText}>En personne</Text>
  </View>
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>Vendeur:</Text>
    <TouchableOpacity onPress={() => console.log("Nelson clicked")}><Text style={styles.linkText}>Nelson {fakeItem.ownerId}</Text></TouchableOpacity>
  </View>
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>Localisation:</Text>
    <TouchableOpacity onPress={() => console.log("Nelson lives in Paris")}>
    <Text style={styles.infoText}>  <Ionicons name={'location'} color={'#FFCE52'}size={20}/> Paris</Text>
    </TouchableOpacity>
  </View>
</View>		

</View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  </PaperProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
    modalTitle:{
        color: '#155263',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText:{
        fontSize: 14,
        fontWeight: '600',
    },
    modalContainer:{
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
  
    },
    greyRectangle: {
        backgroundColor: '#E2E2E2',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        marginTop: 0,
        height: "20%",
        alignContent: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1, 
      },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        alignSelf: 'center',
        color: '#155263',
      },

	imageContainer: {
		width: '85%',
		marginTop: 30,
        alignSelf: 'center',
	},
	image: {
		width: '100%',
		resizeMode: 'contain',
		
	},
	textContainer: {
		alignItems: 'center',
		marginBottom: 10,
	},
	title: {
		fontSize: 30,
		textAlign: 'center',
		fontWeight: 'bold',
		marginTop: 10,
		marginBottom: 10,
		color: '#155263',
	},
    description: {
        textAlign: 'justify',
        
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
	emoji: {
		fontSize: 60,
		marginTop: 25,
		marginBottom: 10,
	},
    linkText: {
        color: 'blue', 
        textDecorationLine: 'underline', 
        fontSize: 16, 
    },
	infoContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 5,
        marginTop: 10,
      },
      infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
      },
      infoLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'right',
      },
      infoText: {
        fontSize: 16,
        color: '#555',
        marginLeft: 10,
      },
      infoClickableText: {
        color: 'blue',
        textDecorationLine: 'underline',
      },
      text: {
		fontSize: 16,
		marginTop: 10,
		textAlign: 'center',
		color: '#155263',
		fontWeight: '400',
	},
	buttonsContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 60,
	},
    buttonsContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 60,
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 22,
	},
	buttonOutlined: {
		backgroundColor: '#FFCE52',
		fontColor: 'black',
		borderWidth: 1,
		width: '80%',
		alignSelf: 'center',
		margin: 10,
	},
	buttonGreenOutlined: {
		margin: 10,
		backgroundColor: '#155263',
		fontColor: 'black',
		borderWidth: 1,
		width: '100%',
		alignSelf: 'center',
		margin: 12,
	},
	buttonNoColorOutlined: {
		margin: 10,
		backgroundColor: 'transparent',
		fontColor: 'black',
		borderWidth: 1,
		width: '100%',
		alignSelf: 'center',
		margin: 12,
	},
    periodes:{
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginTop: 5,
    },
	textInput: {
		paddingVertical: 1,
		paddingHorizontal: 1,
		fontSize: 12,
		height: 35,
		backgroundColor: '#E8E8E8',
	},
    scrollContainer: {
            flex: 1,
            marginTop: 10,
    },
});
