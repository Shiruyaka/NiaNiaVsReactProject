import React from "react";

const EditTrainingAdminPresentation = ({saveEditTraining = f => f, training, changeTrainingName = f => f, changeTrainingHealth = f => f, changeTrainingAgility = f => f,
    changeTrainingAttack = f => f, changeTrainingDefence = f => f, changeTrainingDuration = f => f} ) => {
    return (
        <div>
            <h3>Edit Training</h3>
            <br/>

            <div className="col-xs-6 col-md-6" id="add_admin_training">

                <form onSubmit={saveEditTraining}>

                    <label>Name</label>
                    <input name="name" type="text" id={training._id} className="form-control" placeholder="Name" required autoFocus value={training.name} onChange={changeTrainingName} />

                    <label>Health</label>
                    <input name="health" type="number" min="0" className="form-control" placeholder="Health" required value={training.health} onChange={changeTrainingHealth} />

                    <label>Agility</label>
                    <input name="agility" type="number" min="0" className="form-control" placeholder="Agility" required value={training.agility} onChange={changeTrainingAgility}/>

                    <label>Attack</label>
                    <input name="attack" type="number" min="0" className="form-control" placeholder="Attack" required value={training.attack} onChange={changeTrainingAttack}/>

                    <label>Defence</label>
                    <input name="defence" type="number" min="0" className="form-control" placeholder="Defence" required value={training.defence} onChange={changeTrainingDefence}/>

                    <label>Duration</label>
                    <input name="duration" type="number" min="0" className="form-control" placeholder="Duration" required value={training.duration} onChange={changeTrainingDuration}/>

                    <input type="submit" value="Save" className="btn btn-primary btn-block"/>
                </form>
            </div>
        </div>
    )
}

export default EditTrainingAdminPresentation;
