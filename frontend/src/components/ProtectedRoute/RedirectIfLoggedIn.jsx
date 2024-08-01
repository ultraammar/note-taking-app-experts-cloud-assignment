import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';    

// eslint-disable-next-line react/prop-types
function RedirectIfLoggedIn({ children }) {
    const session = useSelector((state) => state.session);
  
    if (session.isLoggedIn) {
      
        return <Navigate to="/notes" replace/>
      
    }
  
    return children;
  }

export default RedirectIfLoggedIn