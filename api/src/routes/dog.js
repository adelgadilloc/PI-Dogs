const { Router } = require("express");
const {Dog, Temperament} = require('../db')
const axios = require('axios')
const {API_KEY} = process.env

const router = Router()

router.get('/dogs', async (req, res, next) => {
    var dogsDB = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })
    //filtro lo que voy a mostrar en Home
    dogsDB = dogsDB.map((d) => {
        const {dataValues} = d
        return {
            name: dataValues.name,
            minWeight: dataValues.minWeight,
            maxWeight: dataValues.maxWeight,
            temperaments: dataValues.temperaments
        }
    })
    var dogsAPI = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    dogsAPI = dogsAPI.data
    //filtro lo que voy a mostrar en Home
    dogsAPI = dogsAPI.map((d) => {
        if(!d.temperament) console.log(d)
        if(d.weight.metric.includes('NaN')) console.log(d)
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
    })
    res.send([...dogsAPI, ...dogsDB])
})


module.exports = router