import c from "./ActionConstants";
import fetch from "isomorphic-fetch";
require('es6-promise').polyfill();

const parseResponse = response => response.json();
const logError = error => console.error(error);

const fetchThenDispatch = (dispatch, url, method, body) =>
    fetch(
        url,
        {
            method,
            credentials: 'same-origin',
            body,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",

            }
        }
    ).then(parseResponse).then(dispatch)
        .catch(logError);

const fetchThenDispatchWithPicture = (dispatch, url, method, name, file) => {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("name",body.name);
    return fetch(
        url,
        {
            method,
            credentials: 'same-origin',
            body: formData
        }
    ).then(parseResponse).then(dispatch).catch(logError);
};

export const showLoginForm = () =>
    ({
        type: c.SHOW_LOGIN_FORM
    });

export const hideLoginForm = () =>
    ({
        type: c.HIDE_LOGIN_FORM
    });

export const showSignUpDialog = () =>
    ({
        type: c.SHOW_SIGN_UP_DIALOG
    });

export const hideSignUpDialog = () =>
    ({
        type: c.HIDE_SIGN_UP_DIALOG
    });

export const saveUsername = (e) => ({
    type: c.SAVE_USERNAME,
    user_name: e.target.value
});

export const saveFirstname = (e) => ({
    first_name: e.target.value,
    type: c.SAVE_FIRSTNAME
});

export const saveLastname = (e) => ({
    last_name: e.target.value,
    type: c.SAVE_LASTNAME
});

export const savePasswd = (e) => ({
    passwd: e.target.value,
    type: c.SAVE_PASSWD
});

export const saveReenteredPasswd = (e) => ({
    reentered_passwd: e.target.value,
    type: c.SAVE_REENTERED_PASSWD
});


export const loginToServer = e => dispatch => {
    e.preventDefault();
    return fetchThenDispatch(
        dispatch,
        '/login',
        'POST',
        JSON.stringify(
            {
                "username": e.target.elements.username.value,
                "password": e.target.elements.password.value
            }));
};

export const sendSignUpRequest = (e) => dispatch => {
    e.preventDefault();

    return fetchThenDispatch(
        dispatch,
        '/signup',
        'POST',
        JSON.stringify({
            "username": e.target.elements.username.value,
            "firstname": e.target.elements.firstname.value,
            "lastname": e.target.elements.lastname.value,
            "password": e.target.elements.password.value
        }));
};



export const getPokemonsRequestAdmin = (e) => dispatch => {
     fetchThenDispatch(
        dispatch,
        'admin/pokemons',
        'GET',
        null
    )
};

export const getTrainingsRequestAdmin = (e) => dispatch => {
    fetchThenDispatch(
        dispatch,
        'admin/trainings',
        'GET',
        null
    )
};

export const onUserAdminClick = () => dispatch => {
  fetchThenDispatch(
      dispatch,
      'admin/users',
      'GET',
      null
  )
};

export const showAddTrainingAdmin = () =>
    ({
        type: c.SHOW_ADD_TRAINING_ADMIN_PANEL
    });

export const onHomeClick = (e) =>
    ({
        home_class: e.target.classList.toggle("active"),
        type: c.ON_HOME_CLICK
    });

export const onTrainingsClick = (e) =>
    ({
        training_class: e.target.classList.toggle("active"),
        type: c.ON_TRAINGINGS_CLICK
    });

export const onUsersClick = (e) =>
    ({
        users_class: e.target.classList.toggle("active"),
        type: c.ON_USERS_CLICK
    });

export const onPokemonsClick = (e) =>
    ({
        pokemon_class: e.target.classList.toggle("active"),
        type: c.ON_POKEMON_CLICK
    });

export const showAddPokemonAdmin = () =>
    ({
        type: c.SHOW_ADD_POKEMON_ADMIN_PANEL
    });

export const sendAddPokemonRequest = (e) => dispatch =>{

    alert(e.target.elements.name.value);
    alert(e.target.elements.file.value);

    return fetchThenDispatchWithPicture(
        dispatch,
        "admin/add_pokemon",
        "POST",
        e.target.elements.name.value,
        e.target.elements.file.value
    );
};

export const deleteAdminPokemon = (e) => dispatch => {
  return fetchThenDispatch(
      dispatch,
      "admin/edit_pokemon/"+e.target.id,
      "DELETE",
      JSON.stringify({})
  );
};

export const deleteAdminTraining = (e) => dispatch => {
    return fetchThenDispatch(
        dispatch,
        "admin/edit_training/"+e.target.value,
        "DELETE",
        JSON.stringify({})
    );
};


export const onChangeSearchInput = (e) => ({
    search_for : e.target.value,
    type: c.SET_SEARCH_VALUE
});

export const onChangeSortInput = (e) => {

    console.log(e.target.value);

    return ({
            sort_by: e.target.value,
            type: c.SET_SORT_VALUE
        });
};

