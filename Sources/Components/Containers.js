import { connect } from "react-redux"
import HeaderPresentation from "./HeaderPresentation"
import LoginFormPresentation from "./LoginFormPresentation"
import SignUpDialogPresentation from "./SignUpDialogPresentation"
import AppPresentation from "./AppPresentation"
import MenuPresentation from "./MenuRepresentation"
import LoggedFormPresentation from "./LoggedFormPresentation"
import AdminPokemonPresentation from "./AdminPokemonPresentation"
import AddPokemonAdminPresentation from "./AddPokemonAdminPresentation"
import AdminTrainingsPresentation from "./AdminTrainingsPresentation"
import FilterSearchPanelPresentation from "./FilterSearchPanelPresentation"
import AddTrainingAdminPresentation from "./AddTrainingAdminPresentation"
import AdminUsersPresentation from "./AdminUsersPresentation"
import EditTrainingAdminPresentation from "./EditTrainingAdminPresentation"
import { showLoginForm, hideLoginForm, showSignUpDialog, hideSignUpDialog, createAccount, saveUsername,
    saveFirstname, saveLastname, savePasswd, saveReenteredPasswd, sendSignUpRequest, loginToServer,
    onHomeClick, onPokemonsClick,  onUsersClick, onTrainingsClick, getPokemonsRequestAdmin, showAddPokemonAdmin,
    sendAddPokemonRequest, onChangeSearchInput, onChangeSortInput, getTrainingsRequestAdmin, showAddTrainingAdmin, deleteAdminPokemon, deleteAdminTraining, onUserAdminClick, deleteAdminUser,
    saveNewTraining, saveEditTraining, editAdminTraining, changeTrainingName, changeTrainingAttack,changeTrainingAgility, changeTrainingDuration, changeTrainingDefence, changeTrainingHealth, onPictureLoad,
    saveNewPokemonName,logOutFunction
} from "../../Actions"


export const App = connect(
({user, activePage, wrongLoginOrPassword, logged, show_sign_up_dialog, accountCreated}) =>
    ({
        wrongLoginOrPassword: wrongLoginOrPassword,
        logged: logged,
        show_sign_up_dialog: show_sign_up_dialog,
        accountCreated: accountCreated,
        activePage: activePage,
        user: user
    })
)(AppPresentation);



export const Header = connect(
    ({show_login_form, show_sign_up_dialog, logged}) =>
        ({
            show_login_form: show_login_form,
            show_sign_up_dialog: show_sign_up_dialog,
            logged: logged
        }),
    dispatch =>
        ({
            onLoginFormShow(){
                dispatch(showLoginForm());
            },
            onSignUpDialogShow(){
              dispatch(showSignUpDialog())
            }
        })
)(HeaderPresentation);


export const LoginForm = connect(
    ({show_login_form, wrongLoginOrPassword}) =>
        ({
            show_login_form: show_login_form,
            wrongLoginOrPassword : wrongLoginOrPassword
        }),
    dispatch =>
        ({
            onLoginFormHide(){
                dispatch(hideLoginForm());
            },

            onLogin(e){
                dispatch(loginToServer(e))
            }
        })
)(LoginFormPresentation);

export const LoggedPanel = connect(
    ({user}) =>
        ({user : user}),
    dispatch =>
        ({
            logOutFunction(){
                dispatch(logOutFunction())
            }
        })
)(LoggedFormPresentation);

export const Menu = connect(
    ({home_class, pokemon_class, training_class, users_class}) => ({home_class: home_class,
            pokemon_class:pokemon_class,
            users_class: users_class,
            training_class: training_class}),
    dispatch =>
        ({
            onHomeClick(e){
                dispatch(onHomeClick(e));
            },
            onPokemonsClick(e){
              dispatch(onPokemonsClick(e));
            },
            onPokemonAdminClick(){
                dispatch(getPokemonsRequestAdmin());
            },
            onUsersClick(e){
                dispatch(onUsersClick(e));
            },
            onTrainingsClick(e){
                dispatch(onTrainingsClick(e));
            },
            onAddPokemonClick(){
                dispatch(showAddPokemonAdmin())
            },
            onTrainingAdminClick(e){
              dispatch(getTrainingsRequestAdmin())
            },
            onAddAdminTrainingClick(e){
              dispatch(showAddTrainingAdmin())
            },
            onUserAdminClick(e){
                dispatch(onUserAdminClick())
            },
        })
)(MenuPresentation);

