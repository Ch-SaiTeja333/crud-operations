import React from 'react'
import { Link, Outlet } from 'react-router'
function Header() {
  return (
    <div>
      <nav className='nav justify-content-evenly'>
          <li className='nav-item'>
            <Link className='nav-link' to="createuser">Add-User</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to="read">Read</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to="update">Update</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to="delete">Delete</Link>
          </li>
      </nav>
    </div>
  )
}

export default Header
