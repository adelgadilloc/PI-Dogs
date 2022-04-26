import { useDispatch } from "react-redux"
import { sort } from "../../actions"
import { ASC, DESC, ASC_WEIGHT, DESC_WEIGHT } from "../../constantes/constantes"
import './Sort.css'

export default function Sort ({setCurrentPage, selectedSort, setSelectedSort}){
    console.log('sort')
    const dispatch = useDispatch()

    const onChange = (e) => {
        e.preventDefault()
        dispatch(sort(e.target.value))
        setCurrentPage(1)
        setSelectedSort(e.target.value)
    }

    return (
        <div className="Sort-div">
            {/* <label>Sort: </label> */}
            <select onChange={onChange} value={selectedSort}>
                <option disabled value='elegirSort'>-Sort-</option>
                <option disabled></option>
                <optgroup label="Alphabetical order">
                    <option value={ASC}>A-Z</option>
                    <option value={DESC}>Z-A</option>
                </optgroup>
                <option disabled></option>
                <optgroup label='Weight'>
                    <option value={ASC_WEIGHT}>Lightest first</option>
                    <option value={DESC_WEIGHT}>Heaviest first</option>
                </optgroup>
            </select>
        </div>
    )
}