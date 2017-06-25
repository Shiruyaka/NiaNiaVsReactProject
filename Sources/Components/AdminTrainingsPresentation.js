import React from "react";
import {FilterPanel} from "./Containers"

let trainingsHTML = [];



const AdminTrainingsPresentation = ( {filtered_trainings} ) =>

    <div className="container" style={{padding: 10}}>

        <FilterPanel/>

        <div className="row" style={{margin_bottom: 20}}>

            <div className="col-xs-6 col-md-1">
                <h4>Name</h4>
            </div>


            <div className="col-xs-6 col-md-1">
                <h4>Health </h4>
            </div>

            <div className="col-xs-6 col-md-1">
                <h4>Agility </h4>
            </div>

            <div className="col-xs-6 col-md-1">
                <h4>Attack </h4>
            </div>

            <div className="col-xs-6 col-md-2">
                <h4>Defence</h4>
            </div>

            <div className="col-xs-6 col-md-1">
                <h4>Duration</h4>
            </div>
        </div>

        {filtered_trainings.map(function(row, i){
            return (
                <div className="row" style={{margin_bottom: 20}}>

                    <div className="col-xs-6 col-md-1">
                        <h4>{row.name}</h4>
                    </div>


                    <div className="col-xs-6 col-md-1">
                        <h5>{row.health} </h5>
                    </div>

                    <div className="col-xs-6 col-md-1">
                        <h5>{row.agility} </h5>
                    </div>

                    <div className="col-xs-6 col-md-1">
                        <h5>{row.attack} </h5>
                    </div>


                    <div className="col-xs-6 col-md-2">
                        <h5>{row.defence}</h5>
                    </div>

                    <div className="col-xs-6 col-md-1">
                        <h5>{row.duration}</h5>
                    </div>


                    <div className="col-xs-2 col-md-2">
                        <button className="btn btn-success" value={row._id}>Edit</button>
                        <button className="btn btn-danger" value={row._id}>Delete</button>
                    </div>

                </div>
            )
        })}
    </div>


export default AdminTrainingsPresentation;