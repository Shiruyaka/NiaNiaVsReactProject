import React from "react";
import { SignUpDialog} from "./Containers"

const MenuPresentation = ({home_class, pokemon_class, users_class, training_class,
    onHomeClick = f => f, onPokemonsClick = f => f, onUsersClick = f => f, onTrainingsClick = f =>f,
    onPokemonAdminClick = f => f, onAddPokemonClick = f => f
}) => {
    return (

        <div id="menu_panel">
            {(home_class === true) ?
                <button className="accordion active" onClick={onHomeClick}>Home</button>
                :
                <button className="accordion" onClick={onHomeClick}>Home</button>}

            {(home_class === true) ?
                <div className="panel collapsed">
                    <p>Home page</p>
                </div>

                : <div className="panel">
                    <p>Home page</p>
                </div>}


            {(pokemon_class === true) ?
                <button className="accordion active" onClick={onPokemonsClick}>Pokemons</button>
                :
                <button className="accordion" onClick={onPokemonsClick}>Pokemons</button>}


            {(pokemon_class === true) ?
                <div className="panel collapsed">
                    <button className="accordion" onClick={onPokemonAdminClick}>Pokemon List</button>
                    <button className="accordion" onClick={onAddPokemonClick}>Add pokemon</button>
                </div>
                :
                <div className="panel">
                    <p>Pokemons list</p>
                </div>}

            {(training_class === true) ?
                <button className="accordion active" onClick={onTrainingsClick}>Trainigns</button>
                :
                <button className="accordion"
                        onClick={onTrainingsClick}>Trainigns</button>
            }

            {(training_class === true) ?
                <div className="panel collapsed">
                    <p>Trainings list</p>
                </div>
                :
                <div className="panel">
                    <p>Trainings list</p>
                </div>
            }


            {(users_class === true) ?
                <button className="accordion active" onClick={onUsersClick}>Users</button>
                :
                <button className="accordion" onClick={onUsersClick}>Users</button>
            }

            {(users_class === true) ?
                <div className="panel collapsed">
                    <p>Users list</p>
                </div>
                :
                <div className="panel">
                    <p>Users list</p>
                </div>
            }

        </div>


    )
};

export default MenuPresentation;