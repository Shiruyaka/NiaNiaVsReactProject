import React from "react";

const AddTrainingAdminPresentation = ({training_added, saveNewTraining = f => f}) => {
    return (
        <div>
            <h3>Add Training</h3>
            <br/>

            <div className="col-xs-6 col-md-6" id="add_admin_training">

                { (training_added) ? <p className="bg-success"> New training have been added</p> : null }


                    <form onSubmit={saveNewTraining}>

                        <input name="name" type="text" className="form-control" placeholder="Name" required autoFocus />
                        <input name="health" type="number" min="0" className="form-control" placeholder="Health" required />
                        <input name="agility" type="number" min="0" className="form-control" placeholder="Agility" required/>
                        <input name="attack" type="number" min="0" className="form-control" placeholder="Attack" required />
                        <input name="defence" type="number" min="0" className="form-control" placeholder="Defence" required />
                        <input name="duration" type="number" min="0" className="form-control" placeholder="Duration" required/>
                        <input type="submit" value="Add" className="btn btn-primary btn-block"/>
                    </form>

            </div>
        </div>
    )
}

export default AddTrainingAdminPresentation;
