import React from "react";

const AddTrainingAdminPresentation = () => {
    return (
        <div>

            <h3>Add Training</h3>
            <br/>

            <div className="col-xs-6 col-md-6">

                <form id="add_admin_training">

                    <input name="name" type="text" className="form-control" placeholder="Name" required autoFocus
                           style={{margin_bottom: 10}}/>

                    <input name="health" type="number" min="0" className="form-control" placeholder="Health" required
                           style={{margin_bottom: 10}}/>

                    <input name="agility" type="number" min="0" className="form-control" placeholder="Agility" required
                           style={{margin_bottom: 10}}/>

                    <input name="attack" type="number" min="0" className="form-control" placeholder="Attack" required
                           style={{margin_bottom: 10}}/>

                    <input name="defence" type="number" min="0" className="form-control" placeholder="Defence" required
                           style={{margin_bottom: 10}}/>

                    <input name="duration" type="number" min="0" className="form-control" placeholder="Duration"
                           required style={{margin_bottom: 10}}/>

                    <input type="submit" value="Add" className="btn btn-primary btn-block"/>
                </form>
            </div>
        </div>
    )
}

export default AddTrainingAdminPresentation;
