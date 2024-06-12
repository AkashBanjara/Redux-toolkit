import React from 'react'
import { Link } from 'react-router-dom'
import { CiShoppingCart } from "react-icons/ci";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const items = useSelector((state)=> state.cart);
  
  return (
    <div className='flex items-center justify-between  bg-gradient-to-r from-teal-400 to-yellow-200 p-2  sm:text-xl sticky '>
        <span className='logo text-base sm:text-2xl'>Redux Store</span>
        <div className='flex gap-2 md:gap-5 lg:gap-12 items-center '>
            <Link to="/" >Home</Link>
            <Link to="/cart" >Cart</Link>
            <span className='cartCount flex text-sm'><CiShoppingCart size={26}  /> {items.length}</span>
        </div>
    </div>
  )
}

export default Navbar