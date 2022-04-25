import { Link, Outlet } from "react-router-dom";
import './Nav.css'

export default function Nav (){
    return (
        <nav>
            <ul className="ul">
                <li><Link to='/home' className="link">Home</Link></li>
                <li><Link to='/create' className="link">Create dog breed</Link></li>
            </ul>
            <Outlet/>
        </nav>
    )
}