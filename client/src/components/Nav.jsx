import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { getTempers } from '../redux/actions/actions.js'
import { useEffect } from 'react';
import img from '../images/dog.png';
import './Nav.css'



export default function Nav(props) {

    const dispatch = useDispatch()
    const hideNavOpt = useSelector(state=> state.hideNavOpt)

    useEffect(() => {
        dispatch(getTempers())
    }, [])

    return <nav className="nav">
        <div className='iconTitle'>
            <img src={img} alt="Dogs" width={"50px"} />
            <h4>Dogs</h4>
        </div>
        <SearchBar {...props} />
        <ul className={`navList ${hideNavOpt? "hide" : "show"} `}>
            <li className='liNav' ><Link to="/dogs/home">Home</Link></li>
            <li className='liNav' ><Link to="/dogs/create_dogs">Create Dog</Link></li>
        </ul>
    </nav>
}