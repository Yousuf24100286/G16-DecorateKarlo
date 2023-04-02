// import react from 'react';
import { Link } from "react-router-dom"
import { ShoppingCart } from "phosphor-react"
import { MagnifyingGlass } from "phosphor-react"
import { User } from "phosphor-react"
import './navbar.css'
export const navbar = () => {
    return (
        <div className='navbar'>
            <img src={require('./Logo/logo.jpg')} alt="logo" />
            <div className="links">
                <Link to='/search'>
                    <MagnifyingGlass size={32} />
                </Link>
                <Link to='/user'>
                    <User size={40} />
                </Link>
                <Link to='/cart'>
                    <ShoppingCart size={32} />
                </Link>
            </div>
        </div>
    )
}

export default navbar;

