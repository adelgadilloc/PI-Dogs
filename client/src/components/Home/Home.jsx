import { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import {getDogs} from '../../actions'
import SearchBar from "../SearchBar/SearchBar";
import Filter from "../Filter/Filter";

export default function Home(){
    var dogs = useSelector(state => state.filtered)
    console.log(dogs)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch])

    return (
        <div>
            <SearchBar/>
            <Filter/>
            {(dogs.length > 0 ) ?
                dogs.map(d => {
                    return <div>
                        <h1>{d.name}</h1>
                        {d.image && <img src={d.image} alt=''/>}
                        {d.minWeight && d.maxWeight ? 
                            <h3>Weighs aproximately between {d.minWeight} and {d.maxWeight} kg</h3>
                        :
                            (d.minWeight || d.maxWeight) ?
                                <h3>Weighs aproximately {d.minWeight || d.maxWeight} kg</h3>
                            :
                                <h3>Their Weight is not known</h3>}
                        <h3>Temperaments of this breed:</h3>
                        {d.temperaments ? d.temperaments.map( temperament => {
                            return <h4>{temperament}</h4>
                            })
                        :
                            <h4>Their temperaments are not known</h4>
                        }
                    </div>
                })
            :
            <h2>No se encontró</h2>}
        </div>
    )
}