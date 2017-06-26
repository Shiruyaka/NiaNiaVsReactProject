import React from "react";

const AddPokemonAdminPresentation = ({onSendNewPokemon}) => {
    return (
        <div>
            <h3>Add Specie</h3>
            <br/>
            <div className="container col-xs-6 col-md-6">

                <form onSubmit={onSendNewPokemon}>

                    <input name="name" type="text" className="form-control" placeholder="Name" required autoFocus/>
                    <input type="file" name='file' id="file" required accept="image/*"/>
                    <input type="submit" value="Add" className="btn btn-primary btn-block"
                           id="add_pokemon_admin_button"/>
                </form>
            </div>
        </div>
    )
}

export default AddPokemonAdminPresentation;
