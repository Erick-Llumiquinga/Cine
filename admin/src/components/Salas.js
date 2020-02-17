import React, { Component } from 'react'


export default class Salas extends Component {
    constructor(){
        super();
        this.state = {
            nombre: '',
            descripcion: '',
            horario: '',
            pelicula: '',
            _id: '',
            salas: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.agregarSala = this.agregarSala.bind(this);
    }

        handleChange(e){
            const {name, value} = e.target;
            this.setState({
                [name]: value
            })
        }
    
        componentDidMount(){
            this.getSalas();
        }
    
        agregarSala(e){
            e.preventDefault();
            if(this.state._id){
                fetch(`http://localhost:3001/salas/${this.state._id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        nombre: this.state.nombre,
                        descripcion: this.state.descripcion,
                        horario: this.state.horario,
                        pelicula: this.state.pelicula
                    }),
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    }
                  })
                    .then(res => res.json())
                    .then(data => {
                      this.setState({_id: '', nombre: '', descripcion: '', horario: '', pelicula: ''});
                      this.getSalas();
                    });
            }else {
                fetch("http://localhost:3001/salas", {
                    method: 'POST',
                    body: JSON.stringify(this.state),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    alert('Se guardo correctamente')
                    this.setState({nombre: '', descripcion: '', horario: '', pelicula: ''});
                    this.getSalas();
                })
                .catch(err => console.error(err));
                
                }
            }
           
    
        getSalas(){
            fetch('http://localhost:3001/salas')
            .then(res => res.json())
            .then(data => {
                this.setState({salas: data});
                console.log(this.state.salas);
            });
        }
    
        editarSala(id) {
            fetch(`http://localhost:3001/salas/${id}`)
              .then(res => res.json())
              .then(data => {
                console.log(data);
                this.setState({
                  nombre: data.nombre,
                  descripcion: data.descripcion,
                  horario: data.horario,
                  pelicula: data.pelicula,
                  _id: data._id
                });
            });
        }
    
        eliminarSala(id){
            fetch(`http://localhost:3001/salas/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'aplication/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                alert('Se elimimo correctamente')
                this.getSalas();
            });
    
    }

    
    render() {
        return (
            <div class="flex  px-10 py-2">
                <div class="flext-1 text-gray-700 text-center bg-gray-400 px-20 py-2 m-2">
                <form onSubmit={this.agregarSala}>
                            <div class="">
                                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                    NOMBRE
                            </label>
                                <input class="appearance-none block  bg-grey-lighter text-grey-darker border border-red rounded py-3 px-12 mb-3" type="text" name="nombre" onChange={this.handleChange} value={this.state.nombre} placeholder="" />
                            </div>
                            <div class="w-3/3 px-9 py-3 ">
                                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                    DESCRIPCION
                            </label>
                                <input class="appearance-none block  bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-12 mb-3" type="text" name="descripcion" onChange={this.handleChange} value={this.state.descripcion} placeholder="" />
                            </div>
                            <div class="w-3/3 px-9 py-3">
                                <label class="block uppercase tracking-wide text-black-darker text-xs font-bold mb-2" >
                                    HORARIO
                            </label>
                                <input class="appearance-none block bg-grey-lighter text-grey-darker border border-red rounded py-3 px-12 mb-2" type="text" name="horario" onChange={this.handleChange} value={this.state.horario} placeholder="" />
                            </div>
                            <div class="w-3/3 px-9 py-3">
                                <label class="block uppercase tracking-wide text-black-darker text-xs font-bold mb-2" >
                                    PELICULA
                            </label>
                                <input class="appearance-none block bg-grey-lighter text-grey-darker border border-red rounded py-3 px-12 mb-2" type="text" name="pelicula" onChange={this.handleChange} value={this.state.pelicula} placeholder="" />
                            </div>

                        <div class="text-gray-700  px-4 py-2 m-0"></div>

                        <div class="flex justify-between ">
                            <div class="text-gray-700 px-4 py-2 m-0"></div>
                            <div class="text-blue-700  px-4 py-2 m-2">
                                <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" >
                                    ENVIAR
                                </button>
                            </div>
                            <div class="text-gray-300  px-2 py-10 m-0"></div>
                            
                        </div>
                        </form>
                </div>
                <div class="flex-1 text-gray-700 text-center bg-white px-4 py-2 ">
                        <table class=" text-left  border-collapse">
                            <thead class="bg-gray-400 rounded  ">
                                
                                <tr>
                                    <th class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">NOMBRE</th>
                                    <th class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">DESCRIPCION</th>
                                    <th class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">HORARIO</th>
                                    <th class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">PELICULA</th>
                                    <th class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">ACCIONES</th>
                                </tr>
                            </thead>

                                <tbody >
                                    {
                                        this.state.salas.map(sala => {
                                            return (
                                    <tr key={sala._id} >
                                        <td class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm ">{sala.nombre}</td>
                                        <td class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm ">{sala.descripcion}</td>
                                        <td class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm ">{sala.horario}</td>
                                        <td class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm ">{sala.pelicula}</td>
                                        <div class="flex" >
                                            <div class="flex-1 text-green-700  px-2 py-6">
                                                <button class="uppercase bg-grey-lightest font-bold uppercase text-sm" onClick={() => this.editarSala(sala._id)} >
                                                    ACTUALIZAR
                                                </button>
                                            </div>
                                            <div class=" flex-1 text-red-700 px-2 py-6">
                                                <button class="uppercase bg-grey-lightest font-bold uppercase text-sm" onClick={() => this.eliminarSala(sala._id)} >
                                                    ELIMINAR
                                                </button>
                                            </div>
                                        </div>
                                    </tr>
                                    )
                                    })
                                    }
                                </tbody>
                        </table>
                    </div>
                
            </div>
        
        );
    }
}


