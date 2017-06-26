import React from "react";
import {FilterPanel} from "./Containers"

let pokemonsHTML = [];

/*function makePokemonArray(numberOfPokemons, pokemons) {
 for(let i = 0; i < numberOfPokemons; ++i){
 pokemonsHTML.push(<li>pokemons[i].name</li>)
 }

 return pokemonsHTMLk
 }*/


const AdminPokemonPresentation = ( {pokemons, search_for, filtered_pokemons, deleteAdminPokemon = f => f} ) =>

    <div className="container" style={{padding: 10}}>

        <FilterPanel/>

        {filtered_pokemons.map(function(row, i){
            return (
                <div className="row" style={{margin_bottom: 20}}>
                    <div className="col-xs-5 col-md-4">
                        <h5>{row.name}</h5>
                    </div>
                    <div className="col-xs-5 col-md-4">
                        <img src={"/admin/" + row.photo} height="100" width="100" />
                    </div>

                    <div className="col-xs-2 col-md-2">
                        <button className="btn btn-primary btn-block" id={row._id} onClick={deleteAdminPokemon}>DELETE</button>
                    </div>
                </div>
            )
        })}
    </div>


export default AdminPokemonPresentation;