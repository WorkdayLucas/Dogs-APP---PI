import Dogs from "./Dogs";
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from "react";
import {getDogs, setMult, blockGetDogs} from '../redux/actions/actions.js'

export default function Home(props){

  const block = useSelector(state=> state.block)
    
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(setMult("reset"))
      if(!block){
        dispatch(getDogs())
        dispatch(blockGetDogs("off"))
      }

    },[])

    return <div>
        <Dogs/>
    </div> 
}