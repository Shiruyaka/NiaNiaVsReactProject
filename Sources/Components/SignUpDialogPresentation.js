import React from "react";

const SignUpDialogPresentation = (
    {
        username_taken, incorrect_passwd = true, accountCreated, createNewAccount = f => f,
        onChangeUsername = f => f, onChangeFirstname = f => f, onChangeLastname = f => f,
        onChangePassword = f => f, onChangeReenterpassword = f => f, onSendToServer = f => f
    }) =>
    <div id="sign_up_view">
        <legend>Sign up!</legend>

        <form className="form" role="form" onSubmit={onSendToServer}>
            <input className="form-control" name="username" onChange={onChangeUsername} placeholder="Username" type="text" required/>
            <input className="form-control" name="firstname" onChange={onChangeFirstname} placeholder="First Name" type="text"/>
            <input className="form-control" name="lastname" onChange={onChangeLastname} placeholder="Last Name" type="text"/>
            <input className="form-control" name="password" onChange={onChangePassword} placeholder="New Password" type="password" required/>
            <input className="form-control" name="reenterpassword" onChange={onChangeReenterpassword} placeholder="Re-enter password" type="password"/>

            {(incorrect_passwd === true)? <p className="bg-warning"> Passwords are different </p>: null}

            {(username_taken === true)? <p className="bg-warning"> Login is taken </p> : null}
            <br />
            <br />

            {((incorrect_passwd)) ?
                    <button className="btn btn-lg btn-primary btn-block" disabled="true" >Create account</button> :
                    <button className="btn btn-lg btn-primary btn-block">Create account</button>}


        </form>
    </div>

export default SignUpDialogPresentation
