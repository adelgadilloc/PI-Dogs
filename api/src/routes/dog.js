const { Router } = require("express");
const {Dog, Temperament} = require('../db')
const axios = require('axios')
const {API_KEY} = process.env

const RAZA_DE_PERRO_CREADA = 'Raza de perro creada'
const NO_SE_CREO_RAZA_DE_PERRO = 'No se pudo crear la raza de perro'

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
    console.log(dogsDB)
    //findAll devuelve un array de objetos. Lo que necesito está en la 
    //propiedad dataValues de cada uno de esos objetos
    dogsDB = dogsDB.map(d => {
        const {
            id,
            name,
            minWeight,
            maxWeight,
            minHeight,
            maxHeight,
            minLifeSpan,
            maxLifeSpan} = d.dataValues
        
        var {temperaments} = d.dataValues
        temperaments = temperaments.map(t => {
            return t.name
        })
        return {
            id,
            name,
            minWeight,
            maxWeight,
            minHeight,
            maxHeight,
            minLifeSpan,
            maxLifeSpan,
            temperaments,
            isCreated: true
        }
    })
    return dogsDB
}

const getDogsFromAPI = async () => {
    // axios devuelve un objeto. Lo que necesito está en la propiedad
    //data de ese objeto
    var {data} = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    data = data.map(d => {
        var {id} = d
        var {name} = d
        var weight = d.weight.metric
        var minWeight
        var maxWeight
        if(weight === 'NaN'){
            minWeight = null
            maxWeight = null
        }
        else{
            minWeight = (weight.split(" ")[0] === 'NaN') ? 
            null 
            : 
            Number(weight.split(" ")[0])
            
            maxWeight = (weight.split(" ")[2] === 'NaN') ? 
            null 
            : 
            Number(weight.split(" ")[2])
        }
        
        var height = d.height.metric
        var minHeight
        var maxHeight
        if(height === 'NaN'){
            minHeight = null
            maxHeight = null
        }
        else{
            minHeight = height.split(" ")[0] !== 'NaN'? 
                                Number(height.split(" ")[0])
                                :
                                null
            maxHeight = height.split(" ")[2] !== 'NaN'? 
                                Number(height.split(" ")[2])
                                :
                                null
        }
        var minLifeSpan = Number(d.life_span.split(" ")[0])
        var maxLifeSpan = Number(d.life_span.split(" ")[2])
        var temperaments = d.temperament? 
        d.temperament.split(", ") 
        : 
        []
        var image = d.image.url
        
        return {
            id,
            name,
            minWeight,
            maxWeight,
            minHeight,
            maxHeight,
            minLifeSpan,
            maxLifeSpan,
            temperaments,
            image,
            isCreated: false
        }
    })
    return data
}



router.get('/dogs', async (req, res, next) =>{
    var dogsDB = await getDogsFromDB()
    var dogsAPI = await getDogsFromAPI()
    var dogs = [...dogsDB, ...dogsAPI]
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
            res.send(dog)
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
    temperaments = temperaments.map(t => {
        return t.dataValues.name
    })

    if(temperaments.length === 0){  
        var dogs = await getDogsFromAPI()
        var temperamentosRepetidos = []
        dogs.forEach(dog => {
            temperamentosRepetidos = temperamentosRepetidos.concat(
                dog.temperaments)
        })
        temperaments = [...(new Set(temperamentosRepetidos))]
        await Temperament.bulkCreate(temperaments.map(t => {
            return {
                name: t
            }
        }))
    }
    res.send(temperaments)
})

router.post('/dog', async (req, res, next) => {
    const {
        name,
        minHeight,
        maxHeight,
        minWeight,
        maxWeight,
        minLifeSpan,
        maxLifeSpan,
        temperaments
    } = req.body

    try{
        var dog = await Dog.create({
            name,
            minHeight,
            maxHeight,
            minWeight,
            maxWeight,
            minLifeSpan,
            maxLifeSpan
        })
    } catch (e){
        res.send(NO_SE_CREO_RAZA_DE_PERRO)
    }
    
    temperaments.forEach(async t => {
        var temperament = await Temperament.findOne({
            where:{
                name: t
            }
        })
        if(temperament){
            dog.setTemperaments(temperament.id)
        }
    })

    res.send(RAZA_DE_PERRO_CREADA)
})

module.exports = router