import LoginAdmin from "./components/Admin/LoginAdmin";

import {Routes, Route } from "react-router-dom";
import Ajoutergestionnaire from "./components/addGestionnaire";
export default function App(){

  return <Routes>
    <Route path="/loginAdmin" element={<LoginAdmin/>}></Route>
    <Route path="/addGestionnaire" element={<Ajoutergestionnaire/>}></Route>
  </Routes>
}
