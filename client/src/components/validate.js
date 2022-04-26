export const validate = (state) => {

    let errors = {        
        name: false,
        minWeight: false,
        maxWeight: false,
        minHeight: false,
        maxHeight: false,
        minLifeSpan: false,
        maxLifeSpan: false
    }

    if(!state.name){
        errors.name = 'Name is required'
    }

    else if (!/^[a-zA-Z ]+$/.test(state.name) ||
    state.name[0] === ' '){
        errors.name = 'nombre inválido'
    }

    var minWeight = Number(state.minWeight)
    var maxWeight = Number(state.maxWeight)
    var minHeight = Number(state.minHeight)
    var maxHeight = Number(state.maxHeight)
    var minLifeSpan = Number(state.minLifeSpan)
    var maxLifeSpan = Number(state.maxLifeSpan)
    console.log(minWeight === NaN)

    if(!state.minWeight) 
        errors.minWeight = 'Min weight is required'
    else if(!/^[0-9]+$/.test(state.minWeight) || (minWeight <= 0)) 
        errors.minWeight = 'debe ser un número mayor que cero'
    if(!state.maxWeight) 
        errors.maxWeight = 'Max weight is required'
    else if(!/^[0-9]+$/.test(state.maxWeight) || (maxWeight <= 0)) 
        errors.maxWeight = 'debe ser un número mayor que cero'
    if(!state.minHeight) 
        errors.minHeight = 'Min height is required'
    else if(!/^[0-9]+$/.test(state.minHeight) || (minHeight <= 0)) 
        errors.minHeight = 'debe ser un número mayor que cero'
    if(!state.maxHeight) 
        errors.maxHeight = 'Max height is required'
    else if(!/^[0-9]+$/.test(state.maxHeight) || (maxHeight <= 0)) 
        errors.maxHeight = 'debe ser un número mayor que cero'
    if(!state.minLifeSpan) 
        errors.minLifeSpan = 'Min life span is required'
    else if(!/^[0-9]+$/.test(state.minLifeSpan) || (minLifeSpan <= 0)) 
        errors.minLifeSpan = 'debe ser un número mayor que cero'
    if(!state.maxLifeSpan) 
        errors.maxLifeSpan = 'Max life span is required'
    else if(!/^[0-9]+$/.test(state.maxLifeSpan) || (maxLifeSpan <= 0)) 
        errors.maxLifeSpan = 'debe ser un número mayor que cero'

    console.log(errors)
    return errors
}