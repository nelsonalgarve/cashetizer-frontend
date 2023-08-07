import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Button, Provider as PaperProvider } from 'react-native-paper';

export const SingleProductScreen = () => {
	const navigation = useNavigation();
	const WelcomeScreen = () => {
		navigation.navigate('Welcome');
	};
        const fakeItem = {
          ownerId: '12345',
          name: 'Un produit',
          description: 'Le meilleur produit au monde',
          etat: 'Excellent',
          photos: ['../../../../assets/fakeImage.jpg'],
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

  
        const selectedPeriod = fakeItem.periodes[selectedPeriodIndex];
  const totalCost = calculateTotalCost(
    fakeItem.prices.day, // Prix par jour en fonction de la période
    selectedPeriod.start,
    selectedPeriod.end
  );

	return (
		<PaperProvider>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
				<View style={styles.container}>
                <View style={styles.greyRectangle}>
                <Text style={styles.name}>{fakeItem.name} à {totalCost}€</Text>
                <Text style={styles.periodes}>Périodes de location:</Text>
      {fakeItem.periodes.map((periode, index) => (
        <Text key={index} style={styles.periode}>
          {periode.start} à {periode.end}
        </Text>
      ))}
      <Button style={styles.buttonOutlined} mode="outlined" onPress={WelcomeScreen}>
							<Text style={styles.buttonText}>Je valide la location</Text>
						</Button>
				</View>
					<View style={styles.textContainer}>
                    <Image source={{ uri: fakeItem.photos[0] }} style={styles.image} />
					<View>

                    </View>
						<Text style={styles.title}> {'\n'}{'\n'}{'\n'}{'\n'} Félicitations ! </Text>
						<Text style={styles.text}>
							Votre annonce est complète.{'\n'}
							{'\n'}
							Elle sera publiée d'ici peu.{'\n'}
							{'\n'}
							Vous recevrez une notification
							{'\n'}et un email une fois votre compte confirmé.{'\n'}
							{'\n'}
							Pensez à vérifier votre boite email
							{'\n'}et à activer les notifications.
						</Text>
					</View>
					<View style={styles.buttonsContainer}>
						<Button style={styles.buttonOutlined} mode="outlined">
							<Text style={styles.buttonText}>J'active les notifications</Text>
						</Button>

						<View style={styles.textContainer}>
							<Text style={styles.text}>
								En attendant vous pouvez{'\n'}
								en profiter pour louer à petits prix {'\n'}
								ou à générer un revenu {'\n'}
								en mettant d’autres produits en location!!
							</Text>
						</View>

						<Button style={styles.buttonOutlined} mode="outlined" onPress={WelcomeScreen}>
							<Text style={styles.buttonText}>J'y vais de suite!</Text>
						</Button>
					</View>
				</View>
				<View style={[styles.imageContainer, { zIndex: -1 }]}>
					<Image source={require('../../../../assets/LogoShortUp.png')} style={styles.image} />
				</View>
				<View style={styles.greenRectangle}>
					<Text style={styles.rectangleText}>
						Economies futées,{'\n'}
						Des revenus assurés !
					</Text>
				</View>
			</KeyboardAvoidingView>
		</PaperProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
    greyRectangle: {
		backgroundColor: '#ECECEC',
		position: 'absolute',
		top: 0, // Changed from 'bottom: 0'
		left: 0,
		right: 0,
		marginTop: 0,
        height : "30%",
		alignContent: 'flex-start',
	},
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        alignSelf: 'center',
      },

	imageContainer: {
		width: '100%',
		marginBottom: -18,
	},
	image: {
		width: '100%',
		resizeMode: 'contain',
		height: 215,
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
	buttonText: {
		color: 'white',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 16,
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
	textInput: {
		paddingVertical: 1,
		paddingHorizontal: 1,
		fontSize: 12,
		height: 35,
		backgroundColor: '#E8E8E8',
	},
});
