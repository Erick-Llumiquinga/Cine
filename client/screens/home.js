import React, { Component } from 'react';
import { StyleSheet, ImageBackground, Text, Image, View,TouchableOpacity, ScrollView } from 'react-native';
import { Container, Content, Card, CardItem, Body, Item, Label, Input, Button, AsyncStorage } from 'native-base';


const API_URL = "http://192.168.100.5:8001/server/bingo";

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Container>
                <ImageBackground source={require('../assets/img/background.jpg')} style={styles.container}>
                <ScrollView>
                    <Content contentContainerStyle={styles.content}>
                        <Text style={styles.registrar1}>Peliculas en Taquilla</Text>
                        <View style={styles.headerLeft, styles.titulo}>
                    <TouchableOpacity onPress={()=>this.props.navigation.push('Detalle')}>
                        <Image source={require('../assets/img/joker.jpg')} style={styles.logo} />
                    </TouchableOpacity>
                    <Text>Joker</Text>
                    <TouchableOpacity>
                        <Image source={require('../assets/img/badBoys.jpg')} style={styles.logo1} />
                    </TouchableOpacity>
                    <Text>ToyStory4</Text>
                    <TouchableOpacity>
                        <Image source={require('../assets/img/jojo.jpg')} style={styles.logo2} />
                    </TouchableOpacity>
                    <Text>Dumbo</Text>
                    <TouchableOpacity>
                        <Image source={require('../assets/img/noche.jpg')} style={styles.logo3} />
                    </TouchableOpacity>
                    <Text>Glass</Text>
                    <TouchableOpacity>
                        <Image source={require('../assets/img/harleyQueen.jpg')} style={styles.logo4} />
                    </TouchableOpacity>
                    <Text>Detective Pikachu</Text>

                </View>
                    </Content>
                    </ScrollView>
                </ImageBackground>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '105%',
        height: '100%',
        position: 'relative',
        right: '4%',  
    },
    registrar1: {
        flex: 1,
        width: '100%',
        marginTop: '45%',
        fontSize: 30,
        marginLeft: '5%',
        color: '#EFFBF8',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        width: '75%',
        height: '100%',
        marginLeft: '13%',
        paddingBottom: '25%',
    },
    txt: {
        color: 'black',
        fontSize: 15,
    },
    textoBlanco: {
        color: '#ffffff'
    },
    img: {
        height: '20%',
        width: '30%'
    },
    titulo: {
        flex: 3,
        alignItems: 'center',
        fontWeight: 'bold'
    },
    header: {
        flex: 1,
        flexDirection: 'row'
    },
    headerLeft: {
        flex: 1,

    },
    headerRight: {
        flex: 1,

    },
    body: {
        flex: 1,
        alignItems: 'center'
    },
    logo: {
        width: 200,
        height: 200,
        borderRadius: 40,
        resizeMode: 'contain'
    },
    logo1: {
        width: 200,
        height: 200,
        borderRadius: 40,
        resizeMode: 'contain'
    },
    logo2: {
        width: 200,
        height: 200,
        borderRadius: 40,
        resizeMode: 'contain'
    },
    logo3: {
        width: 200,
        height: 200,
        borderRadius: 40,
        resizeMode: 'contain'
    },
    logo4: {
        width: 200,
        height: 200,
        borderRadius: 40,
        resizeMode: 'contain'
    },
    logo5: {
        width: 200,
        height: 200,
        borderRadius: 40,
        resizeMode: 'contain'
    }
});


