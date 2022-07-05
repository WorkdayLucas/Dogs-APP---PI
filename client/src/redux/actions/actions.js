export const
    GET_DOGS = "GET_DOGS",
    GET_DOG_BY_QUERY = "GET_DOG_BY_QUERY",
    GET_DOG_BY_ID = "GET_DOG_BY_ID",
    GET_TEMPERS = "GET_TEMPERS",
    SET_MULT = "SET_MULT",
    FilTER_BY_TEMPERS = "FilTER_BY_TEMPERS",
    ORDER_DOGS = "ORDER_DOGS",
    CLEAR_DOG = "CLEAR_DOG",
    SET_SELECT_VISIBILITY = "SET_SELECT_VISIBILITY",
    SET_DONT_FOUND = "SET_DONT_FOUND",
    BLOCK_GET_DOGS = "BLOCK_GET_DOGS",
    GET_CREATED_DOGS = "GET_CREATED_DOGS",
    ADD_FAVORIE = "ADD_FAVORIE",
    SET_NAV_VISION = "SET_NAV_VISION",
    UP_100 = "UP_100",
    RESET_FILT = "RESET_FILT"


export function getDogs() {
    return async function (dispatch) {
        const res = await fetch("http://localhost:3001/API/dogs");
        const json = await res.json();
        return dispatch({ type: GET_DOGS, payload: json });
    }
}

export function getDogsByQuery(raza) {
    return async function (dispatch) {
        const res = await fetch(`http://localhost:3001/API/dogs/search?name=${raza}`);
        const json = await res.json();
        return dispatch({ type: GET_DOG_BY_QUERY, payload: json });
    }
}


export function getDogsById(id) {
    return async function (dispatch) {
        const res = await fetch(`http://localhost:3001/API/dogs/${id}`);
        const json = await res.json();
        return dispatch({ type: GET_DOG_BY_ID, payload: json });
    }
}

export function clearDog(){
    return {
        type: CLEAR_DOG
    }
}

export function getTempers() {
    return async function (dispatch) {
        const res = await fetch(`http://localhost:3001/API/temperament`);
        const json = await res.json();
        return dispatch({ type: GET_TEMPERS, payload: json });
    }
}

export function setMult(direct) {
    return {
        type: SET_MULT,
        payload: direct
    }
}

export function filterDogsByTempers(temper) {
    return {
        type: FilTER_BY_TEMPERS,
        payload: temper
    }
}

export function orderDogs(option) {
    return {
        type: ORDER_DOGS,
        payload: option
    }
}

export function setSelectVisibility(option) {
    return {
        type: SET_SELECT_VISIBILITY,
        payload: option
    }
}

export function setDontFound(){
    return {
        type: SET_DONT_FOUND
    }
}

export function blockGetDogs(opt){
    return {
        type: BLOCK_GET_DOGS,
        payload: opt
    }
}

export function getCreatedDogs(){
    return async function (dispatch) {
        const res = await fetch("http://localhost:3001/API/dogs/created");
        const json = await res.json();
        return dispatch({ type: GET_CREATED_DOGS, payload: json });
    }
}

export function addFavorites(){
    return {
        type: ADD_FAVORIE
    }
}

export function setNavVisibility(op){
    return{
        type: SET_NAV_VISION,
        payload: op
    }
}

export function filtDogsByWeigths(limits){
    return{
        type: UP_100,
        payload: limits
    }
}

export function resetFilt(){
    return {
        type: RESET_FILT
    }
}



