import React from 'react'
import { Navigate } from 'react-router-dom'

// დაცული გვერდისათვის (Home.jsx) შექმნილი როუტი
const PrivateRoute = ({component}) => {
  const token = localStorage.getItem("accessToken")
  
  if(token) return component
  else return <Navigate to="/login" replace />
}

export default PrivateRoute