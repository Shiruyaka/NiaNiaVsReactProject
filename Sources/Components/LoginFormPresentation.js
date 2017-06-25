import { Component, PropTypes } from 'react'

const LoginFormPresentation = ( {wrongLoginOrPassword = false, onLoginFormHide = f => f, onLogin = f => f} ) =>
{
    return (
        <div className="row pull-right" id="login_panel">



            <form onSubmit={onLogin} role="form">
                <div><input name="username" type="text" className="form-control" placeholder="Username" autoFocus/></div>
                <div><input name="password" type="password" className="form-control" placeholder="Password"/></div>
                <div><button className="btn btn-primary btn-block">Log in</button></div>
                <div><input type="submit" value="X" className="btn btn-primary btn-block" onClick={onLoginFormHide}/></div>

            </form>
        </div>
    )
};

export default LoginFormPresentation

//<div><input type="submit" value="X" className="btn btn-primary btn-block" onClick={onLoginFormHide}/></div>