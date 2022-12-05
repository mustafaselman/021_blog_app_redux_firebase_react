import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthLayout from '../layout/AuthLayout'
import Layout from '../layout/Layout'

import Home from '../page/Home'
import SignIn from '../page/SignIn'
import SignUp from '../page/SignUp'

function AppRouter()
{
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<SignIn />} path="/" />
          <Route element={<SignUp />} path="/register" />
        </Route>
        <Route element={<AuthLayout />}>
          <Route element={<Home />} path="/home" />
        </Route>



      </Routes>

    </BrowserRouter>
  )
}

export default AppRouter