import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { ProtectedLayout } from "../components/ProtectedLaout";
import { Error } from "../components/Error";
import Principal from "../pages/Principal";
import { Partidas } from "../pages/Partidas";
import Admins from "../pages/Admins";
import { userAuth } from "../hooks/AuthProvider";
import { PartidasDos } from "../pages/PartidasDos";

export const RouterPrincipal = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Error />} />
      <Route path="/panel" element={<ProtectedLayout />}>
        <Route index element={<Principal />} />
        <Route path="placas" element={<Admins />} />
        <Route path="basedatos-1" element={<Partidas />} />
        <Route path="basedatos-2" element={<PartidasDos />} />
      </Route>
    </Routes>
  );
};
