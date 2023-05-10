import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MyNavbar from "./components/UI/navbar/MyNavbar";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileChangePage from "./pages/ProfileChangePage";
import CreateLaptopPage from "./pages/CreateLaptopPage";
import LaptopPage from "./pages/LaptopPage";
import CartPage from "./pages/CartPage";
import FavoritesPage from "./pages/FavoritesPage";
import MessagePage from "./pages/MessagePage";
import AdminOrderPage from "./pages/AdminOrderPage";
import AdminRoute from "./util/AdminRoute";
import ActivatePasswordPage from "./pages/ActivatePasswordPage";

const App = () => {


  return (

      <BrowserRouter>

          <MyNavbar/>
          <div className="mt-40"></div>
          <Routes>
              <Route path={'/register'} element={<RegisterPage/>}/>
              <Route path={'/admin/orders'} element={<AdminOrderPage/>}/>
              <Route path={'/'} element={<MainPage/>}/>
              <Route path={'/cart'} element={<CartPage/>}/>
              <Route path={'/password/activate'} element={<ActivatePasswordPage/>}/>
              <Route path={'/favorites'} element={<FavoritesPage/>}/>
              <Route path={'/laptops/:id'} key="'/laptops/:id" element={<LaptopPage />}/>
              <Route path={'/profile'} element={<ProfilePage/>}/>
              <Route path={'/profile/change'} element={<ProfileChangePage/>}/>
              <Route path={'/laptop/create'} element={<CreateLaptopPage/>}/>
              <Route path={'/login'} element={<LoginPage/>}/>
              <Route path="*" element={<MessagePage/>}/>
          </Routes>

      </BrowserRouter>




  );
};

export default App;
