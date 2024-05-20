import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function GestionnaireLogin() {
  const navigate = useNavigate();

  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  // Validation function
  const validation = async (e) => {
    e.preventDefault();

    let valid = true;
    const Errors = { ...errors };

    if (!email.trim()) {
      Errors.email =
        "Veuillez saisir votre adresse e-mail. Ce champ est obligatoire";
      valid = false;
    } else {
      Errors.email = "";
      valid = true;

    }

    if (!password.trim()) {
      Errors.password =
        "Veuillez entrer votre mot de passe. Ce champ est obligatoire.";
      valid = false;
    } else {
      Errors.password = "";
      valid = true;

    }

    setErrors(Errors);
console.log(valid);
    if (valid) {
      try {
        const response = await axios.post(
          "http://localhost:3002/api/GestionnaireLogin",
          { email, password }
        );
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/Creation_Formation");
        console.log(token);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Une erreur est survenue lors de la connexion.");
        }
        console.log(error);
      }
    }
  };

  return (
    <section className="login-section">
      {errorMessage && (
        <div className="errordiv alert alert-danger">{errorMessage}</div>
      )}
      <h1 className="titre">Se connecter</h1>
      <form className="login-form" onSubmit={validation}>
        <label className="form-label-login" htmlFor="email">
          Email :
        </label>
        <input
          className="form-input-login"
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="form-error-login">{errors.email}</span>

        <label className="form-label-login" htmlFor="password">
          Mot de passe :
        </label>
        <input
          className="form-input-login"
          type="password"
          id="password"
          name="password"
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="form-error-login">{errors.password}</span>

        <button className="form-button-login" type="submit">
          Se connecter
        </button>
      </form>
    </section>
  );
}
