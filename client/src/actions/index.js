import axios from 'axios'

export const GET_DOGS = 'GET_DOGS'
export const SEARCH_DOGS = 'SEARCH_DOGS'
export const FILTER = 'FILTER'
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS'

export function getDogs(){
    return async function (dispatch){
        const {data} = await axios.get('http://localhost:3001/dogs')
        return dispatch({
            type: GET_DOGS,
            payload: data
        })
    }
}

export function searchDogs(search){
    return async function (dispatch){
        const {data} = await axios.get(`http://localhost:3001/dogs?name=${search}`)
        return dispatch({
            type:SEARCH_DOGS,
            payload: data
        })
    }
}

export function filter(filter){
    return function (dispatch){
        return dispatch({
            type: FILTER,
            payload: filter
        })
    }
}

export function getTemperaments(){
    return async function (dispatch){
        const {data} = await axios.get('http://localhost:3001/temperaments')
        console.log(data)
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: data
        }
        )
    }
}