import { useDispatch, useSelector } from "react-redux";
import { allDogs, dogsFromAPI, dogsFromDB, notKnown } from "../../constantes/constantes";
import { filter, getTemperaments } from "../../actions";
import { useEffect, useState } from "react";
import './Filter.css'

export default function Filter({setCurrentPage, selectedFilter, setSelectedFilter, setSelectedSort}){
    const temperaments = useSelector(state => state.temperaments)
    console.log(temperaments)
    const dispatch = useDispatch()
    
    //Necesito todos los temperamentos para poder filtrar por temperamento
    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    const changeOption = (e) => {
        e.preventDefault()
        dispatch(filter(e.target.value))
        setSelectedFilter(e.target.value)
        setSelectedSort('elegirSort')
        setCurrentPage(1)
    }

    return (
        <div className="Filter-div">
            {/* <label>Filter </label> */}
            <select onChange={changeOption} value={selectedFilter}>
                <option disabled value='elegirUnFiltro'>-Filter-</option>
                <option disabled></option>
                <option value={allDogs}>No filter</option>
                <option value={dogsFromAPI}>Extant breeds</option>
                <option value={dogsFromDB}>Created breeds</option>
                <option disabled></option>
                <optgroup label="Temperaments">
                    {temperaments.map(t => {
                        return <option key={t}>{t}</option>
                    })}
                    <option value={notKnown}>Not known</option>
                </optgroup>
            </select>
        </div>)
}