import { FILTER, GET_DOGS, GET_TEMPERAMENTS, SEARCH_DOGS } from "../actions"
import { allDogs, dogsFromAPI, dogsFromDB } from "../constantes/constantes"

const initialState = {
    dogs: [],
    filtered: [],
    temperaments: []
}

export default function reducer (state = initialState, action){
    switch(action.type){
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                filtered: action.payload
            }
        case SEARCH_DOGS:
            var {payload} = action
            if(!Array.isArray(payload)){
                payload = []
            }
            return {
                ...state,
                dogs: payload,
                filtered: payload
            }           
        case FILTER:
            var filtered
            switch(action.payload){
                case allDogs:
                    filtered = state.dogs
                    break
                case dogsFromAPI:
                    filtered = state.dogs.filter(dog => {
                        return ! dog.isCreated
                    })
                    break
                case dogsFromDB:
                    filtered = state.dogs.filter(dog => {
                        return dog.isCreated
                    })
                    break
                default:
                    filtered = state.dogs
                    break
            }
            return {
                ...state,
                filtered
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        default:
            return state
    }
} 