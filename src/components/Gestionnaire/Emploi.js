import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Emploi() {
    
    const navigate = useNavigate();

    useEffect(() => {
      const checkAuthentification = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            navigate("/GestionnaireLogin");
          }
        } catch (err) {
          console.log("Error checking authentication", err);
          navigate("/GestionnaireLogin");
        }
      };

      checkAuthentification();
    }, [navigate]);
    
    return <></>
}