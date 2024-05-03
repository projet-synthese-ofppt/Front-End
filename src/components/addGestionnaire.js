
 import { useState } from "react";
 import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Ajoutergestionnaire() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentification = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate("/loginAdmin");
        }
      } catch (err) {
        console.log("Error checking authentication", err);
        navigate("/loginAdmin");
      }
    };

    checkAuthentification(); // Call the async function immediately

  }, [navigate]);

  return <>hello admin</>;
}

export default Ajoutergestionnaire;