export const SignUpDialog = connect(
    ({show_sign_up_dialog, incorrect_passwd, username_taken, signUpData, accountCreated}) =>
        ({  show_sign_up_dialog: show_sign_up_dialog,
            incorrect_passwd: incorrect_passwd,
            username_taken: username_taken,
            signUpData: signUpData,
            accountCreated: accountCreated
        }),

    dispatch =>
        ({
            onSignUpHide(){
                dispatch(hideSignUpDialog());
            },
            createNewAccount(e){
                dispatch(createAccount(e));
            },
            onChangeUsername(e){
                dispatch(saveUsername(e));
            },
            onChangeFirstname(e){
                dispatch(saveFirstname(e));
            },
            onChangeLastname(e){
                dispatch(saveLastname(e));
            },
            onChangePassword(e){
                dispatch(savePasswd(e));
            },
            onChangeReenterpassword(e){
                dispatch(saveReenteredPasswd(e));
            },
            onSendToServer(e){
                dispatch(sendSignUpRequest(e));
            }
        })
)(SignUpDialogPresentation);


export const FilterPanel = connect(
    ({activePage}) =>
        ({activePage:activePage}),
    dispatch =>
        ({
            onChangeSearchInput(e){
                dispatch(onChangeSearchInput(e));
            },
            onChangeSortInput(e){
                dispatch(onChangeSortInput(e));
            }
        })
)(FilterSearchPanelPresentation);

export const AdminPokemons = connect(
    ({pokemons, search_for, filtered_pokemons, onPictureLoad})=>
        ({
            pokemons: pokemons,
            search_for: search_for,
            filtered_pokemons: filtered_pokemons
        }),
    dispatch =>
        ({
            deleteAdminPokemon(e){
                dispatch(deleteAdminPokemon(e))
            },

            loadPicture(e){
                dispatch(onPictureLoad(e));
            }
        })
)(AdminPokemonPresentation);


export const AdminTrainings = connect(
    ({filtered_trainings})=>
        ({
            filtered_trainings: filtered_trainings
        }),
    dispatch =>
        ({
            deleteAdminTraining(e){
                dispatch(deleteAdminTraining(e))
            },
            editAdminTraining(e){
                dispatch(editAdminTraining(e))
            }
        })
)(AdminTrainingsPresentation);

export const AdminUsers = connect(
    ({filtered_users})=>
        ({
            filtered_users: filtered_users
        }),
    dispatch =>
        ({
            deleteAdminUser(e){
                dispatch(deleteAdminUser(e))
            },
        })
)(AdminUsersPresentation);

export const AddPokemonAdmin = connect(
    ({pictureToSend, newPokemonName, pokemon_added}) =>
        ({pictureToSend, newPokemonName, pokemon_added}),
    dispatch =>
        ({
            onSendNewPokemon(file, name){
                dispatch(sendAddPokemonRequest(file, name))
            },
            onPictureLoad(e){
                dispatch(onPictureLoad(e));
            },
            onNameChange(e){
                dispatch(saveNewPokemonName(e))
            }
        })
)(AddPokemonAdminPresentation);

export const AddTrainingAdmin = connect(
    ({training_added}) =>
        ({training_added: training_added}),
    dispatch =>
        ({
            saveNewTraining(e){
                dispatch(saveNewTraining(e))
            },
            onChangeTrainingName(e){
                dispatch(saveTrainingName(e))
            },
            onChangeTrainingHealth(e){
                dispatch(saveTrainingHealth(e))
            },
            onChangeTrainingAgility(e){
                dispatch(saveTrainingAgility(e))
            },
            onChangeTrainingDefence(e){
                dispatch(saveTrainingDefence(e))
            },
            onChangeTrainingDuration(e){
                dispatch(saveTrainingDuration(e))
            },
            onChangeTrainingAttack(e){
                dispatch(saveTrainingAttack(e))
            },
        })
)(AddTrainingAdminPresentation);

export const EditTrainingAdmin = connect(
    ({training}) =>
        ({training: training}),
    dispatch =>
        ({
            saveEditTraining(e){
                dispatch(saveEditTraining(e))
            },
            changeTrainingName(e){
                dispatch(changeTrainingName(e))
            },
            changeTrainingHealth(e){
                dispatch(changeTrainingHealth(e))
            },
            changeTrainingAttack(e){
                dispatch(changeTrainingAttack(e))
            },
            changeTrainingDefence(e){
                dispatch(changeTrainingDefence(e))
            },
            changeTrainingDuration(e){
                dispatch(changeTrainingDuration(e))
            },
            changeTrainingAgility(e){
                dispatch(changeTrainingAgility(e))
            },



        })
)(EditTrainingAdminPresentation);

