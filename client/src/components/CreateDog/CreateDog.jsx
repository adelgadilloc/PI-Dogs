import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTemperaments, createDog, getDogs } from "../../actions"
import {validate} from '../validate'
import './CreateDog.css'

export default function CreateDog(){
    const temperaments = useSelector(state => state.temperaments)
    const [dog, setDog] = useState({
        name: "",
        minWeight: "",
        maxWeight: "",
        minHeight: "",
        maxHeight: "",
        minLifeSpan: "",
        maxLifeSpan: "",
        temperaments: []
    })
    const [errors, setErrors] = useState({
        name: 'Name is required',
        minWeight: 'Min weight is required',
        maxWeight: 'Max weight is required',
        minHeight: 'Min height is required',
        maxHeight: 'Max height is required',
        minLifeSpan: 'Min life span is required',
        maxLifeSpan: 'Max life span is required'
    })
    console.log(dog)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    const formChange = e =>{
        e.preventDefault()
        console.log(e.target.name)
        setDog({
            ...dog,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...dog,
            [e.target.name]: e.target.value
        }))
    }

    const deleteTemperament = (e) => {
        e.preventDefault()
        console.log(e)
        setDog({
            ...dog,
            temperaments: dog.temperaments.filter(t => {
                return t !== e.target.value
            })
        })
    }
    
    const selectTemperament = (e) => {
        e.preventDefault()
        setDog({
            ...dog,
            temperaments: dog.temperaments.includes(e.target.value) ? [...dog.temperaments] : [...dog.temperaments, e.target.value]
        })
    }

    const formSubmit = async (e) => {
        console.log(e)
        e.preventDefault()
        dispatch(createDog(dog))
        alert("Dog breed created")
        setDog({
            name: "",
            minWeight: "",
            maxWeight: "",
            minHeight: "",
            maxHeight: "",
            minLifeSpan: "",
            maxLifeSpan: "",
            temperaments: []
        })
    }


    return <div>
        <h1>Create breed</h1>
        <form onSubmit={formSubmit}>
            <div className="CreateDog-div">
                <label className="CreateDog-label">Name</label>
                <input
                className="CreateDog-input"
                required
                placeholder="Name"
                type='text'
                name="name"
                value={dog.name}
                onChange={formChange}/>
                {errors.name && <span className="CreateDog-span">{errors.name}</span>}
            </div>
            <div className="CreateDog-div">
                <label className="CreateDog-label">Min weight </label>
                <input
                className="CreateDog-input"
                required
                placeholder="Min weight"
                type='text'
                name="minWeight"
                value={dog.minWeight}
                onChange={formChange}/>
                {errors.minWeight && <span className="CreateDog-span">{errors.minWeight}</span>}
            </div>
            <div className="CreateDog-div">
                <label className="CreateDog-label">Max weight </label>
                <input
                className="CreateDog-input"
                required
                placeholder="Max weight"
                type='text'
                name="maxWeight"
                value={dog.maxWeight}
                onChange={formChange}/>
                {errors.maxWeight && <span className="CreateDog-span">{errors.maxWeight}</span>}
            </div>
            <div className="CreateDog-div">
                <label className="CreateDog-label">Min height  </label>
                <input
                className="CreateDog-input"
                required
                placeholder="Min height"
                type='text'
                name="minHeight"
                value={dog.minHeight}
                onChange={formChange}/>
                {errors.minHeight && <span className="CreateDog-span">{errors.minHeight}</span>}
            </div>
            <div className="CreateDog-div">
                <label className="CreateDog-label">Max height </label>
                <input
                className="CreateDog-input"
                required
                placeholder="Max height"
                type='text'
                name="maxHeight"
                value={dog.maxHeight}
                onChange={formChange}/>
                {errors.maxHeight && <span className="CreateDog-span">{errors.maxHeight}</span>}
            </div>
            <div className="CreateDog-div">
                <label className="CreateDog-label">Min life span </label>
                <input
                className="CreateDog-input"
                required
                placeholder="Min life span"
                type='text'
                name="minLifeSpan"
                value={dog.minLifeSpan}
                onChange={formChange}/>
                {errors.minLifeSpan && <span className="CreateDog-span">{errors.minLifeSpan}</span>}
            </div>
            <div className="CreateDog-div">
                <label className="CreateDog-label">Max life span </label>
                <input
                className="CreateDog-input"
                required
                placeholder="Max life span"
                type='text'
                name="maxLifeSpan"
                value={dog.maxLifeSpan}
                onChange={formChange}/>
                {errors.maxLifeSpan && <span className="CreateDog-span">{errors.maxLifeSpan}</span>}
            </div>
            <div>
                <select defaultValue='selectTemperament' onChange={selectTemperament}>
                    <option disabled value='selectTemperament'>Select temperaments</option>
                    <optgroup>
                        {temperaments.map(t => {
                            return <option value={t}>{t}</option>
                        })}
                    </optgroup>
                </select>
            </div>
            <div>
                <ul>
                    {dog.temperaments.map(t => {
                        return <li key={t}>
                            {t}<button value={t} onClick={deleteTemperament}>x</button>
                        </li>
                    })}
                </ul>
            </div>
            <div>
                <button type='submit' disabled={errors.name
                    || errors.minWeight
                    || errors.maxWeight
                    || errors.minHeight
                    || errors.maxHeight
                    || errors.minLifeSpan
                    || errors.maxLifeSpan}>Create</button>
            </div>
        </form>
    </div>
}