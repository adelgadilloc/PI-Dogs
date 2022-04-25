import { useDispatch, useSelector } from "react-redux";
import { allDogs, dogsFromAPI, dogsFromDB, notKnown } from "../../constantes/constantes";
import { filter, getTemperaments } from "../../actions";
import { useEffect } from "react";

export default function Filter({setCurrentPage}){
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
        setCurrentPage(1)
    }

    return (
        <div>
            <label>Filter </label>
            <select onChange={changeOption} defaultValue='elegirUnFiltro'>
                <option disabled value='elegirUnFiltro'>Choose a filter</option>
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