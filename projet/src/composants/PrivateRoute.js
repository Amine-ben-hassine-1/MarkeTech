import { Navigate,Outlet } from "react-router-dom";
import useAuthState from "./../Hooks/useAuth";
import React from 'react'
import Spinner from "./Spinner"

const PrivateRoute = () => {
    const {loggedIn,checkState}=useAuthState()

    if(checkState){
      return<Spinner/>}

  return loggedIn ? <Outlet/> :<Navigate to="/Login"/>
}

export default PrivateRoute
  