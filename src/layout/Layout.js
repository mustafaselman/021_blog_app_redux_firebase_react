import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { useIsLoggedIn } from "./hooks";



function Layout() {
    const isLoggedIn = useIsLoggedIn();
    if(isLoggedIn === null) return <h1>Loading...</h1>;
    else if (isLoggedIn === true) return <Navigate replace to="/home"/>;
  return (
    <Outlet/>
  )
}

export default Layout