import { useState } from "react"
import { blockGetDogs, getDogsByQuery, setMult, resetFilt } from '../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import './SearchBar.css'
import { useHistory } from "react-router-dom";

export default function SearchBar(props) {
    const dispatch = useDispatch()
    const [input, setInput] = useState("")
    const history = useHistory()
    const hideNavOpt = useSelector(state=> state.hideNavOpt)

    function handleChange(e) {
        setInput(e.target.value)
    }

    function onSearch(name) {
        try {
            if (input !== "") {
                dispatch(getDogsByQuery(name))
                dispatch(resetFilt())
                dispatch(setMult("reset"))
                if (history.location.pathname !== "/dogs/home") {
                    dispatch(blockGetDogs("on"))
                    history.push("/dogs/home")
                }
                setInput("")
            }
        } catch (error) {
            console.log("ERROR")
        }

    }

    return <div>
        <input className={`searcher ${hideNavOpt? "hide" : "show"} `} type="text" onChange={(e) => handleChange(e)} name="search" value={input} placeholder="Search..." />
        <button className={`searcherButton ${hideNavOpt? "hide" : "show"}`} onClick={() => onSearch(input)} >Buscar</button>


    </div>
}







// , orderDogs, filterDogsByTempers      , useSelector

// const tempers = useSelector(state => state.tempers)
// const selectsClass = useSelector(state => state.selectsClass)

// function orderOnChange(e) {
//     dispatch(orderDogs(e.target.value))
//     dispatch(setMult("reset"))
// }

// function filterOnChange(e) {
//     dispatch(filterDogsByTempers(e.target.value))
//     dispatch(setMult("reset"))
// }


// <select className={selectsClass} onChange={(e) => orderOnChange(e)}>
//             <option value="A-Z">A-Z</option>
//             <option value="Z-A">Z-A</option>
//             <option value="LowerWeight">Light</option>
//             <option value="UperWeight">Heavy</option>
//         </select>
//         <select className={selectsClass} onChange={(e) => filterOnChange(e)}>
//             {tempers.map(temper => <option value={temper.name} key={temper.id}>{temper.name}</option>)}
//         </select>