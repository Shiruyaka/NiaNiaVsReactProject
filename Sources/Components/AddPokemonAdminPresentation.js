import React from "react";


function onChange(event) {
    let reader = new FileReader();
    alert("Changing some stuff");
    reader.readAsText(event.target.files[0]);
}

const AddPokemonAdminPresentation = ({pokemon_added, newPokemonName, pictureToSend, onNameChange = f => f, onSendNewPokemon = f => f, onPictureLoad = f => f}) => {
    return (
        <div className="container">
            { (pokemon_added) ? <p className="bg-success"> New pokemon have been uploaded</p> : null }
            <div onSubmit={(e) => onSendNewPokemon(pictureToSend, e)}>

            <input name="name" type="text" className="form-control" onChange={onNameChange} placeholder="Name" required autoFocus/>
            <input type="file" name='file' id="file"
                   onChange={onPictureLoad}
                   required accept="image/*"/>
            <input type="submit" value="Add" onClick={() => onSendNewPokemon(pictureToSend, newPokemonName)} className="btn btn-primary btn-block"/>
            </div>
        </div>
    )
};

export default AddPokemonAdminPresentation;
