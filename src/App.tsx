import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MyNavbar from "./components/navbar/MyNavbar";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileChangePage from "./pages/ProfileChangePage";
import CreateLaptopPage from "./pages/CreateLaptopPage";
import LaptopPage from "./pages/LaptopPage";
import CartPage from "./pages/CartPage";
import FavoritesPage from "./pages/FavoritesPage";
import MessagePage from "./pages/MessagePage";
import AdminOrderPage from "./pages/AdminOrderPage";
import ActivatePasswordPage from "./pages/ActivatePasswordPage";
import UpdateLaptopPage from "./pages/update-laptop/UpdateLaptopPage";
import PresentLaptop from "./pages/update-laptop/PresentLaptop";
import CreateAdminPage from "./pages/CreateAdminPage";

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
              <Route path={'/laptops/:id/update'} key="'/laptops/:id/update" element={<PresentLaptop />}/>
              <Route path={'/profile'} element={<ProfilePage/>}/>
              <Route path={'/profile/change'} element={<ProfileChangePage/>}/>
              <Route path={'/laptop/create'} element={<CreateLaptopPage/>}/>
              <Route path={'/admin/create'} element={<CreateAdminPage/>}/>
              <Route path={'/login'} element={<LoginPage/>}/>
              <Route path="*" element={<MessagePage/>}/>
          </Routes>

      </BrowserRouter>




  );
};

export default App;
