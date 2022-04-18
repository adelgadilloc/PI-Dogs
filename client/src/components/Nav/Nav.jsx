import { Link, Outlet } from "react-router-dom";

export default function Nav (){
    return (
        <nav>
            <ul>
                <li><Link to='/home'>Home</Link></li>
                <li><Link to='/create'>Create dog breed</Link></li>
            </ul>
            <Outlet/>
        </nav>
    )
}