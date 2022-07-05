const axios = require("axios");
const API_KEY = process.env;
const { Dog, Temper } = require('../db.js')
let id = 1, apiLength;



module.exports = {

    // Trae todos los datos de la api.
    fetchToApi: async function () {

        try {
            const apiData = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
            let dogs;
            apiLength = apiData.data.length
            dogs = apiData.data.map(dog =>{
              return  ({
                    id: id++,
                    name: dog.name,
                    height: dog.height.metric,
                    weight: dog.weight.imperial,
                    vida: dog.life_span,
                    tempers: dog.temperament,
                    img: dog.image.url
                })
            } )
            id = 1
            return dogs



        } catch (error) {
            return error
        }
    },

    // Trae todos los datos de la Base de Datos.
    fetchToDB: async function () {
        try {
            let incremental = 0
            var dogs = await Dog.findAll({ include: Temper })
            dogs = dogs.map(dog => {
                let tempers = dog.tempers.map(temper => temper.dataValues.name)
                incremental++
                return {
                    id: apiLength + incremental,
                    name: dog.name,
                    height: dog.height,
                    weight: dog.weight,
                    vida: dog.vida,
                    tempers: tempers.join(", "),
                    img: dog.img
                }
            });
            return dogs

        } catch (error) {
            return error
        }
    },

    // Combina los datos traidos de Api y Base de Datos
    ApiDbCombiner: async function (ApiCb, DbCb) {

        try {

            const ApiDogs = await ApiCb();
            const DbDogs = await DbCb();
            return {allDogs:ApiDogs.concat(DbDogs),created:DbDogs}

        } catch (err) {
            return err
        }
    },

    // Trae todos los perros de la Base de Datos y Api, luego los filtra segun el parametro recibido.
    getDogsByWord: async function (word, dogs) {

        try {

            dogs = await dogs.filter(dog => dog.name.toLowerCase().includes(word.toLowerCase().trim()));
            return dogs

        } catch (err) {
            console.log(err)
            return err
        }

    },

    // Recibe un funcion que trae los perros de algun sitio y luego encuentra el perro segun el Id recibido
    finderDogWithId: async function (idDog, dogs) {

        try {

            
            let dog = await dogs.find(dog => dog.id === Number(idDog))
            return dog

        } catch (error) {
            return error
        }
    },

    // Trae todos los Temperamentos de la Api y los Carga en la Base de Datos.
    getTempersApi: async function () {

        try {

            let toLoadTempers = []
            let arrTempers;
            let dogs = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
            let tempersDb = await Temper.findAll()
            tempersDb = await tempersDb.map(e => e.dataValues.name)

            dogs.data.forEach(dog => {
                if (dog.temperament) {
                    arrTempers = dog.temperament.split(", ")
                    arrTempers.forEach(temper => {
                        if (!tempersDb.includes(temper)) {
                            if (!toLoadTempers.includes(temper)) toLoadTempers.push(temper)
                        }

                    })
                }
            });


            toLoadTempers.sort().forEach(temper => {
                Temper.create({ name: temper })

            })


        } catch (err) {
            return err
        }

    },

    // Trae todos los temperamentos de la Base de Datos
    getTempersDb: async function () {

        try {
            let tempers = await Temper.findAll()
            return tempers
        } catch (err) {
            return err
        }
    },

    // Crea un perro, lo guarda en la base de datos y la relacion de temperamentos
    // Verifica que el nombre del perro a crear no exista en la api
    // Por defecto no se creara si existe en la Base de Datos 
    postDog: async function (name, height, weight, lifeSpan, tempers, img, getApiDogs) {

        try {

            let msg;
            let existingDogs = await getApiDogs()
            console.log(existingDogs[0])
            existingDogs.forEach(dog => {
                console.log(dog.name)
                if (dog.name == name) {
                    msg = `Ya existe la raza ${name}.`
                }
            })

            if (!msg) {
                const dog = await Dog.create({
                    name,
                    height,
                    weight,
                    vida: lifeSpan,
                    img
                })

                let tempersDb = await Temper.findAll({
                    where: {
                        name: tempers
                    }
                })

                dog.addTemper(tempersDb)
                msg = `Raza ${name} creado con exito.`
            }

            return msg

        } catch (err) {
            console.log(err)
            return err.parent.detail.includes("Ya existe la llave") ? `Ya existe la raza ${name}.` : err
        }
    }


}
