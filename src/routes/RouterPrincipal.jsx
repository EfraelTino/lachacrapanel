import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { ProtectedLayout } from "../components/ProtectedLaout";
import { Error } from "../components/Error";
import Principal from "../pages/Principal";
import { Partidas } from "../pages/Partidas";
import Admins from "../pages/Admins";
import { userAuth } from "../hooks/AuthProvider";
import { PartidasDos } from "../pages/PartidasDos";
import { SeoPage } from "../pages/panel/Seo";
import { PrincipalPage } from "../pages/panel/Principal";
import { ImaginaVideosPage } from "../pages/panel/ImaginaVideos";
import { TalleresPage } from "../pages/panel/Talleres";
import { MisionPage } from "../pages/panel/Mision";
import { VisionPage } from "../pages/panel/Vision";
import { VentaEntradas } from "../pages/panel/VentaEntradas";

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
        <Route path="videos" element={<ImaginaVideosPage />} />
        <Route path="principal" element={<PrincipalPage />} />
        <Route path="seo" element={<SeoPage />} />
        <Route path="experiencia" element={<></>} />
        <Route path="comunidad" element={<></>} />
        <Route path="talleres" element={<TalleresPage />} />
        <Route path="mision" element={<MisionPage />} />
        <Route path="vision" element={<VisionPage />} />
        <Route path="venta-entradas" element={<VentaEntradas />} />
      </Route>
    </Routes>
  );
};
