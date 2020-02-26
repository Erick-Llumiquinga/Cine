import React, { Component } from 'react'

export default class Navigation extends Component {
    render() {
        return (
            <header>
                <nav class="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-yellow-600 shadow sm:items-baseline w-full">
                    <div class="mb-2 sm:mb-0">
                        <a href="/informe" class="text-2xl no-underline text-white hover:text-blue-dark">YAVIRAC´S FILMS</a>
                    </div>
                    <div>
                        <a href="/nuevaPelicula" class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 py-4 px-8 hover:text-white">PELICULAS</a>
                        <a href="/create/salas" class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 py-4 px-8 hover:text-white">SALAS</a>
                        <a href="/resumenVentas" class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 py-4 px-8 hover:text-white">COMPRAS</a>
                        <a href="/" class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 py-4 px-8 hover:text-white">SALIR</a>
                    </div>
                </nav>
            </header>
        )
    }
}
