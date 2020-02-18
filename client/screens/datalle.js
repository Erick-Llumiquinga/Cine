import React, { Component } from 'react';
import { Image, Modal, Text, TouchableHighlight, View, Alert, TextInput, FlatList, StyleSheet, ImageBackground, AsyncStorage,TouchableOpacity } from 'react-native';
import {  Container, Content, Header, Title, Button, Left, Right, Body, Icon, Spinner, Fab, Form,Card,CardItem,Thumbnail   } from 'native-base';
export default class Home extends Component{
    constructor(props) {
      super(props);
      this.state ={
        id: '',
        dataTemporal: {},
        titulo: '',
        img: '',
        sinopsis: '',
        sala: '',
        descripcion: '',
        horario: '',
        precio: '',
        numBoletos: '',
        datosPersonales: []
      }
    }

    componentDidMount(){
      this.localStoragge();
      this.getPeliculas();
    }

    localStoragge = async () =>{
        try{
          await  AsyncStorage.multiGet(['id', 'datos']).then((value) => {
            this.setState({id: value[0][1], dataTemporal: value[1][1]});
        })
        }
        catch(error){
            console.log(error)
        }

    }

    deleteStoragge = async () =>{
        try{
             await AsyncStorage.clear();
        }
        catch(error){
            console.log(error)
        }
        this.props.navigation.push('Home');
    }

    getPeliculas = () => {
      const API_URL =`http://192.168.100.3:3000/server/getSala?id=${this.state.id}`;
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
        this.setState({
          sala: JSON.stringify(responseJson).nombre,
          descripcion: JSON.stringify(responseJson).descripcion,
          horario: JSON.stringify(responseJson).horario,
          titulo: JSON.stringify(responseJson).horario,

        })

      })
      .catch((err) => {
        alert(err)
      })
    }

    render() {
        return (
          <Container>
           <Content>
             <Card style={{flex: 0}}>
               <CardItem>
                 <Left>
                   <Body>
                     <Text>{this.state.titulo}</Text>
                   </Body>
                 </Left>
               </CardItem>
               <CardItem>
                 <Body>
                   <Image source={{uri: 'Image URL'}} style={{height: 200, width: 200, flex: 1}}/>
                   <Text>{this.state.sinopsis}</Text>
                 </Body>
               </CardItem>
               <CardItem>
                 <Left>
                   <Button transparent textStyle={{color: '#87838B'}} onPress={() => this.props.navigation.push('Home')}>
                     <Icon name="logo-github" />
                     <Text>Pedir</Text>
                   </Button>
                 </Left>
               </CardItem>
             </Card>
           </Content>
          </Container>
        )
    }
}

const styles = StyleSheet.create({
    containerTabla1: {
        position: 'absolute',
        left: '5%',
        top: '10%',
        height: '100%',
        width: '20%'
    },
    containerTabla2: {
        position: 'absolute',
        left: '21%',
        top: '10%',
        height: '100%',
        width: '20%'
    },
    containerTabla3: {
        position: 'absolute',
        left: '37%',
        top: '10%',
        height: '100%',
        width: '20%'
    },
    containerTabla4: {
        position: 'absolute',
        left: '53%',
        top: '10%',
        height: '100%',
        width: '20%'
    },
    containerTabla5: {
        position: 'absolute',
        left: '69%',
        top: '10%',
        height: '100%',
        width: '20%'
    },
    containerTabla6: {
        position: 'absolute',
        left: '85%',
        top: '10%',
        height: '100%',
        width: '20%'
    },
      container_principal: {
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center"
      },
      bola_principal: {
        backgroundColor: "white",
        width: 120,
        height: 120,

        borderRadius: 100,
        color: "black",
        textAlign: "center",
        fontSize: 80
      },
      bola_principal_texto: {
        backgroundColor: "white",
        width: 120,
        height: 120,
        borderRadius: 100,
        color: "black",
        textAlign: "center",
        fontSize: 35,
        paddingTop: 35
      },
      container_secundarias: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginTop: 25,
      },
      bola_secundaria: {
          backgroundColor: "#013440",
          width: 70,
          height: 70,
          borderRadius: 100,
          marginBottom: 20,
          marginLeft: 5,
          color: "white",
          textAlign: "center",
          fontSize: 35,
      },
      cartilla: {
        left: '7%',
        width: '90%',
        borderRadius: 10
      },
      head: {
          height: 40,
          backgroundColor: '#BF9D7E',
        },
      text: {
          margin: 6 ,
          color: 'white',
          textAlign: "center",
        },
    imagen:{
      width: '104%',
      height: '100%',
      position: 'relative',
      right: '4%',
    },
    header:{
      backgroundColor: '#327373',
    },
    bola_tabla:{
        position: 'relative',
        top: '10%',
        left: '20%',
        backgroundColor: "black",
        width: 30,
        height: 30,
        borderWidth: 2,
        borderRadius: 100,
        marginBottom: 3,
        color: "white",
        textAlign: "center",
        fontSize: 17
    },
    bola_tabla_W:{
        position: 'relative',
        top: '10%',
        left: '20%',
        backgroundColor: "white",
        width: 30,
        height: 30,
        borderRadius: 100,
        marginBottom: 3,
        color: "black",
        textAlign: "center",
        fontSize: 17
    },
      textoBlanco: {
        color: '#ffffff'
    },
    input1: {
        color: '#EFFBF8',
        fontSize: 25,
    },
    modal_position: {
        position: 'absolute',
        bottom: 15,
        left: 25,
    }
})
