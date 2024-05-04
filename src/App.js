import Dashbord2 from "./components/Admin/dashbord2";
import { Route,Routes } from "react-router-dom";
import GestionnaireLogin from "./components/Gestionnaire/GestionnaireLogin";
import Creation_Formation from "./components/Gestionnaire/Creation_Formation";
function App() {
  return (
    <Routes>

    <Route path="/dashboard" element={<Dashbord2/>}></Route>
    
    <Route path="/Creation_Formation" element={<Creation_Formation/>}></Route>
    <Route path="/GestionnaireLogin" element={<GestionnaireLogin/>}></Route>
    </Routes>
    
  );
}

export default App;
