import React from "react";
import { StyleSheet, View, ScrollView, Image, TouchableHighlight } from "react-native";
import { Button, Card, Text, Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import moment from 'moment';
import 'moment/locale/es';

const defaultJSONData = {
	source: {
		id: 'crear-rn',
		name: 'Agencia Provincial CREAR'
	},
	author: null,
	title:
		"El CREAR continúa impulsando el crecimiento de los Parques Industriales en la Provincia.",
	description:
		'El CREAR continúa apoyando al sector empresarial y a las Pymes rionegrinas, con el avance y reorganización de Parques Industriales en distintos puntos de la Provincia.',
	url:
		'https://crear.rionegro.gov.ar/?contID=67842',
	urlToImage:
		'https://crear.rionegro.gov.ar/download/images/medio/00056294.jpeg',
	publishedAt: '2021-04-28T07:52:57Z',
	content:
		'El CREAR continúa apoyando al sector empresarial y a las Pymes rionegrinas, con el avance y reorganización de Parques Industriales en distintos puntos de la Provincia… [+1410 chars]'
};

export default function Novedades() {

    const navigation = useNavigation();
    moment().locale('es');
    const time = moment(defaultJSONData.publishedAt || moment.now()).fromNow();

    return (
        <TouchableHighlight>
				<Card
					featuredTitle={defaultJSONData.title}
					featuredTitleStyle={{
						marginHorizontal: 5,
						textShadowColor: '#00000f',
						textShadowOffset: { width: 3, height: 3 },
						textShadowRadius: 3
					}}
					image={{
						uri:
							'https://crear.rionegro.gov.ar/download/images/medio/00056294.jpeg'
					}}
				>
					<Text style={{ marginBottom: 10 }}>
						{defaultJSONData.description || 'Leer más...'}
					</Text>
					<Divider style={{ backgroundColor: '#dfe6e9' }} />
					<View
						style={{ flexDirection: 'row', justifyContent: 'space-between' }}
					>
						<Text
							style={{
								margin: 5,
								fontStyle: 'italic',
								color: '#b2bec3',
								fontSize: 10
							}}
						>
							{defaultJSONData.source.name.toUpperCase()}
						</Text>
						<Text
							style={{
								margin: 5,
								fontStyle: 'italic',
								color: '#b2bec3',
								fontSize: 10
							}}
						>
							{time}
						</Text>
					</View>
				</Card>
			</TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    viewBody : {
        marginLeft : 30,
        marginRight : 30,
    },
    image : {
        height: 300,
        width: "100%",
        marginBottom: 40,
    },
    title : {
        fontWeight: "bold",
        fontSize: 19,
        marginBottom: 10,
        textAlign: "center",
    },
    description : {
        textAlign: "center",
        marginBottom: 20,
    },
    btnPrimary : {
        backgroundColor: "#00a680",
    },
    btnPrimaryContainer : {
        width: "70%",
    },
    btnPrimaryView : {
        flex: 1,
        alignItems: "center",
    }
});