import {
    GET_DOGS,
    GET_DOG_BY_QUERY,
    GET_DOG_BY_ID, GET_TEMPERS,
    SET_MULT, FilTER_BY_TEMPERS,
    ORDER_DOGS,
    CLEAR_DOG,
    SET_SELECT_VISIBILITY,
    SET_DONT_FOUND,
    BLOCK_GET_DOGS,
    GET_CREATED_DOGS,
    ADD_FAVORIE,
    SET_NAV_VISION,
    UP_100,
    RESET_FILT
} from '../actions/actions.js';

const initialState = {
    dogs: [],
    toFilterDogs: [],
    dogsSwitch: 1,
    filtWeightSwitch: 1,
    favoriteDogs: [],
    dogByID: [],
    dogByQuery: [],
    tempers: [],
    createdDog: [],
    xPage: 8,
    portions: 0,
    mult: 1,
    selectsClass: "show",
    searchedDogs: [],
    dontFound: false,
    block: false,
    hideNavOpt: false,
    weightOptionsFilterVision: "showOp",
    resetFilter: false
}

function SortAlphabetic(x, y) {
    if (x.name < y.name) { return -1; }
    if (x.name > y.name) { return 1; }
    return 0;
}

function SortWeight(x, y) {
    let rx = x.weight.includes(" - ") ? x.weight.split(" - ") : x.weight.split(" – ");
    let ry = y.weight.includes(" - ") ? y.weight.split(" - ") : y.weight.split(" – ");
    rx = rx[1] ? rx[1] : rx[0]
    ry = ry[1] ? ry[1] : ry[0]

    if (Number(rx) < Number(ry)) { return -1; }
    if (Number(rx) > Number(ry)) { return 1; }
    return 0;
}

