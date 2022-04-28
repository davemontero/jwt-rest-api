import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Home = () => {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleSignup = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("signup_name"),
        email: formData.get("signup_email"),
        password: formData.get("signup_password"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.SUCCESS) {
          setShow(true);
          alert("usuario creado con exito");
        }
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.SUCCESS) {
          localStorage.setItem("jwt", data.access_token);
          navigate("/private");
        }
      });
  };

  return (
    <>
      <h1>Hello World from Home</h1>
      {show ? (
        <form onSubmit={handleLogin}>
          <h2>Inicio sesión</h2>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="email">Correo: </label>
            <input type="email" id="email" name="email" />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="password">Contraseña: </label>
            <input type="password" id="password" name="password" />
          </div>
          <button type="submit" style={{ marginRight: "10px" }} >Iniciar sesion</button>
          <button onClick={() => setShow(false)}>
            Registrar
          </button>
        </form>
      ) : (
        <form onSubmit={handleSignup}>
          <h2>Registro</h2>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="">Nombre</label>
            <input type="text" id="signup_name" name="signup_name" />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="signup_email">Correo</label>
            <input type="email" id="signup_email" name="signup_email" />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="signup_password">Contraseña</label>
            <input
              type="password"
              id="signup_password"
              name="signup_password"
            />
          </div>
          <button type="submit" style={{ marginRight: "10px" }}>
            Registrar
          </button>
          <button onClick={() => setShow(true)}>
            Iniciar sesion
          </button>
        </form>
      )}
    </>
  );
};

export default Home;
