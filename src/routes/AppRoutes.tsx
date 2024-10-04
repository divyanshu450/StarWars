import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login";
import ResourceList from "../pages/userList/UserList";
import Layout from "../Layout/Layout";
import User from "../pages/users/User";
import Films from "../pages/films/Films";
import Vehicles from "../pages/vehicles/Vehicles";
import Starships from "../pages/starships/Starships";
import DynamicCardList from "../components/customCard/CustomCard";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route 
            path="/home" 
            element={
              <ProtectedRoute element={<ResourceList />} allowedRoles={['admin', 'user']} />
            } 
          />
          <Route 
            path="/users" 
            element={
              <ProtectedRoute element={<ResourceList />} allowedRoles={['admin', 'user']} />
            } 
          />
          <Route 
            path="/user/:id" 
            element={
              <ProtectedRoute element={<User />} allowedRoles={['admin', 'user']} />
            } 
          />
          <Route 
            path="/resource/films" 
            element={
              <ProtectedRoute element={<DynamicCardList type="film" />} allowedRoles={['admin', 'user']} />
            } 
          />
          <Route 
            path="/resource/vehicles" 
            element={
              <ProtectedRoute element={<DynamicCardList type="vehicle" />} allowedRoles={['admin', 'user']} />
            } 
          />
          <Route 
            path="/resource/starships" 
            element={
              <ProtectedRoute element={<DynamicCardList type="starship" />} allowedRoles={['admin', 'user']} />
            } 
          />

          {/* Restricted routes for admin only */}
          <Route
            path="/resource/films/:id"
            element={<ProtectedRoute element={<Films />} allowedRoles={['admin']} />}
          />
          <Route
            path="/resource/vehicles/:id"
            element={<ProtectedRoute element={<Vehicles />} allowedRoles={['admin', 'user']} />}
          />
          <Route
            path="/resource/starships/:id"
            element={<ProtectedRoute element={<Starships />} allowedRoles={['admin']} />}
          />

          <Route path="*" element={<div>Page not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
