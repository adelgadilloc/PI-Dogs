import { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import {getDogs, setUnmountDetailFlag, cleanDetail} from '../../actions'
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import Filter from "../Filter/Filter";
import Sort from "../Sort/Sort";
import { useState } from "react";
import Pages from "../Pages/Pages";
import './Home.css'
import perro from '../../image/perro.png'

export default function Home(){
    var dogs = useSelector(state => state.filtered)
    console.log(dogs)
    var unmountDetail = useSelector(state => state.unmountDetail)
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [selectedFilter, setSelectedFilter] = useState('elegirUnFiltro')
    const [selectedSort, setSelectedSort] = useState('elegirSort')
    const [currentPage, setCurrentPage] = useState(1)
    const cardsPerPage = 8
    const firstCard = cardsPerPage * (currentPage - 1)
    const lastCard = (cardsPerPage * currentPage)
    const cards = dogs.slice(firstCard, lastCard)
    const numberOfPages = Math.ceil(dogs.length / cardsPerPage)
    
    useEffect(() => {
        if(!unmountDetail){
            dispatch(getDogs())
        }
        else{
            dispatch(setUnmountDetailFlag(false))
            dispatch(cleanDetail())
        }
    }, [dispatch])

    const clickShowAllBreeds = () => {
        dispatch(getDogs())
        setSearch('')
        setSelectedFilter('elegirUnFiltro')
        setSelectedSort('elegirSort')
    }


    return (
        <div>
            <SearchBar search={search} setSearch={setSearch} setCurrentPage={setCurrentPage} setSelectedFilter={setSelectedFilter} setSelectedSort={setSelectedSort}/>
            <Filter setCurrentPage={setCurrentPage} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} setSelectedSort={setSelectedSort}/>
            <Sort setCurrentPage={setCurrentPage} selectedSort={selectedSort} setSelectedSort={setSelectedSort}/>
            <div className="home-div"><button onClick={clickShowAllBreeds}>Show all breeds</button></div>
            <Pages currentPage={currentPage} setCurrentPage={setCurrentPage} numberOfPages={numberOfPages}/>
            <div className="home-all-cards">
                {(cards.length > 0 ) ?
                    cards.map(d => {
                        return <div className="home-card">
                            <Link to={`/dog/${d.id}`} className='home-link'><h1>{d.name}</h1>
                            {d.image? 
                                <img src={d.image} alt='' className="dog-image"/>
                            :
                                <img src={perro} alt="" className="dog-image"/>}</Link>
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
                            <div className="temperaments">{d.temperaments.length > 0 ? d.temperaments.map( temperament => {
                                return <h4>{temperament}</h4>
                                })
                            :
                                <h4>Their temperaments are not known</h4>
                            }</div>
                        </div>
                    })
                :
                <h2>No dog breeds found</h2>}
            </div>
        </div>
    )
}