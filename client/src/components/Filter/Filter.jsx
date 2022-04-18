import { useDispatch, useSelector } from "react-redux";
import { allDogs, dogsFromAPI, dogsFromDB } from "../../constantes/constantes";
import { filter, getTemperaments } from "../../actions";
import { useEffect } from "react";

export default function Filter(){
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
    }

    return (
        <div>
            <label>Filtrar </label>
            <select onChange={changeOption} defaultValue='elegirUnFiltro'>
                <option disabled value='elegirUnFiltro'>Elegir un filtro</option>
                <option disabled></option>
                <option value={allDogs}>Sin filtro</option>
                <option value={dogsFromAPI}>Razas existentes</option>
                <option value={dogsFromDB}>Razas creadas</option>
                <option disabled></option>
                <optgroup label="Temperamentos">
                    {temperaments.map(t => {
                        return <option key={t}>{t}</option>
                    })}
                </optgroup>
            </select>
        </div>)
}