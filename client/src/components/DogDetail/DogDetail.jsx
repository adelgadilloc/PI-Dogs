import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getDetail, cleanDetail } from "../../actions"

export default function DogDetail(){
    const {id} = useParams()
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getDetail(id))
        return dispatch(cleanDetail())
    }, [dispatch, id])

    const detail = useSelector(state => state.detail)
    const {
        name,
        image,
        minWeight,
        maxWeight,
        temperaments,
        minHeight,
        maxHeight,
        minLifeSpan,
        maxLifeSpan} = detail

    return (
        Object.entries(detail).length === 0 ?
            <h4>Loading</h4>
            :
            <div>
                <h1>{name}</h1>
                {image && <img src={image} alt=''/>}
                {minWeight && maxWeight ?
                    (minWeight === maxWeight) ?
                        <h3>Weighs aproximately {minWeight} kg</h3>
                    : 
                        <h3>Weighs aproximately between {minWeight} and {maxWeight} kg</h3>
                :
                    (minWeight || maxWeight) ?
                        <h3>Weighs aproximately {minWeight || maxWeight} kg</h3>
                    :
                        <h3>Their weight is not known</h3>}
                {minHeight && maxHeight ?
                    (minHeight === maxHeight) ?
                        <h3>Height: aproximately {minHeight} cm</h3>
                    : 
                        <h3>Height: aproximately between {minHeight} and {maxHeight} cm</h3>
                :
                    (minHeight || maxHeight) ?
                        <h3>Height: aproximately {minHeight || maxHeight} cm</h3>
                    :
                        <h3>Their height is not known</h3>}
                <h3>Their life span is {minLifeSpan} to {maxLifeSpan} years</h3>
                <h3>Temperaments of this breed:</h3>
                {temperaments.length > 0 ? temperaments.map( temperament => {
                    return <h4>{temperament}</h4>
                    })
                :
                    <h4>Their temperaments are not known</h4>
                }
            </div>
    )
}