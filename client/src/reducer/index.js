import { CLEAN_DETAIL, FILTER, GET_DETAIL, GET_DOGS, GET_TEMPERAMENTS, NOT_FIRST_TIME, SEARCH_DOGS, SORT } from "../actions"
import { allDogs, ASC, DESC, ASC_WEIGHT, DESC_WEIGHT, dogsFromAPI, dogsFromDB, notKnown } from "../constantes/constantes"

const initialState = {
    dogs: [],
    filtered: [],
    temperaments: [],
    detail: {},
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
                case notKnown:
                    filtered = state.dogs.filter(dog => {
                        return dog.temperaments.length === 0
                    })
                    break
                default:
                    filtered = state.dogs.filter(dog => {
                        return dog.temperaments.includes(action.payload)
                    })
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
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        case SORT:
            if([ASC, DESC].includes(action.payload)){
                filtered = [...state.filtered.sort( (a,b) => {
                    if(a.name.toUpperCase() < b.name.toUpperCase()){
                        return action.payload === ASC ? -1 : 1
                    }
                    if(a.name.toUpperCase() > b.name.toUpperCase()){
                        return action.payload === ASC ? 1 : -1
                    }
                    return 0    //este es el caso en que los dos nombres
                                // son iguales
                })]
            }
            else if([ASC_WEIGHT, DESC_WEIGHT].includes(action.payload)){
                var perrosSinPeso = state.filtered.filter((d) => {
                    return (d.minWeight === null && d.maxWeight === null)
                })
                var perrosConPeso = state.filtered.filter((d) => {
                    return ! (d.minWeight === null && d.maxWeight === null) 
                })
                filtered = [...perrosConPeso.sort( (a,b) => {
                    //los perros de perrosConPeso si no tienen peso mínimo,
                    //sí tienen peso máximo
                    var weightOfDogA = a.minWeight ? a.minWeight : a.maxWeight
                    var weightOfDogB = b.minWeight ? b.minWeight : b.maxWeight
                    
                    if(action.payload === ASC_WEIGHT){
                        return weightOfDogA - weightOfDogB
                    }
                    else{   //si action.payload === DESC_WEIGHT
                        return weightOfDogB - weightOfDogA
                    }
                }), ...perrosSinPeso]
            }
            console.log(filtered)
            return {
                ...state,
                filtered
            }
        case CLEAN_DETAIL:
            return {
                ...state,
                detail: {}
            }
        default:
            return state
    }
} 