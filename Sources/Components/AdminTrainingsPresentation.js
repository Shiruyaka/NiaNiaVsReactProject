import React from "react";
import {FilterPanel} from "./Containers"

let trainingsHTML = [];



const AdminTrainingsPresentation = ( {filtered_trainings, deleteAdminTraining = f => f, editAdminTraining=f =>f} ) =>

    <div className="container" style={{padding: 10}}>

        <h3>Training List</h3>
        <br/>

        <FilterPanel/>

        {(filtered_trainings.length === 0) ?
            <p>There is no trainings!</p> : null
        }


        {filtered_trainings.map(function(row, i){
            return (
                <div className="row" style={{margin_bottom: 20}}>

                    <div className="col-xs-6 col-md-2">
                        <h4>{row.name}</h4>
                    </div>


                    <div className="col-xs-6 col-md-1">
                        <h5>health +{row.health} </h5>
                    </div>

                    <div className="col-xs-6 col-md-1">
                        <h5>agility +{row.agility} </h5>
                    </div>

                    <div className="col-xs-6 col-md-1">
                        <h5>attack +{row.attack} </h5>
                    </div>


                    <div className="col-xs-6 col-md-2">
                        <h5>defence +{row.defence}</h5>
                    </div>

                    <div className="col-xs-6 col-md-2">
                        <h5>duration: {row.duration} min</h5>
                    </div>


                    <div className="col-xs-2 col-md-2">
                        <button className="btn btn-success" value={row._id} onClick={editAdminTraining}>Edit</button>
                        <button className="btn btn-danger" value={row._id} onClick={deleteAdminTraining}>Delete</button>
                    </div>

                </div>
            )
        })}
    </div>


export default AdminTrainingsPresentation;