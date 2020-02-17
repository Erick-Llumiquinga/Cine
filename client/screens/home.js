import React, { Component } from 'react';
import { StyleSheet, ImageBackground, Text, Image, View,TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import { Container, Content, Card, CardItem, Body, Item, Label, Input, Button } from 'native-base';


const API_URL = "http://192.168.100.3:3000/server/getMovie";

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
          peliculas: []
        };
    }

    componentDidMount(){
      this.getData();
    }

    getData = () => {
      const header = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }

      return fetch(API_URL, header)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({peliculas: responseJson});
      })
      .catch((err) => {
        alert(err)
      })

    }

    localStoragge = async (id) => {
        try{
            await AsyncStorage.multiSet([['id', JSON.parse(id)._id], ['datos', id]]);
        }
        catch(error){
            console.log(error);
        }
        this.props.navigation.push('Detalle');
    }

    render() {
        return (
            <Container>
              <ImageBackground source={require('../assets/img/background.jpg')} style={styles.container}>
              <ScrollView>
                <Content contentContainerStyle={styles.content}>
                  <Text style={styles.registrar1}>Peliculas en Taquilla</Text>
                  <View style={styles.headerLeft, styles.titulo}>
                  {
                    this.state.peliculas.map(item =>
                      <TouchableOpacity onPress={() => this.localStoragge(JSON.stringify(item))}>
                        <Text style={{color: 'white'}}>{item.titulo}</Text>
                        <Image source={require('../assets/img/joker.jpg')} style={styles.logo} />
                      </TouchableOpacity>
                    )
                  }
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
