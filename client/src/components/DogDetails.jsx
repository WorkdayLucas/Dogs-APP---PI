import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getDogsById, clearDog, blockGetDogs, addFavorites } from '../redux/actions/actions.js'
import './DogDetails.css'

function DogDetails(props) {

    const history = useHistory()

    const dogs = useSelector(state=> state.dogs)

    useEffect(() => {
        props.getDogsById(props.match.params.id)
        if(dogs.length){
            props.blockGetDogs("on")
        }
        return () => props.clearDog()
    }, [])

    useEffect(() => {
        if (props.dog.length) {
            if (props.dog[0].hasOwnProperty("msg")) {
                history.push("/dogs/dont_found/404")
            }
        }
    }, [props.dog])



    return (
        <div className='detailContainer'>
            {console.log(props.dog)}
            {props.dog.length ? <>
                <img className='dogImg' src={props.dog[0].img} alt={props.dog[0].name} />
                <h1>{props.dog[0].name}</h1>
                <div className="interactions">
                    <button onClick={()=>props.addFavorites()}>💖</button>
                </div>
                <hr />
                <div className='dogInfo'>
                    <p>Temperaments: {props.dog[0].tempers}</p>
                    <p>Weight: {props.dog[0].weight} lb.</p>
                    <p>Height: {props.dog[0].height} cm.</p>
                    <p>Life span: {props.dog[0].vida} years.</p>
                </div>
            </> : <h2>Cargando...</h2>}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        dog: state.dogByID
    }
}

export default connect(mapStateToProps, { getDogsById, clearDog, blockGetDogs, addFavorites })(DogDetails)