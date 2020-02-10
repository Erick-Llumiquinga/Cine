import React, { Component } from 'react';
import { Image, Modal, Text, TouchableHighlight, View, Alert, TextInput, FlatList, StyleSheet, ImageBackground, AsyncStorage,TouchableOpacity } from 'react-native';
import {  Container, Header, Title, Button, Left, Right, Body, Icon, Spinner, Fab, Form   } from 'native-base';
import { Table, Row, Rows,Cell, TableWrapper  } from 'react-native-table-component';


const API_URL = "http://192.168.100.5:8001/server/bingo/cartillas";
const API_URL_Start = "http://192.168.100.5:8001/server/bingo/jugar";

export default class Home extends Component{
    constructor(props) {
        super(props);
        this.localStoragge();
        this.cargarTabla();
        this.state = {
          usuario: '',
          tableHead: ['B','I','N','G','O'],
          tableData: [],
          numerosTemporales: [],
          numerosJugados: [],
          modalVisible: false,
          status: false,
          numeroBola: 'Jugar',
          num: 0
        }
    }
    
    setModalVisible(visible){
        this.setState({modalVisible: visible})
    }

    async componentDidMount() {
        await Font.loadAsync({
            'bin-font': require('../assets/fonts/ShadowsIntoLight-Regular.ttf'),
            'Roboto': require('../node_modules/native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
        }).then(() => {
            this.setState({ fontLoaded: true })
        });

    }

    localStoragge = async () => {
        try{
            this.state.usuario = await AsyncStorage.getItem('User');
        }
        catch(error){
            console.log(error)
        }
    }

    cargarTabla = () => {

        const header = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }

        return fetch(API_URL,header)
            .then((response) => response.json())
            .then((responseJson) =>{
                let arrayCartilla = responseJson
                for(let i = 0; i <= arrayCartilla.length-1; i++){
                if(i < 5){
                    this.culumna1.push(arrayCartilla[i]);
                }
                else if(i < 10){
                    this.culumna2.push(arrayCartilla[i]);
                }
                else if(i < 15){
                    if(i < 12){
                        this.culumna3.unshift(arrayCartilla[i]);
                    }
                    else if(i == 12){
                        this.culumna3.push('Bingo');
                    }
                    else if(i < 15){
                        this.culumna3.push(arrayCartilla[i])
                    }
                }
                else if(i < 20){
                    this.culumna4.push(arrayCartilla[i]);
                }
                else if(i < 25){
                    this.culumna5.push(arrayCartilla[i]);
                }
            }

                this.state.tableData.push(this.culumna1);
                this.state.tableData.push(this.culumna2);
                this.state.tableData.push(this.culumna3);
                this.state.tableData.push(this.culumna4);
                this.state.tableData.push(this.culumna5);

            })
            .catch((error) => {
                alert(JSON.stringify(error))
            })
                
    }
    
