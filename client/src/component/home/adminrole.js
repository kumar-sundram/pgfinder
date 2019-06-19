import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
    return (
        <>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                </li>
            </ul>
            <Link className="btn btn-primary"  to='/users/logout' role="button">Logout</Link>
        </>
    )
}

export default Admin