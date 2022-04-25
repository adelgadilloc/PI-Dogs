import { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import {getDogs, notFirstTime} from '../../actions'
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import Filter from "../Filter/Filter";
import Sort from "../Sort/Sort";
import { useState } from "react";
import Pages from "../Pages/Pages";
import './Home.css'

export default function Home(){
    var dogs = useSelector(state => state.filtered)
    console.log(dogs)
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const cardsPerPage = 8
    const firstCard = cardsPerPage * (currentPage - 1)
    const lastCard = (cardsPerPage * currentPage)
    const cards = dogs.slice(firstCard, lastCard)
    const numberOfPages = Math.ceil(dogs.length / cardsPerPage)
    
    useEffect(() => {
            dispatch(getDogs())
    }, [dispatch])

    const onClick = () => {
        dispatch(getDogs())
    }


    return (
        <div>
            <SearchBar setCurrentPage={setCurrentPage}/>
            <Filter setCurrentPage={setCurrentPage}/>
            <Sort setCurrentPage={setCurrentPage}/>
            <button onClick={onClick}>Show all breeds</button>
            <Pages setCurrentPage={setCurrentPage} numberOfPages={numberOfPages}/>
            <div className="home-all-cards">
                {(cards.length > 0 ) ?
                    cards.map(d => {
                        return <div className="home-card">
                            <Link to={`/dog/${d.id}`}><h1>{d.name}</h1></Link>
                            {d.image && <img src={d.image} alt='' className="dog-image"/>}
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
        </div>
    )
}