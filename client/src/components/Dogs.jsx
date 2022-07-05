import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { setMult, setSelectVisibility } from "../redux/actions/actions"
import Dog from "./Dog"
import './Dogs.css'
import Filter from "./Filter"

export default function Dogs(props) {

    const dispatch = useDispatch()
    const history = useHistory()
    const dogs = useSelector((state) => state.dogs)
    const portions = useSelector((state) => state.portions)
    const xPage = useSelector((state) => state.xPage)
    const mult = useSelector((state) => state.mult)
    const donFound = useSelector(state => state.dontFound)
    const [showDogs, setShowDogs] = useState([])
    const [btns, setBtns] = useState([])

    function btnMaker(porciones){
        return new Promise(function(res, rej){
           let arr = []
           for(let i=1; i<=porciones; i++){
               arr.push(i)
           }
           res(arr)
        })
    }  

    useEffect(() => {
        setShowDogs(dogs.slice(8 * mult - 8, 8 * mult))

        dispatch(setSelectVisibility("show"))
        
        return () => dispatch(setSelectVisibility("hide"))
    }, [])


    useEffect(() => {
        setShowDogs(dogs.slice(8 * mult - 8, 8 * mult))
        btnMaker(portions).then(arr=> setBtns(arr))
    }, [dogs])

    useEffect(() => {
        if (donFound) {
            history.push("/dogs/dont_found/404")
        }
    }, [donFound])

    useEffect(() => {
        setShowDogs(dogs.slice(8 * mult - 8, 8 * mult))
    }, [mult])

    function handleClick(direct) {
        dispatch(setMult(direct))

    }

    function portionSelector(porc){
        dispatch(setMult(porc))
    }

    // useEffect(()=>{
    //     for(let i=1; i<=portions;i++){
    //        botton.push(i)
    //     }
    // },[portions])

    


    return <div className="dogsContainer">
        <hr />
        <Filter />
        <hr />
        <div className="listContainer">
            {dogs[0] != "no hay" && dogs[0] !== "sin creacion"?
                <ul className="dogs">
                    {showDogs.length ? showDogs.map(dog => <li className="liDog" key={dog.id}><Dog
                        id={dog.id}
                        name={dog.name}
                        img={dog.img}
                        tempers={dog.tempers}
                        weight={dog.weight} /></li>) : <h2>Cargando...</h2>}
                </ul> : dogs[0] === "sin creacion" ? 
                <h2>No hay perros creados aun</h2>:
                <h2>Ningun perro de su busqueda tiene este temperamento</h2>}
        </div>
        <hr />
        <button className={`paginate ${mult === portions || showDogs.length < xPage || dogs.length <= xPage ? "hide" : "show"}`} onClick={() => handleClick("sig")}>sig</button>
        {btns.map(btn=> <button className={`paginateSelectors ${mult===btn? "current" : ""}`} onClick={()=>portionSelector(btn)} key={btn} >{btn}</button>)}
        <button className={`paginate ${mult === 1 ? "hide" : "show"}`} onClick={() => handleClick("prev")}>prev</button>

    </div>

}


