import { useState } from "react"
import { useDispatch } from "react-redux"
import { searchDogs } from "../../actions"
import Sort from "../Sort/Sort"
import Filter from "../Filter/Filter"

export default function SearchBar(){
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()

    const onChange = (e) =>{
        e.preventDefault()
        setSearch(e.target.value)
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        dispatch(searchDogs(search))
        setSearch('')
    }

    return <div>
        <form onSubmit={onSubmit}>
            <input type='search' onChange={onChange} value={search}/>
            <input type='button' value='Search'/>
        </form>
        <Filter/>
        <Sort/>
    </div>
}