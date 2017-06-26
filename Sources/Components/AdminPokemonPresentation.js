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
    /*<table>
     <tr>
     <th>Name</th>
     <th>Picture</th>
     <th></th>
     </tr>

     {pokemons.map(function (row, i) {
     return (
     <tr>
     <td>{row.name}</td>
     <td><img src={row.photo} /></td>
     <td><input type="button" value="DELETE"/></td>
     </tr>
     )
     })}

     </table>

     */
    <div className="container" style={{padding: 10}}>

        <h3>Pokemon List</h3>
        <br/>

        <FilterPanel/>

        <div className="row" style={{margin_bottom: 20}}>
            <div className="col-xs-5 col-md-4">
                <h4>Name</h4>
            </div>
            <div className="col-xs-5 col-md-4">
                <h4>Photo</h4>
            </div>
        </div>

        {filtered_pokemons.map(function(row, i){
            return (
                <div className="row" style={{margin_bottom: 20}}>
                    <div className="col-xs-5 col-md-4">
                        <h5>{row.name}</h5>
                    </div>
                    <div className="col-xs-5 col-md-4">
                        <img src={row.photo} />
                    </div>

                    <div className="col-xs-2 col-md-2">
                        <button className="btn btn-danger" id={row._id} onClick={deleteAdminPokemon}>DELETE</button>
                    </div>
                </div>
            )
        })}
    </div>


export default AdminPokemonPresentation;