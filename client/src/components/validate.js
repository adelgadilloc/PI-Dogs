export const validate = (state) => {

    let errors = {}

    if(!state.name){
        errors.name = 'name is required'
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

    if(!minWeight) errors.minWeight = 'Min weight is required'
    else if(minWeight <= 0) errors.minWeight = 'debe ser un número mayor que cero'
    if(!maxWeight) errors.MaxWeight = 'Max weight is required'
    else if(maxWeight <= 0) errors.maxWeight = 'debe ser un número mayor que cero'
    if(!minHeight) errors.minHeight = 'Min height is required'
    else if(minHeight <= 0) errors.minHeight = 'debe ser un número mayor que cero'
    if(!maxHeight) errors.maxHeight = 'Max height is required'
    else if(maxHeight <= 0) errors.maxHeight = 'debe ser un número mayor que cero'
    if(!minLifeSpan) errors.minLifeSpan = 'Min life span is required'
    else if(minLifeSpan <= 0) errors.minLifeSpan = 'debe ser un número mayor que cero'
    if(!maxLifeSpan) errors.minWeight = 'Max life span is required'
    else if(maxLifeSpan <= 0) errors.maxLifeSpan = 'debe ser un número mayor que cero'

    return errors
}