import React from "react";
import {FilterPanel} from "./Containers"

const AdminUsersPresentation = ( {filtered_users} ) =>

    <div className="container" style={{padding: 10}}>

        <FilterPanel/>

        <div className="row" style={{margin_bottom: 20}}>

            <div className="col-xs-6 col-md-2">
                <h4>Username</h4>
            </div>


            <div className="col-xs-6 col-md-2">
                <h4>First name</h4>
            </div>

            <div className="col-xs-6 col-md-2">
                <h4>Last name</h4>
            </div>

        </div>

        {filtered_users.map(function(row, i){
            return (
                <div className="row" style={{margin_bottom: 20}}>

                    <div className="col-xs-6 col-md-2">
                        <h4>{row.username}</h4>
                    </div>


                    <div className="col-xs-6 col-md-2">
                        <h5>{row.first_name} </h5>
                    </div>

                    <div className="col-xs-6 col-md-2">
                        <h5>{row.last_name} </h5>
                    </div>


                    <div className="col-xs-2 col-md-2">
                        <button className="btn btn-danger" value={row._id}>Delete</button>
                    </div>

                </div>
            )
        })}
    </div>


export default AdminUsersPresentation;