import landing from '../../image/landing.png'
import {Link} from 'react-router-dom'

export default function Landing() {
    return (
        <div className="Landing">
            <img src={landing} alt="" className="landing-image"/>
            <Link to='/home' className="landing-boton">Start</Link>
        </div>
    )
}