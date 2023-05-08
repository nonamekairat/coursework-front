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
import ProfileChangePage from "./pages/ProfileChangePage";
import CreateLaptopPage from "./pages/CreateLaptopPage";
import LaptopPage from "./pages/LaptopPage";
import NotFoundPage from "./pages/NotFoundPage";
import CartPage from "./pages/CartPage";

const App = () => {


  return (

      <BrowserRouter>

          <MyNavbar/>
          <Routes>
              <Route path={'/register'} element={<RegisterPage/>}/>
              <Route path={'/'} element={<MainPage/>}/>
              <Route path={'/cart'} element={<CartPage/>}/>
              <Route path={'/laptops/:id'} key="'/laptops/:id" element={<LaptopPage />}/>
              <Route path={'/profile'} element={<ProfilePage/>}/>
              <Route path={'/profile/change'} element={<ProfileChangePage/>}/>
              <Route path={'/laptop/create'} element={<CreateLaptopPage/>}/>
              <Route path={'/login'} element={<LoginPage/>}/>
              <Route path="*" element={<NotFoundPage/>}/>
          </Routes>

      </BrowserRouter>




  );
};

export default App;
