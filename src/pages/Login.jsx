import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BsEnvelope } from "react-icons/bs";
import { BiLock } from "react-icons/bi";
import { validateEmail, validateLength } from "../util/util";
import { toast, ToastContainer } from "react-toastify";
import { userAuth } from "../hooks/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import { getDatas } from "../api/post";
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errordata, setErrorData] = useState({ emaildata: "", passdata: "" });
  const { login } = userAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email.length <= 4) {
      return toast.error("Ingresa un correo válido");
    }
  //  if (password.length <= 1) {
    //  return toast.error("La contraseña debe tener más de 6 caracteres");
    //}
    try {
      //const formData = new FormData();
      //formData.append("action", "login");
     // formData.append("usuario", email);
      //formData.append("pass", password);
      const username = 'efrara';
      const password = '1234e';
      const response = await axios.get(`https://82dlw1mts1.execute-api.us-east-1.amazonaws.com/dev/LoginChacra/${username}/${password}`);
   
      console.log(response);
      const result = response.data;
    
    } catch (error) {
      console.log(error);
      toast.error("Error de inicio de sesión, intenta de nuevo");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center h-screen">
        <div className="rounded-md  border border-stroke w-full max-w-96 bg-white shadow-default border-l-2">
          <div className="grid">
            <div className="w-full">
              <div className="pt-12 px-26 text-center">
                <Link className="flex justify-center" to="/">
                  <img
                    className="w-[50%]"
                    src="https://landing-la-chacra.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdpwklm7yu%2Fimage%2Fupload%2Fv1728533746%2Flogochacra_tr2xdf.webp&w=128&q=75"
                    alt="Logo"
                  />
                </Link>
              </div>
            </div>

            <div className="w-full border-stroke">
              <div className="w-full p-4 sm:p-10 ">
                <h2 className="mb-4 text-2xl font-bold text-black text-center leading-8">
                  Ingresa como administrador
                </h2>
                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <label className="mb-1 block font-medium text-black">
                      Usuario
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        autoComplete=""
                        id="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);

                          if (!validateLength(e.target.value, 3)) {
                            setErrorData((prevErrors) => ({
                              ...prevErrors,
                              emaildata: "Ingresa un usuario válido",
                            }));
                          } else {
                            setErrorData((prevErrors) => ({
                              ...prevErrors,
                              emaildata: "",
                            }));
                          }
                        }}
                        placeholder="Ingresa tu usuario"
                        className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-4 pr-6 text-black outline-none focus:border-verde focus-visible:shadow-none"
                      />
                      <span className="absolute right-4 top-4">
                        <BsEnvelope className="text-xl" />
                      </span>
                    </div>
                    {errordata.emaildata && (
                      <small className="error" style={{ color: "red" }}>
                        {errordata.emaildata}
                      </small>
                    )}
                  </div>

                  <div className="mb-6">
                    <label className="mb-1 block font-medium text-black">
                      Contraseña
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-4 pr-6 text-black outline-none focus:border-verde focus-visible:shadow-none"
                        id="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (!validateLength(e.target.value, 5)) {
                            setErrorData((prevErrors) => ({
                              ...prevErrors,
                              passdata:
                                "La contraseña debe tener más de 6 caracteres",
                            }));
                          } else {
                            setErrorData((prevErrors) => ({
                              ...prevErrors,
                              passdata: "",
                            }));
                          }
                        }}
                      />
                      <span className="absolute right-4 top-4">
                        <BiLock className="text-2xl" />
                      </span>
                    </div>
                    {errordata.passdata && (
                      <small className="error" style={{ color: "red" }}>
                        {errordata.passdata}
                      </small>
                    )}
                  </div>

                  <div className="mb-5">
                    <button className="w-full cursor-pointer rounded-lg border border-[#14830a] bg-[#14830a] p-3 text-white transition hover:bg-opacity-90 text-center">
                      Ingresar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
