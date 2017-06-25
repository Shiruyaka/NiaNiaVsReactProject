import c from "./ActionConstants"

function sortPokemons(value, array) {
    console.log(value);
    switch (value) {
        case "Name Up":
            return array.sort(function (a, b) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });

        case "Name Down":
            return array.sort(function (a, b) {
                if (a.name < b.name) return 1;
                if (a.name > b.name) return -1;
                return 0;
            });

        case "Health Up":
            return array.sort(function (a, b) {
                if (a.health < b.health) return -1;
                if (a.health > b.health) return 1;
                return 0;
            });

        case "Health Down":
            return array.sort(function (a, b) {
                if (a.health < b.health) return 1;
                if (a.health > b.health) return -1;
                return 0;
            });

        case "Agility Up":
            return array.sort(function (a, b) {
                if (a.agility < b.agility) return -1;
                if (a.agility > b.agility) return 1;
                return 0;
            });

        case "Agility Down":
            return array.sort(function (a, b) {
                if (a.agility < b.agility) return 1;
                if (a.agility > b.agility) return -1;
                return 0;
            });

        case "Attack Up":
            return array.sort(function (a, b) {
                if (a.attack < b.attack) return -1;
                if (a.attack > b.attack) return 1;
                return 0;
            });

        case "Attack Down":
            return array.sort(function (a, b) {
                if (a.attack < b.attack) return 1;
                if (a.attack > b.attack) return -1;
                return 0;
            });

        case "Defence Up":
            return array.sort(function (a, b) {
                if (a.defence < b.defence) return -1;
                if (a.defence > b.defence) return 1;
                return 0;
            });

        case "Defence Down":
            return array.sort(function (a, b) {
                if (a.defence < b.defence) return 1;
                if (a.defence > b.defence) return -1;
                return 0;
            });

        case "Duration Up":
            return array.sort(function (a, b) {
                if (a.duration < b.duration) return -1;
                if (a.duration > b.duration) return 1;
                return 0;
            });

        case "Duration Down":
            return array.sort(function (a, b) {
                if (a.duration < b.duration) return 1;
                if (a.duration > b.duration) return -1;
                return 0;
            });
    }

}

function removeByKey(array, params){
    array.some(function(item, index) {
        if(array[index]["_id"] === params){
            array.splice(index, 1);
            return true;
        }
        return false;
    });
    return array;
}

