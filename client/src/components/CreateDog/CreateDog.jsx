import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTemperaments, createDog, getDogs } from "../../actions"
import {validate} from '../validate'

export default function CreateDog(){
    const temperaments = useSelector(state => state.temperaments)
    const [dog, setDog] = useState({
        name: "",
        minHeight: "",
        maxHeight: "",
        minWeight: "",
        maxWeight: "",
        minLifeSpan: "",
        maxLifeSpan: "",
        temperaments: []
    })
    const [errors, setErrors] = useState({})
    console.log(dog)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    const onChange = e =>{
        e.preventDefault()
        console.log(e)
        setDog({
            ...dog,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...errors,
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

    const onSubmit = async (e) => {
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
        <form onSubmit={onSubmit}>
            <div>
                <input
                required
                placeholder="Name"
                type='text'
                name="name"
                value={dog.name}
                onChange={onChange}/>
            </div>
            <div>
                <input
                required
                placeholder="Min weight"
                type='text'
                name="minWeight"
                value={dog.minWeight}
                onChange={onChange}/>
            </div>
            <div>
                <input
                required
                placeholder="Max weight"
                type='text'
                name="maxWeight"
                value={dog.maxWeight}
                onChange={onChange}/>
            </div>
            <div>
                <input
                required
                placeholder="Min height"
                type='text'
                name="minHeight"
                value={dog.minHeight}
                onChange={onChange}/>
            </div>
            <div>
                <input
                required
                placeholder="Max height"
                type='text'
                name="maxHeight"
                value={dog.maxHeight}
                onChange={onChange}/>
            </div>
            <div>
                <input
                required
                placeholder="Min life span"
                type='text'
                name="minLifeSpan"
                value={dog.minLifeSpan}
                onChange={onChange}/>
            </div>
            <div>
                <input
                required
                placeholder="Max life span"
                type='text'
                name="maxLifeSpan"
                value={dog.maxLifeSpan}
                onChange={onChange}/>
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