import React, {Component} from 'react';

const API_URL = "http://192.168.100.5:8001/server/login";

export default class Login extends Component{

  constructor(props){
    super(props)
    this.state = {
      nombre: '',
      clave: ''
    }

    this.handleNombre = this.handleNombre.bind(this);
  }

  handleNombre = (event) => {
    this.setState({nombre: event.target.value});
  }

  handleSubmit = (event) => {
    alert(`El nombre a enviar es: ${this.state.nombre}`)
  }

  login = () => {

    let datos = {
      usuario: this.state.usuario,
      clave: this.state.clave
    }

    const header = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos)
    }

    return fetch(API_URL,header)
      .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.mensaje != 'inc'){
            this.localStoragge();
            return this.props.navigation.push('Inicio')
          }
          return alert('Datos incorrectos')
        })
        .catch((error) => {
          console.error(error);
        })
  }

  render(){
    return(
      <div className="backgroundLogin" >
        <form onSubmit={this.handleSubmit}>
          <label>
            Nombre:
            <input type="text" vale={this.state.nombre} onChange={this.handleNombre}/>
          </label>
          <button className="bg-orange-600" type="submit">Enviar</button>
        </form>
      </div>
    )
  }
}