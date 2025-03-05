import React, { useState } from 'react'
import "./Navbar.css"
import { Link, NavLink } from "react-router-dom";
import { SearchBar } from '../Searchbar/Searchbar';
import { FaShoppingCart } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav>
            <div className='menu' onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <Link to="/" className="title" >
                Shop Now
            </Link>
            <ul className={menuOpen ? "open" : ""}>
                <li>
                    <NavLink to="/shop">Shop</NavLink>
                </li>
                <li>
                    <NavLink to="/sales">Sales</NavLink>
                </li>
                <li>
                    <NavLink to="/contact">Contact</NavLink>
                </li>
            </ul>
            <div className="search-bar">
                <SearchBar />
            </div>
            <div className='icon-group'>
                <NavLink to="/cart"><FaShoppingCart /></NavLink>
                <NavLink to="/user"><BsPersonCircle /></NavLink>
            </div>
        </nav>
    )
}

export default Navbar