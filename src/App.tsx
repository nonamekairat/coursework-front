import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import {Button} from "@material-tailwind/react";
import {useAppSelector} from "./hooks/redux";
import LoginPage from "./pages/LoginPage";
import MyNavbar from "./components/UI/navbar/MyNavbar";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {


  return (

      <BrowserRouter>

          <MyNavbar/>
          <Routes>
              <Route path={'/register'} element={<RegisterPage/>}/>
              <Route path={'/'} element={<MainPage/>}/>
              <Route path={'/profile'} element={<ProfilePage/>}/>
              <Route path={'/login'} element={<LoginPage/>}/>
              <Route path="*" element={<div>NotFound</div>}/>
          </Routes>

      </BrowserRouter>




  );
};

export default App;
