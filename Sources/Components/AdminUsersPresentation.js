import React from "react";
import {FilterPanel} from "./Containers"

const AdminUsersPresentation = ( {filtered_users, deleteAdminUser = f => f} ) =>

    <div className="container" style={{padding: 10}}>

        <h3>User List</h3>
        <br/>

        <FilterPanel/>

        {(filtered_users.length === 0) ?
            <p>There is no users!</p> :

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
        }





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
                        <button className="btn btn-danger" value={row._id} onClick={deleteAdminUser}>Delete</button>
                    </div>

                </div>
            )
        })}
    </div>


export default AdminUsersPresentation;