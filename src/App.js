import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import GestionnaireLogin from "./components/Gestionnaire/GestionnaireLogin";
import GestionnaireSection from "./GestionnaireSection";
import AdminSection from "./AdminSection";
import LoginAdmin from "./components/Admin/LoginAdmin";
import FormateurCalender from "./components/Formateur/formateurCalender";

import Test from "./components/Gestionnaire/ButtonFormateurResponsable";

function App() {
 


  return (
    <Routes>
      <Route path="/test" element={<Test/>}></Route>
      <Route path="/emploi" element={<FormateurCalender/>}></Route>
    </Routes>
    // <div className="SiteContainer">
    //   <Routes>
    //     <Route
    //       path="/GestionnaireLogin"
    //       element={<GestionnaireLogin />}
    //     >

    //     </Route>
    //     <Route path="*" element={<GestionnaireSection />}></Route>
    //      <Route path="/Login" element={<LoginAdmin/>}></Route>
    //      <Route path='*' element={<AdminSection/>} ></Route>

    //   </Routes> 


    //    <Routes>
    //   <Route path='*' element={<AdminSection/>}></Route>
    // </Routes> 
    // </div>
  );
}

export default App;
