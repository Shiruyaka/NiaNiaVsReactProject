import React from "react"
import { showLoginDialog } from "../../Actions"
import  { LoginForm, LoggedPanel } from "./Containers"
import {Menu} from "./Containers"
import { connect } from "react-redux"

const HeaderPresentation = ({ show_login_form = false, logged=false, onLoginFormShow=f=>f, onSignUpDialogShow=f=>f }) => {
    return (
        <div className ="navbar navbar-default navbar-static-top" role="navigation">

            <div className ="container">

                <div className="col-sm-3">

                    <div className  = "nvbar-header">
                        <a className = "navbar-brand" href="/">Pokemon Academy</a>
                    </div>

                </div>


                <ul className ="nav navbar-nav navbar-right">
                    {(logged) ? <div id="logged_panel">
                            <LoggedPanel/>
                        </div>:

                        <div id="log_sign_button">
                            <div className="pull-left">{
                                (show_login_form)? <LoginForm /> :
                                    <input className="btn btn-primary btn-block" type="button" value="Login"
                                           onClick = {onLoginFormShow} />

                            }</div>
                            <div className="pull-right"> <input className="btn btn-primary btn-block" type="button" value="Sign up"
                                                                onClick = {onSignUpDialogShow}/> </div>
                        </div>
                    }
                </ul>
            </div>

        </div>
    )
};

export default HeaderPresentation;