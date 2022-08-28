import React from 'react'
import { Link } from 'react-router-dom'
import "../asset/css/notfound.css"
import notFoundImage from '../asset/images/notfound.png'

const NotFound = () => {
    return (
        <div className='not-found'>
            <img src={notFoundImage} width="50%" className='not-found-image' />
            <Link to="/" className='btn btn-dark'>Back to home</Link>
        </div>
    )
}

export default NotFound