import React from "react";

const AddPokemonAdminPresentation = ({onSendNewPokemon}) => {
    return (
        <div className="container">

            <form onSubmit={onSendNewPokemon}>

            <input name="name" type="text" className="form-control" placeholder="Name" required autoFocus/>
            <input type="file" name='file' id="file" required accept="image/*"/>
            <input type="submit" value="Add" className="btn btn-primary btn-block"/>
            </form>
        </div>
    )
}

export default AddPokemonAdminPresentation;
