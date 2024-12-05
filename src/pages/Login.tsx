import {useState } from "react";
import { supabase } from "../supabase/client";

import "../Login.css";
import "../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) {
        console.error(error);
        alert("Hubo un problema al enviar el correo. Intenta nuevamente.");
      } else {
        alert(
          `Se ha enviado un correo a ${email}. Por favor, revisa tu bandeja de entrada.`
        );
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error inesperado. Intenta nuevamente.");
    }
  };

  return (
    <div>
      <div className="form-wrap">
        <form onSubmit={handleSubmit}>
          <h1>Log In</h1>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="We love having you back"
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="fas fa-user"></i>
          </div>

          <div className="login">
            <button type="submit">
              Continue <i className="fas fa-ticket"></i>
            </button>
          </div>

          <div className="formRight">
            <h2>Welcome back to Quickbet Movies!</h2>{" "}
            <p>
              🎟 Ready to dive into the world of unlimited entertainment? Enter
              your credentials and let the cinematic adventure begin!
            </p>
            <img src="assets/render2.png" alt="bienvenidaRenderLogin" />
          </div>
          <div className="sign-up">
            <p>
              For any questions, reach out to{" "}
              <a href="#">support@Quickbetdmovies.com</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
