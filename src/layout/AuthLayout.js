import React from 'react'
import { Navigate, Outlet } from 'react-router';
import { useIsLoggedIn } from './hooks';

export default function AuthLayout() {
    const isLoggedIn = useIsLoggedIn();


    if(isLoggedIn === null) return <h1>Loading...</h1>;
    else if (isLoggedIn === false) return <Navigate replace to="/"/>;
  return (
    <Outlet/>
  )
}

