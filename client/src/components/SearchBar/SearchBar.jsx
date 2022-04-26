import { useState } from "react"
import { useDispatch } from "react-redux"
import { searchDogs } from "../../actions"
import './SearchBar.css'

export default function SearchBar({search, setSearch, setCurrentPage, setSelectedFilter, setSelectedSort}){
    console.log(search)
    const dispatch = useDispatch()

    const changeSearchBar = (e) =>{
        e.preventDefault()
        setSearch(e.target.value)
    }

    const submitSearchBar = (e) =>{
        e.preventDefault()
        dispatch(searchDogs(search))
        setSelectedFilter('elegirUnFiltro')
        setSelectedSort('elegirSort')
        setCurrentPage(1)
    }

    return <form onSubmit={submitSearchBar} className='SearchBar-form'>
            <input type='search' onChange={changeSearchBar} value={search}/>
            <input type='submit' value='Search'/>
        </form>
}