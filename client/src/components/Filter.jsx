import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, setMult, orderDogs, filterDogsByTempers, getCreatedDogs, filtDogsByWeigths } from '../redux/actions/actions';
import './Filter.css'

function Filter() {

    const dispatch = useDispatch()
    const tempers = useSelector(state => state.tempers)
    const selectsClass = useSelector(state => state.selectsClass)
    const [weights, setWeigths] = useState(["all weights"])
    const weightOptionsFilterVision = useSelector(state=> state.weightOptionsFilterVision)
    const resetFilter = useSelector(state=> state.resetFilter)

    useEffect(()=>{},[weightOptionsFilterVision])

    useEffect(()=>{
        console.log("actualiza")
    },[resetFilter])

   
    function weightFilterMaker(limites){
        return new Promise(function(res, rej){
           let arr = []
           for(let i=1; i<=limites; i++){
               arr.push(i)
           }
           res(arr)
        })
    }

    function orderOnChange(e) {
        dispatch(orderDogs(e.target.value))
        dispatch(setMult("reset"))
    }

    function filterOnChange(e) {
        dispatch(filterDogsByTempers(e.target.value))
        dispatch(setMult("reset"))
    }

    function getAllDogs() {
        dispatch(getDogs())
        dispatch(setMult("reset"))
    }

    function weightOnChange(e) {
        dispatch(filtDogsByWeigths(e.target.value))
        dispatch(setMult("reset"))
    }

    

    useEffect(()=>{
        weightFilterMaker(100).then(result => setWeigths([...weights,...result]))
    },[])

    return (
        <div className='setsContainers'>
            <button className="allButton"onClick={getAllDogs}>Todo</button>
            <button className="createdButton" onClick={()=>{dispatch(getCreatedDogs()); dispatch(setMult("reset"))}}>Creados</button>
            <select className="selectsClass" onChange={(e) => orderOnChange(e)}>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option className={`${weightOptionsFilterVision}`} value="LowerWeight">Light</option>
                <option className={`${weightOptionsFilterVision}`} value="UperWeight">Heavy</option>
            </select>
            <select autoFocus="autoFocus" className="selectsClass" onChange={(e) => filterOnChange(e)}>
                {tempers.map(temper => <option value={temper.name} key={temper.id}>{temper.name}</option>)}
            </select>
            <select id="weightFilter" autoFocus="autoFocus" className="selectsClass" onChange={(e) => weightOnChange(e)} >
                {weights.map(weight => <option id={`selectsOption${weight}`} value={weight} key={weight}>{weight} lb.</option>)}
            </select>
        </div>
    )
}

export default Filter 