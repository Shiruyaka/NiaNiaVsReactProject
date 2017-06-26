import React from "react";
import Parallax from 'react-simple-parallax';

import { Header, SignUpDialog, Menu, AdminPokemons, AddPokemonAdmin , AdminTrainings, AddTrainingAdmin, AdminUsers} from "./Containers"

import { connect } from "react-redux"

const AppPresentation = ( {user, activePage = "", logged = false, wrongLoginOrPassword = false, show_sign_up_dialog = false, accountCreated=false}) => {

    return (

        <div>


            <main className="wrapper">

                <section className="section parallax bg1">
                    <h1>POKEMON ACADEMY!</h1>
                </section>

                <section className="section static">
                </section>

                <section id="main_part">


                    <Header/>
                    <div className="row">

                        <div className="col-md-2 offset-lg-2 center-block"> {(logged)? <Menu/> : null} </div>
                        <div className="col-md-8 col-lg-8 center-block ">

                            {(show_sign_up_dialog) ? <SignUpDialog/> : null}
                            {(accountCreated) ? <p className="bg-success">Account created, now you can log in</p> : null }
                            {(wrongLoginOrPassword)? <p className="bg-danger">Invalid username or login</p>: null }
                            {(user !== undefined && user.role === "admin" &&  activePage === "PokemonAdmin") ? <AdminPokemons/>: null }
                            {(user !== undefined && user.role === "admin" &&  activePage === "AddPokemonAdmin") ? <AddPokemonAdmin/>: null }
                            {(user !== undefined && user.role === "admin" &&  activePage === "TrainingAdmin") ? <AdminTrainings/>: null }
                            {(user !== undefined && user.role === "admin" &&  activePage === "AddTrainingAdmin") ? <AddTrainingAdmin/>: null }
                            {(user !== undefined && user.role === "admin" && activePage === "UserAdmin") ? <AdminUsers/> : null}

                        </div>

                    </div>


                </section>

            </main>


        </div>
    );
};

export default AppPresentation;