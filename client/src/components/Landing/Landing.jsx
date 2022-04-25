import {Link} from 'react-router-dom'
import './Landing.css'

export default function Landing() {
    return (
        <div className="Landing">
            <h1 className='landing-h1'>Learn about all dog breeds!</h1>
            <Link to='/home' className="landing-boton">Start</Link>
        </div>
    )
}