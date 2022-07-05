const { Router } = require('express');
// Importar todos los routers;
const {
  getDogs,
  getDogsSearch,
  getDogsId,
  getTemperament,
  postDog,
  getCreatedDogs
} = require('../functions/handlers.js')
const { Dog, Temper } = require('../db.js')


const router = Router();


// Configurar los routers

router.get("/dogs", getDogs)

router.get("/dogs/search", getDogsSearch)

router.get("/dogs/created", getCreatedDogs)

router.get("/dogs/:idDog", getDogsId)

router.get("/temperament", getTemperament)

router.post("/dog", postDog)



module.exports = router;
