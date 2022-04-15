const { Router } = require("express");
const {Dog, Temperament} = require('../db')
const axios = require('axios')
const {API_KEY} = process.env

const router = Router()

const getDogsFromDB = async () => {
    var dogsDB = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })
    //findAll devuelve un array de objetos. Lo que necesito está en la 
    //propiedad dataValues de cada uno de esos objetos
    dogsDB = dogsDB.map(d => {return d.dataValues})
    return dogsDB
}

const getDogsFromAPI = async () => {
    // axios devuelve un objeto. Lo que necesito está en la propiedad
    //data de ese objeto
    var {data} = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    return data
}

const mapeoDB = (d) => {
    const {dataValues} = d
    return {
        name: dataValues.name,
        minWeight: dataValues.minWeight,
        maxWeight: dataValues.maxWeight,
        temperaments: dataValues.temperaments,
    }
}

const mapeoAPI = (d) => {
    var {name} = d
    var weight = d.weight.metric
    var minWeight
    var maxWeight
    if(weight === 'NaN'){
        minWeight = "No se conoce su peso mínimo"
        maxWeight = "No se conoce su peso máximo"
    }
    else{
        minWeight = (weight.split(" ")[0] === 'NaN') ? 
        "No se conoce su peso mínimo" 
        : 
        weight.split(" ")[0]
        
        maxWeight = (weight.split(" ")[2] === 'NaN') ? 
        "No se conoce su peso máximo" 
        : 
        weight.split(" ")[2]
    }

    var temperaments = d.temperament? 
    d.temperament.split(", ") 
    : 
    "No se conoce su temperamento"

    var image = d.image.url

    return {
        name,
        minWeight,
        maxWeight,
        temperaments,
        image
    }
}

router.get('/dogs', async (req, res, next) =>{
    var dogsDB = await getDogsFromDB()
    var dogsAPI = await getDogsFromAPI()
    
    //filtro lo que voy a mostrar en Home
    dogsDB = dogsDB.map((d) => {
        return mapeoDB(d)
    })
    
    //filtro lo que voy a mostrar en Home
    dogsAPI = dogsAPI.map((d) => {
        return mapeoAPI(d)
    })
    var dogs = [...dogsAPI, ...dogsDB]
    var {name} = req.query
    if(name){
        dogs = dogs.filter((d) => {
            return d.name.toUpperCase().includes(name.toUpperCase())
        })
        if(dogs === []){
            dogs = 'No se encontraron razas de perro con ese nombre'
        }
    }

    res.send(dogs)
})

router.get('/dogs/:idRaza', async (req, res, next) => {
    var dogsDB = await getDogsFromDB()
    var dogsAPI = await getDogsFromAPI()
    var {idRaza} = req.params
    var dog = dogsDB.find((d) => {
        return d.id === idRaza})
    if(dog){
        res.send(dog)
    }
    else {
        dog = dogsAPI.find((d) => {return d.id === Number(idRaza)})
        if (dog){
            var aux = mapeoAPI(dog)
            var height = dog.height.metric
            if(height === 'NaN'){
                aux.minHeight = 'No tiene altura mínima'
                aux.maxHeight = 'No tiene altura máxima'
            }
            else{
                aux.minHeight = height.split(" ")[0] !== 'NaN'? 
                                    height.split(" ")[0]
                                    :
                                    'No tiene altura mínima'
                aux.maxHeight = height.split(" ")[2] !== 'NaN'? 
                                    height.split(" ")[2]
                                    :
                                    'No tiene altura mínima'
            }
            aux.minLifeSpan = dog.life_span.split(" ")[0]
            aux.maxLifeSpan = dog.life_span.split(" ")[2]
            res.send(aux)
        }
        else{
            res.send ('No se encontró ninguna raza de perro con ese id')
        }
    }
})

router.get('/temperaments', async (req, res, next) => {
    var temperaments = await Temperament.findAll({
        attributes: ['name']
    }
    )

    if(temperaments.length === 0){  
        var dogs = await getDogsFromAPI()
        var temperamentosRepetidos = []
        dogs.forEach(d => {
            if (d.temperament){
                temperamentosRepetidos = temperamentosRepetidos.concat(
                    d.temperament.split(", "))
            }
        })
        temperaments = new Set(temperamentosRepetidos)
        temperaments = [...temperaments].map(t => {
            return {
                name: t
            }
        })
        await Temperament.bulkCreate(temperaments)
    }
    res.send(temperaments)
})


module.exports = router