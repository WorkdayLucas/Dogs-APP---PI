import { Link } from 'react-router-dom';
import './Dog.css'
import patita from '../images/patita.webp'

export default function Dog(props) {
    return <div className='dogCard'>
        <Link to={`/dogs/${props.id}`} >
            <div>
                <img className='imgDog' src={props.img} alt={props.name} />
                <div className='title'>
                <img className='icon' src={patita} alt={patita} />
                <h3>{props.name}</h3>
                </div>
                <p>Temperaments: {props.tempers}</p>
                <p className='weight' >Weight: {props.weight} lb.</p>

            </div>
        </Link>

    </div>
}