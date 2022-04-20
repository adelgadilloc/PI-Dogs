import { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import {getDogs} from '../../actions'
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";

export default function Home(){
    var dogs = useSelector(state => state.filtered)
    console.log(dogs)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch])

    const onClick = () => {
        dispatch(getDogs())
    }

    return (
        <div>
            <SearchBar/>
            <button onClick={onClick}>Show all breeds</button>
            {(dogs.length > 0 ) ?
                dogs.map(d => {
                    return <div>
                        <Link to={`/dog/${d.id}`}><h1>{d.name}</h1></Link>
                        {d.image && <img src={d.image} alt=''/>}
                        {d.minWeight && d.maxWeight ?
                            (d.minWeight === d.maxWeight) ?
                                <h3>Weighs aproximately {d.minWeight} kg</h3>
                            : 
                                <h3>Weighs aproximately between {d.minWeight} and {d.maxWeight} kg</h3>
                        :
                            (d.minWeight || d.maxWeight) ?
                                <h3>Weighs aproximately {d.minWeight || d.maxWeight} kg</h3>
                            :
                                <h3>Their Weight is not known</h3>}
                        <h3>Temperaments of this breed:</h3>
                        {d.temperaments.length > 0 ? d.temperaments.map( temperament => {
                            return <h4>{temperament}</h4>
                            })
                        :
                            <h4>Their temperaments are not known</h4>
                        }
                    </div>
                })
            :
            <h2>No dog breeds found</h2>}
        </div>
    )
}