    render() {

        let jugar = () => {
            const header = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }

            return fetch(API_URL_Start,header)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.state.numeroBola = responseJson;
                    cargarNumTemp(responseJson);
                })
                .catch((error) => {
                    console.error(error);   
                })
        
        }

        let cargarNumTemp = (num) => {
            if(this.state.numerosTemporales.length === 4){
                this.state.numerosTemporales.shift();
                this.state.numerosTemporales.push(num);
                this.state.numerosJugados.push(num);
                pintarNumeros(this.state.numerosJugados);
            }
            else{
                this.state.numerosTemporales.push(num);
                this.state.numerosJugados.push(num);
                pintarNumeros(this.state.numerosJugados);
            }
        }

        let pintarNumeros = (numArray) => {
            numArray.forEach(num => {
                this.numerosC1.forEach(element =>{
                    if(parseInt(num) == element.key){
                        return element.state = true;
                    }
                });
                this.numerosC2.forEach(element =>{
                    if(parseInt(num) == element.key){
                        return element.state = true;
                    }
                });
                this.numerosC3.forEach(element =>{
                    if(parseInt(num) == element.key){
                        return element.state = true;
                    }
                });
                this.numerosC4.forEach(element =>{
                    if(parseInt(num) == element.key){
                        return element.state = true;
                    }
                });
                this.numerosC5.forEach(element =>{
                    if(parseInt(num) == element.key){
                        return element.state = true;
                    }
                });
                this.numerosC6.forEach(element =>{
                    if(parseInt(num) == element.key){
                        return element.state = true;
                    }
                });
            })
        }

        tablaComprobacion = () =>{

            let numero = 8;

            this.numerosC1.forEach(element => {
                if(element.key === numero){
                    this.estadoFila1 = true;
                }
            })
        }

        let singOut = async () => {
            try{
                await AsyncStorage.clear();
                this.props.navigation.push('Login');
            }
            catch(error){
                console.log(error);
            }
        }

        const element = (data) => (
         
              <Rows   textStyle={styles.text} >
                  
                      <Cell style={{backgroundColor: "black",
                      width: 30,
                      height: 30,
                      borderWidth: 2,
                      borderRadius: 100,
                      marginBottom: 3,}} onPress={()=> alert(`Marcado`)}/>
                  
              </Rows>
          );

        return (    
            <View >
                <ImageBackground source={require('../assets/picks/bingo.png')} style={styles.imagen}>
                    <Header noShadow style={{backgroundColor: '#20575783', paddingTop: 15}}>
                        <Left>
                            <Button transparent style={{width: '100%'}}>
                                <Icon name="person"/>
                                <Text style={styles.textoBlanco}>   {this.state.usuario}</Text>
                            </Button>
                        </Left>
                        <Right>
                            <Button transparent onPress={singOut}>
                                <Text style={styles.textoBlanco}>Cerrar Sesión </Text>
                                <Icon name="exit" />
                            </Button>
                        </Right>
                    </Header>
                    <View>
                        <View style={styles.container_principal}>
                            <Text style={styles.bola_principal_texto} onPress={jugar}>{this.state.numeroBola}</Text>
                        </View>

                        <View style={styles.container_secundarias}>
                            {
                                this.state.numerosTemporales.map(item => <TextInput
                                    style={styles.bola_secundaria}
                                    value={item.toString()}
                                    editable={false}
                                />)
                            }    
                        </View>

                        <View style={styles.cartilla}>
                            <Table borderStyle={{borderWidth: 1, borderColor: '#896A51'}} style={{backgroundColor: '#F2D0A7',}}>
                                <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
                                {
                                    this.state.tableData.map((itemData,index) => (
                                        <TableWrapper style={{flexDirection: 'row'}}>
                                            {
                                                itemData.map((item,indexI) => (
                                                    (<Cell data={item} onPress={()=> alert(`Marcado: ${item}`)} textStyle={styles.text} />) 
                                                ))
                                            }
                                        </TableWrapper>
                                    ))
                                }
                            </Table>
                        </View>
                    </View>
                    <Fab position="bottomLeft" style={{backgroundColor: 'white' }} onPress={() => { this.setModalVisible(!this.state.modalVisible)}}>
                        <Icon name="list" style={{color: '#013440'}}/>
                     </Fab>
                </ImageBackground>

                <Modal animationType="slide" 
                    transparent={false} 
                    visible={this.state.modalVisible}>
                    <View >
                        <View>
                            <ImageBackground source={require('../assets/picks/bingo.png')} style={styles.imagen}>
                                <Header style={{backgroundColor: '#20575783'}}>
                                    <Left>
                                        <Button transparent onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
                                            <Icon name='arrow-back' />
                                            <Text>Regresar</Text>
                                        </Button>
                                    </Left>
                                    <Body>
                            
                                    <Text style={styles.input1}>Números Jugados</Text>
                                     
                                    </Body>
                                </Header>

                                <View style={styles.containerTabla1}> 
                                    <FlatList data={this.numerosC1} renderItem={({item}) => item.state == true  ? (<Text style={styles.bola_tabla_W}>{item.key}</Text> ):(<Text style={styles.bola_tabla}>{item.key}</Text>)} />
                                </View>    
                                <View style={styles.containerTabla2}> 
                                    <FlatList data={this.numerosC2} renderItem={({item}) => item.state == true  ? (<Text style={styles.bola_tabla_W}>{item.key}</Text> ):(<Text style={styles.bola_tabla}>{item.key}</Text>)} />
                                </View> 
                                <View style={styles.containerTabla3}> 
                                    <FlatList data={this.numerosC3} renderItem={({item}) => item.state == true  ? (<Text style={styles.bola_tabla_W}>{item.key}</Text> ):(<Text style={styles.bola_tabla}>{item.key}</Text>)} />
                                </View> 
                                <View style={styles.containerTabla4}>
                                    <FlatList data={this.numerosC4} renderItem={({item}) => item.state == true  ? (<Text style={styles.bola_tabla_W}>{item.key}</Text> ):(<Text style={styles.bola_tabla}>{item.key}</Text>)} />
                                </View> 
                                <View style={styles.containerTabla5}> 
                                    <FlatList data={this.numerosC5} renderItem={({item}) => item.state == true  ? (<Text style={styles.bola_tabla_W}>{item.key}</Text> ):(<Text style={styles.bola_tabla}>{item.key}</Text>)} />
                                </View> 
                                <View style={styles.containerTabla6}> 
                                    <FlatList data={this.numerosC6} renderItem={({item}) => item.state == true  ? (<Text style={styles.bola_tabla_W}>{item.key}</Text> ):(<Text style={styles.bola_tabla}>{item.key}</Text>)} />
                                </View> 
                            </ImageBackground>
                        </View>
                    </View>       
                </Modal>               
            </View>
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
        fontFamily: 'bin-font',
    },
    modal_position: {
        position: 'absolute',
        bottom: 15,
        left: 25,
    }
})