export const reducers = (state = {}, action = { type: null }) =>{

    switch(action.type){
        case c.LOGIN:
            return{
                username : action.username,
                role: action.role,
                poekmons: action.pokemons,
                trainings: action.trainings,
                on_training: action.on_training
            };


        case c.SHOW_LOGIN_FORM:
            return Object.assign({}, state, {
                show_login_form : true,
                accountCreated : false

            });

        case c.HIDE_LOGIN_FORM:
            return Object.assign({}, state, {
                show_login_form : false
            });

        case c.SHOW_SIGN_UP_DIALOG:
            return Object.assign({}, state, {
                show_sign_up_dialog : !state.show_sign_up_dialog,

            });

        case c.SAVE_FIRSTNAME:
            return Object.assign({}, state, {
                ...state,
                signUpData: {
                    ...state.signUpData,
                    first_name : action.first_name}
            });

        case c.ON_HOME_CLICK:
            return Object.assign({}, state, {
                ...state,
                home_class: action.home_class,
        });

        case c.ON_POKEMON_CLICK:
            return Object.assign({}, state, {
                ...state,
                pokemon_class: action.pokemon_class,
                user_name: "Ola"
            });

        case c.ON_USERS_CLICK:
            return Object.assign({}, state, {
                ...state,
                users_class: action.users_class,
            });

        case c.ON_TRAINGINGS_CLICK:
            return Object.assign({}, state, {
                ...state,
                training_class: action.training_class,
            });

        case c.SAVE_LASTNAME:
            return Object.assign({}, state, {
                ...state,
                signUpData: {...state.signUpData,
                    last_name: action.last_name}
            });

        case c.SAVE_PASSWD:
            return Object.assign({}, state, {
                ...state,
                signUpData: {...state.signUpData,
                    passwd : action.passwd}
            });

        case c.SAVE_REENTERED_PASSWD:
            return Object.assign({}, state, {
                ...state,
                incorrect_passwd : !(state.signUpData.passwd === action.reentered_passwd),
                signUpData: {...state.signUpData,
                    reentered_passwd: action.reentered_passwd}
            });

        case c.SAVE_USERNAME:
            return Object.assign({}, state, {
                ...state,
                username_taken : false,
                signUpData: {...state.signUpData,
                    user_name: action.user_name},

            });

        case c.CREATE_ACCOUNT:
            return Object.assign({}, state, {
                ...state,
                show_sign_up_dialog : !state.show_sign_up_dialog,
                signUpData : {},
                incorrect_passwd : false,

            });

        case c.PASSWORDS_NOT_THE_SAME:
            return Object.assign({}, state, {
                ...state,
                incorrect_passwd : true
            });

        case c.USERNAME_TAKEN:
            return Object.assign({}, state,{username_taken: true});

        case c.CREATING_ACCOUNT_SUCCESS:
            return Object.assign({}, state, { accountCreated : true, incorrect_passwd : false, signUpData : {}, show_sign_up_dialog : !state.show_sign_up_dialog, show_login_form : true});

        case c.LOGIN_FAILED:
            return Object.assign({}, state, { wrongLoginOrPassword: true, accountCreated:false});

        case c.LOGIN_SUCCESS:
            console.log(JSON.stringify(action));
            console.log(JSON.stringify(action.cookie));

            return Object.assign({}, state,
                {
                    show_login_form: false,
                    show_sign_up_dialog: false,
                    wrongLoginOrPassword: false,
                    accountCreated:false,
                    logged: true,
                    user: action.user,
                    pokemons : [],
                    filtered_pokemons : [],
                    trainings : [],
                    filtered_trainings : []


                });

        case c.SET_SEARCH_VALUE:
            return Object.assign({}, state, {
                search_for: action.search_for,
                filtered_pokemons: state.pokemons.filter(row => row.name.toLowerCase().includes(action.search_for.toString().toLowerCase())),
                filtered_trainings: state.trainings.filter(row => row.name.toLowerCase().includes(action.search_for.toString().toLowerCase()))
            });

        case c.POKEMON_ADMIN:
            return Object.assign({}, state,
                {
                    pokemons: sortPokemons("Name Up", action.pokemons),
                    filtered_pokemons: action.pokemons,
                    activePage: "PokemonAdmin"
                });

        case c.TRAINING_ADMIN:
            return Object.assign({}, state,
                {
                    trainings: sortPokemons("Name Up", action.trainings),
                    filtered_trainings: action.trainings,
                    activePage: "TrainingAdmin"
                });

        case c.SET_SORT_VALUE:
            return Object.assign({}, state,
                {
                    filtered_pokemons: sortPokemons(action.sort_by, state.filtered_pokemons.filter(p => 1 === 1)),
                    filtered_trainings : sortPokemons(action.sort_by, state.filtered_trainings.filter(p => 1 === 1))
                });

        case c.SHOW_ADD_POKEMON_ADMIN_PANEL:
            return Object.assign({}, state,
                {
                    activePage: "AddPokemonAdmin"
                });

        case c.SHOW_ADD_TRAINING_ADMIN_PANEL:
            return Object.assign({}, state,
                {
                    activePage: "AddTrainingAdmin"
                });

        case c.ON_ADMIN_DELETE_POKEMON_FAILED:
            alert("You cant remove specie if there are pokemons of this specie")
            return Object.assign({}, state,
                {
                });

        case c.ON_ADMIN_DELETE_POKEMON_SUCCESS:
            alert("Specie deleted")
            return Object.assign({}, state,
                {
                    filtered_pokemons : removeByKey(state.filtered_pokemons.filter(p => 1 === 1), action.deleted_id)
                });


        default:
            return state;
    }

};
