import { useDispatch } from "react-redux"
import { sort } from "../../actions"
import { ASC, DESC, ASC_WEIGHT, DESC_WEIGHT } from "../../constantes/constantes"

export default function Sort (){
    const dispatch = useDispatch()

    const onChange = (e) => {
        e.preventDefault()
        dispatch(sort(e.target.value))
    }

    return (
        <div>
            <label>Sort: </label>
            <select onChange={onChange} defaultValue='sort'>
                <option disabled value='sort'>Sort</option>
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