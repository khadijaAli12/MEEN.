import React from 'react'
import UserContext from '../context/UserContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

function Profile() {
    const { user } = useContext(UserContext)
    
    // If user is not logged in, redirect to login
    if (!user) return <Navigate to="/login" replace />
    
    // If logged in, redirect to account page
    return <Navigate to="/account" replace />
}

export default Profile