import { useHistory } from 'react-router-dom'
import dogs from '../images/Dogs Land.jpg'
import { useDispatch } from "react-redux"
import { setNavVisibility } from "../redux/actions/actions"
import './Landing.css'
import { useEffect } from 'react'

export default function Landing(props) {
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(setNavVisibility("hide"))

        return ()=> dispatch(setNavVisibility("show"))
    },[])

    return <div className='landContainer'>

        <h1>Bienvenido a Dogs-App</h1>
       
        <button className="in" type='button' onClick={() => { history.push("/dogs/home") }}>Conocer a los perros...</button>
        <img className='dogsImg' src={dogs} />
    </div>

}