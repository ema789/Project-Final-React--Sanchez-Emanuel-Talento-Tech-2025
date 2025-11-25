// src/components/Login/Login.jsx

/**
 * Componente Login
 *
 * Este componente muestra el formulario de inicio de sesión del panel administrativo.
 * Incluye:
 *  ✔ Manejo de estados locales (usuario, contraseña, errores, loading)
 *  ✔ Validación simple antes del envío
 *  ✔ Iconos visuales para inputs (usuario, password, mostrar/ocultar)
 *  ✔ Autenticación básica comparando valores predefinidos
 *  ✔ Envío al Dashboard si las credenciales son correctas
 *  ✔ Mensajes de error accesibles
 *  ✔ Auto-focus en el campo de usuario
 */

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/useAuth";
import ButtonG from "../Button/ButtonG";
import "./login.css";

import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {

  // Estados para manejar usuario, password, visibilidad, carga y errores
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Contexto de autenticación
  const { login } = useAuth();

  // Hook para navegar
  const navigate = useNavigate();

  // Referencia para auto-enfocar el input user
  const userRef = useRef(null);

  // Enfocar el input usuario al cargar
  useEffect(() => {
    userRef.current?.focus();
  }, []);

  /**
   * validate()
   * Valida los campos antes de enviar el formulario
   * Devuelve un string si hay error, o null si todo está ok
   */
  const validate = () => {
    if (!user.trim()) return "Username is required";
    if (!password) return "Password is required";
    if (password.length < 3) return "Password must be at least 3 characters";
    return null;
  };

  /**
   * handleSubmit()
   * Maneja el envío del formulario:
   *  1. Previene recarga
   *  2. Valida campos
   *  3. Simula un login básico con usuario/contraseña predefinidos
   *  4. Guarda sesión en contexto y redirige
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    const v = validate();
    if (v) {
      setErrorMsg(v);
      return;
    }

    setLoading(true);

    try {
      const username = user.trim().toLowerCase();

      // Autenticación simple (se puede reemplazar por API real)
      if (
        (username === "admin" && password === "1234") ||
        (username === "emasz" && password === "4226")
      ) {
        login(username);        // Guarda en contexto global
        navigate("/dashboard"); // Redirige al panel
      } else {
        setErrorMsg("Username or password is incorrect");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Unexpected error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card" role="region" aria-label="Login form">

        {/* Encabezado */}
        <header className="login-header">
          <h1 className="login-title">Welcome to my E-commerce</h1>
          <p className="login-sub">Sign in to access the control panel</p>
        </header>

        {/* Formulario */}
        <form className="login-form" onSubmit={handleSubmit} noValidate>

          {/* Mensaje de error general */}
          {errorMsg && <div className="login-error" role="alert">{errorMsg}</div>}

          {/* Input Usuario */}
          <label className="input-group">
            <span className="input-icon"><FiUser /></span>
            <input
              ref={userRef}
              type="text"
              name="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Username"
              autoComplete="username"
              aria-label="username"
              required
            />
          </label>

          {/* Input Password con toggle vista */}
          <label className="input-group">
            <span className="input-icon"><FiLock /></span>

            <input
              type={showPwd ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              aria-label="password"
              required
            />

            {/* Botón mostrar/ocultar contraseña */}
            <button
              type="button"
              className="pwd-toggle"
              onClick={() => setShowPwd((s) => !s)}
              aria-label={showPwd ? "Hide password" : "Show password"}
            >
              {showPwd ? <FiEyeOff /> : <FiEye />}
            </button>
          </label>

          {/* Botón Login */}
          <div className="form-actions">
            <ButtonG tipo="btn btn-add" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Log in"}
            </ButtonG>
          </div>

          {/* Footer del formulario */}
          <div className="login-foot">
            <label className="remember">
              <input type="checkbox" aria-label="Remember me" />
              <span>Remember me</span>
            </label>

            <ButtonG
              type="button"
              className="forgot-link"
              onClick={() => alert("Implement password recovery flow")}
            >
              Forgot password?
            </ButtonG>
          </div>
        </form>
      </div>
    </div>
  );
}