export default function dogReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: payload.sort(SortAlphabetic),
                toFilterDogs: [],
                dogsSwitch: 1,
                filtWeightSwitch: 1,
                portions: Math.ceil(payload.length / state.xPage)
            }
        case GET_CREATED_DOGS:
            return {
                ...state,
                dogs: payload.length ? payload.sort(SortAlphabetic) : ["sin creacion"],
                toFilterDogs: [],
                dogsSwitch: 1,
                filtWeightSwitch: 1,
                portions: Math.ceil(payload.length / state.xPage)
            }
        case BLOCK_GET_DOGS:
            if (payload === "on") {
                return { ...state, block: true }
            } else if (payload === "off") {
                return { ...state, block: false }
            }
        case GET_DOG_BY_QUERY:
            if (payload[0].hasOwnProperty("msg")) {
                return { ...state, dogs: [], dontFound: true }
            } else {
                return {
                    ...state,
                    dogs: payload,
                    toFilterDogs: [],
                    dogsSwitch: 1,
                    filtWeightSwitch: 1,
                    portions: Math.ceil(payload.length / state.xPage)
                }
            }
        case SET_DONT_FOUND:
            return { ...state, dontFound: false }
        case GET_DOG_BY_ID:
            return { ...state, dogByID: [payload] }
        case CLEAR_DOG:
            return { ...state, dogByID: [] }
        case GET_TEMPERS:
            return { ...state, tempers: [{ name: "all tempers", id: 0 }].concat(payload) }
        case SET_MULT:
            if (payload === "sig") {
                return { ...state, mult: state.mult + 1 }
            } else if (payload === "prev") {
                return { ...state, mult: state.mult - 1 }
            } else if (payload === "reset") {
                return { ...state, mult: 1 }
            } else {
                return { ...state, mult: payload }
            }
        case FilTER_BY_TEMPERS:
            if (payload === "all tempers") {
                return { ...state, dogs: state.toFilterDogs.length ? state.toFilterDogs : state.dogs, portions: state.toFilterDogs.length ? Math.ceil(state.toFilterDogs.length / state.xPage) : Math.ceil(state.dogs.length / state.xPage) }
            } else {
                if (state.dogsSwitch === 1) {
                    let filterDogs = state.dogs.filter(dog => dog.tempers?.includes(payload))
                    if (!filterDogs.length) {
                        console.log("no hay")
                        return { ...state, dogs: ["no hay"], toFilterDogs: state.dogs, dogsSwitch: 2, portions: 0 }
                    } else {
                        return { ...state, dogs: filterDogs, toFilterDogs: state.dogs, dogsSwitch: 2, portions: Math.ceil(filterDogs.length / state.xPage) }
                    }

                } else if (state.dogsSwitch === 2) {
                    let filterDogs = state.toFilterDogs.filter(dog => dog.tempers?.includes(payload))
                    if (!filterDogs.length) {
                        console.log("no hay")
                        return { ...state, dogs: ["no hay"], portions: 0 }
                    } else {
                        return { ...state, dogs: filterDogs, portions: Math.ceil(filterDogs.length / state.xPage) }
                    }

                }
            }
        case ORDER_DOGS:
            let toOrder = state.dogs.map(dog => dog)
            if (payload === "A-Z") {
                return { ...state, dogs: toOrder.sort(SortAlphabetic) }
            } else if (payload === "Z-A") {
                toOrder.sort(SortAlphabetic)
                return { ...state, dogs: toOrder.reverse() }
            } else if (payload === "LowerWeight") {
                return { ...state, dogs: toOrder.sort(SortWeight) }
            } else if (payload === "UperWeight") {
                toOrder.sort(SortWeight)
                return { ...state, dogs: toOrder.reverse(SortWeight) }
            }
        case SET_SELECT_VISIBILITY:
            if (payload === "show") {
                return { ...state, selectsClass: "show" }
            } else if (payload === "hide") {
                return { ...state, selectsClass: "hide" }
            }
        case ADD_FAVORIE:

            let esta = state.favoriteDogs.find(fav => fav.id === state.dogByID[0].id)

            if (!esta) {
                return { ...state, favoriteDogs: [...state.favoriteDogs, state.dogByID[0]] }
            } else {
                alert("ya esta en favoritos")
            }

        case SET_NAV_VISION:
            if (payload == "hide") {
                return { ...state, hideNavOpt: true }
            } else if (payload == "show") {
                return { ...state, hideNavOpt: false }
            }


        case UP_100:
            console.log(payload)
            let weightMax
            if (payload === "all weights") {
                return { ...state, dogs: state.toFilterDogs.length ? state.toFilterDogs : state.dogs, portions: state.toFilterDogs.length ? Math.ceil(state.toFilterDogs.length / state.xPage) : Math.ceil(state.dogs.length / state.xPage), weightOptionsFilterVision: "showOp" }
            } else {
                if (state.filtWeightSwitch === 1) {
                    let filterDogs = state.dogs.filter(dog => {
                        weightMax = dog.weight.includes(" - ") ? dog.weight.split(" - ") : dog.weight.split(" – ");
                        weightMax = weightMax[1] ? weightMax[1] : weightMax[0]
                        return weightMax === payload
                    })
                    if (!filterDogs.length) {
                        console.log("no hay")
                        return { ...state, dogs: ["no hay"], toFilterDogs: state.dogs, filtWeightSwitch: 2, portions: 0, weightOptionsFilterVision: "hideOp" }
                    } else {
                        return { ...state, dogs: filterDogs, toFilterDogs: state.dogs, filtWeightSwitch: 2, portions: Math.ceil(filterDogs.length / state.xPage), weightOptionsFilterVision: "hideOp" }
                    }

                } else if (state.filtWeightSwitch === 2) {
                    let filterDogs = state.toFilterDogs.filter(dog => {
                        weightMax = dog.weight.includes(" - ") ? dog.weight.split(" - ") : dog.weight.split(" – ");
                        weightMax = weightMax[1] ? weightMax[1] : weightMax[0]
                        return weightMax === payload
                    })
                    if (!filterDogs.length) {
                        console.log("no hay")
                        return { ...state, dogs: ["no hay"], portions: 0, weightOptionsFilterVision: "hideOp" }
                    } else {
                        return { ...state, dogs: filterDogs, portions: Math.ceil(filterDogs.length / state.xPage), weightOptionsFilterVision: "hideOp" }
                    }

                }
            }

        case RESET_FILT:
            return {...state, resetFilter: !state.resetFilter }    



        // case UP_100:



        //     return {...state, dogs: state.dogs.filter(dog=>{
        //         weightMax = dog.weight.includes(" - ") ? dog.weight.split(" - ") : dog.weight.split(" – ");
        //         weightMax = weightMax[1] ? weightMax[1] : weightMax[0]
        //         console.log(weightMax)
        //         return weightMax===payload
        //     })
        // } 
        default:
            return state
    }
}

