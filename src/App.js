import LoginAdmin from "./components/Admin/LoginAdmin";

import {Routes, Route } from "react-router-dom";
import Ajoutergestionnaire from "./components/Admin/addGestionnaire";
import ProfileGestionnaire from "./components/ProfileGestionnaire";
export default function App(){

  return <Routes>
    <Route path="/loginAdmin" element={<LoginAdmin/>}></Route>
    <Route path="/addGestionnaire" element={<Ajoutergestionnaire/>}></Route>
    <Route path="/ProfileGestionnaire/:id" element={<ProfileGestionnaire/>}></Route>
  </Routes>
}
