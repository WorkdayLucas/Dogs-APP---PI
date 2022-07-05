const {
    fetchToApi,
    fetchToDB,
    ApiDbCombiner,
    getDogsByWord,
    finderDogWithId,
    getTempersDb,
    postDog,
} = require('./peticiones.js')

module.exports = {

    getDogs: async function (req, res) {

        try {
            const dogs = await ApiDbCombiner(fetchToApi, fetchToDB)
            res.status(200).send(dogs.allDogs)
        } catch (error) {

            res.status(404).send(err)
        }

    },

    getDogsSearch: async (req, res) => {
        try {
            const { name } = req.query,
            allDogs = await ApiDbCombiner(fetchToApi, fetchToDB),
            dogs = await getDogsByWord(name, allDogs.allDogs)

           
            if(!dogs.length){
                return res.status(200).json([{msg: `${name} no coincide con ninguna raza`}])
            }

            res.status(200).send(dogs)

        } catch (err) {

            res.status(404).send(err)
        }
    },

    getDogsId: async function (req, res) {

        try {
            const { idDog } = req.params
            let dog
            
            const dogs = await ApiDbCombiner(fetchToApi, fetchToDB)
            dog = await finderDogWithId(idDog, dogs.allDogs)
            if (dog) return res.status(200).send(dog)


            return res.status(404).json({ msg: "id no existe" })


        } catch (err) {

            res.status(404).json(err)
        }
    },

    getTemperament: async function (req, res) {

        try {

            const tempers = await getTempersDb()
            console.log(tempers)
            res.status(200).json(tempers)
        } catch (error) {
          
            res.status(404).json(error)
        }
    },

    postDog: async (req, res) => {
        const { name, height, weight, lifeSpan, tempers, img } = req.body

        try {

            res.status(201).send({ msg: await postDog(name, height, weight, lifeSpan, tempers, img, fetchToApi) })

        } catch (err) {
            
            res.status(404).json(error)
        }

    },

    getCreatedDogs: async(req, res) => {
        try {
            const DbDogs = await ApiDbCombiner(fetchToApi, fetchToDB)
            res.status(200).send(DbDogs.created)
        } catch (error) {
            return res.status(404).json(error)
        }
    }


}