import React from "react";

const AddTrainingAdminPresentation = () => {
    return (
        <div className="col-xs-6 col-md-6" id="add_admin_training">

            <form>

                <input name="name" type="text" className="form-control" placeholder="Name" required autoFocus/>

                <input name="health" type="number" min="0" className="form-control" placeholder="Health" required/>

                <input name="agility" type="number" min="0" className="form-control" placeholder="Agility" required/>

                <input name="attack" type="number" min="0" className="form-control" placeholder="Attack" required/>

                <input name="defence" type="number" min="0" className="form-control" placeholder="Defence" required/>

                <input name="duration" type="number" min="0" className="form-control" placeholder="Duration" required/>

                <input type="submit" value="Add" className="btn btn-primary btn-block"/>
            </form>
        </div>
    )
}

export default AddTrainingAdminPresentation;
