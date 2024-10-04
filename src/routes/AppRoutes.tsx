import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";

import Login from "../pages/login/Login";
import Landing from "../pages/landing/Landing";
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
          <Route path="/home" element={<ResourceList />} />
          <Route path="/users" element={<ResourceList />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/resource/films" element={<DynamicCardList type="film" />} />
        <Route path="/resource/vehicles" element={<DynamicCardList type="vehicle" />} />
        <Route path="/resource/starships" element={<DynamicCardList type="starship" />} />
        <Route
        path="/resource/films/:id"
        element={
          <ProtectedRoute
            element={<Films />}
            allowedRoles={['admin']} // Only admins can access
          />
        }
      />
      <Route
        path="/resource/vehicles/:id"
        element={
          <ProtectedRoute
            element={<Vehicles />}
            allowedRoles={['admin', 'user']} // Both admins and users can access
          />
        }
      />
      <Route
        path="/resource/starships/:id"
        element={
          <ProtectedRoute
            element={<Starships />}
            allowedRoles={['admin']} // Only admins can access
          />
        }
      />
          <Route path="*" element={<div>Page not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

