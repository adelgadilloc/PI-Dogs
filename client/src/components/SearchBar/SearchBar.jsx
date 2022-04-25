import { useState } from "react"
import { useDispatch } from "react-redux"
import { searchDogs } from "../../actions"
import './SearchBar.css'

export default function SearchBar({setCurrentPage}){
    const [search, setSearch] = useState('')
    console.log(search)
    const dispatch = useDispatch()

    const onChange = (e) =>{
        e.preventDefault()
        setSearch(e.target.value)
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        dispatch(searchDogs(search))
        setSearch('')
        setCurrentPage(1)
    }

    return <div>
        <form onSubmit={onSubmit}>
            <input type='search' onChange={onChange} value={search}/>
            <input type='submit' value='Search'/>
        </form>
    </div>
}