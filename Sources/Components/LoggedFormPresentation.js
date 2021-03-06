import React from "react";

const LoggedFormPresentation = ( {user, logOutFunction = f => f} ) =>
{
    return (
        <div>

        <div className="pull-right">
                <button className="btn btn-primary btn-block" id="logged_panel_button" onClick={logOutFunction}>Log out</button>
        </div>

            <div className="pull-right" id="logged_panel">
                Hi, {user.username}
            </div>
        </div>
    )
};

export default LoggedFormPresentation