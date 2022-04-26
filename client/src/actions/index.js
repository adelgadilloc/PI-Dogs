import axios from 'axios'

export const GET_DOGS = 'GET_DOGS'
export const SEARCH_DOGS = 'SEARCH_DOGS'
export const FILTER = 'FILTER'
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS'
export const GET_DETAIL = 'GET_DETAIL'
export const SORT = 'SORT'
export const CLEAN_DETAIL = 'CLEAN_DETAIL'
export const NOT_FIRST_TIME = 'NOT_FIRST_TIME'
export const SET_UNMOUNT_DETAIL_FLAG = 'SET_UNMOUNT_DETAIL_FLAG'

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
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: data
        }
        )
    }
}

export function getDetail(id){
    return async function (dispatch){
        const {data} = await axios.get(`http://localhost:3001/dogs/${id}`)
        return dispatch({
            type:GET_DETAIL,
            payload: data
        })
    }
}

export function sort(sort){
    console.log(sort)
    return function (dispatch){
        return dispatch({
            type: SORT,
            payload: sort
        })
    }
}

export function createDog(dog){
    return async function (){
        return await axios.post('http://localhost:3001/dog', dog)
    }
}

export function cleanDetail(){
    return function (dispatch) {
        return dispatch({
            type: CLEAN_DETAIL,
        })
    }
}

export function notFirstTime(){
    return function (dispatch){
        return dispatch({
            type: NOT_FIRST_TIME
        })
    }
}

export function setUnmountDetailFlag(payload){
    return function (dispatch){
        return dispatch({
            type: SET_UNMOUNT_DETAIL_FLAG,
            payload
        })
    }
}