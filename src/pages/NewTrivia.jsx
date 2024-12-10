import React, { useEffect, useState } from "react";
import { TitleItem } from "../components/TitleItem";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getDatas } from "../api/post";
import { toast, ToastContainer } from "react-toastify";
import { Loader } from "../components/Complements/Loader";
import { userAuth } from "../hooks/AuthProvider";

export const NewTrivia = () => {
  const navigate = useNavigate();
  const { user } = userAuth();

  useEffect(() => {}, [user]);

  const [formData, setFormData] = useState({
    titulo: "",
    correcto: "",
    incorrecto_1:"",
    incorrecto_2:"",
  });

  const [error, setError] = useState({
    titulo: "",
    correcto: "",
    incorrecto_1:"",
    incorrecto_2:"",

  });

  const validateForm = () => {
    const newError = {
      titulo: formData.titulo ? "" : "Ingresa un nombre al producto",
      correcto: formData.correcto ? "" : "Ingresa la respuesta correcta",
      incorrecto_1: formData.incorrecto_1 ? "" : "Ingresa la respuesta incorrecta",
      incorrecto_2: formData.incorrecto_2 ? "" : "Ingresa la 2da respuesta incorrecta",
    };
    setError(newError);
    // Return false if there are any errors
    return !Object.values(newError).some((err) => err);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

      setFormData({
        ...formData,
        [name]: value,
      });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Asegúrate que todos los campos estén llenos");
      return;
    }
    try {
      const sentData = new FormData();
      sentData.append("action", "new_pregunta");
      sentData.append("pregunta", formData.titulo);
      sentData.append("correcto", formData.correcto);
      sentData.append("incorrecto_1", formData.incorrecto_1);
      sentData.append("incorrecto_2", formData.incorrecto_2);
      sentData.append("type", 2);
      const add = await getDatas(sentData);
      const data = add.data;
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      navigate("/panel/trivia");
    } catch (error) {
      toast.error("Error al agregar episodio");
    }
  };

  return (
    <>
      <TitleItem pageName="Crear pregunta" />
      <ToastContainer />
      <div className="rounded-sm border border-stroke bg-white shadow-default">
        <div className="border-b border-stroke py-4 px-6.5 ">
          <h3 className="font-bold text-center sm:text-left text-black ">
            Registrar nuevo episodio
          </h3>
        </div>
        <form onSubmit={handleRegister}>
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="w-full ">
                  <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                    Pregunta
                  </label>
                  <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    placeholder="Ingresar título"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-verde  active:border-verde  disabled:cursor-default disabled:bg-white"
                  />
                  {error.titulo && (
                    <span className="text-verde  text-[12px]">{error.titulo}</span>
                  )}
                </div>
                <div className="w-full ">
                  <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                    Respuesta correcta
                  </label>
                  <input
                    type="text"
                    id="correcto"
                    name="correcto"
                    value={formData.correcto}
                    onChange={handleChange}
                    placeholder="Ingresar título"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-verde  active:border-verde  disabled:cursor-default disabled:bg-white"
                  />
                  {error.correcto && (
                    <span className="text-verde  text-[12px]">{error.correcto}</span>
                  )}
                </div>
                <div className="w-full ">
                  <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                    Respuesta incorrecta
                  </label>
                  <input
                    type="text"
                    id="incorrecto_1"
                    name="incorrecto_1"
                    value={formData.incorrecto_1}
                    onChange={handleChange}
                    placeholder="Ingresar título"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-verde  active:border-verde  disabled:cursor-default disabled:bg-white"
                  />
                  {error.incorrecto_1 && (
                    <span className="text-verde  text-[12px]">{error.incorrecto_1}</span>
                  )}
                </div>
                <div className="w-full ">
                  <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                    Respuesta incorrecta
                  </label>
                  <input
                    type="text"
                    id="incorrecto_2"
                    name="incorrecto_2"
                    value={formData.incorrecto_2}
                    onChange={handleChange}
                    placeholder="Ingresar título"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-verde  active:border-verde  disabled:cursor-default disabled:bg-white"
                  />
                  {error.incorrecto_2 && (
                    <span className="text-verde  text-[12px]">{error.incorrecto_2}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Link
                to="/panel/trivia"
                className="flex justify-center font-normal rounded bg-verde  p-3  text-white hover:bg-opacity-90"
              >
                Cancelar
              </Link>
              <button className="flex font-normal justify-center rounded bg-verde  p-3 text-gray hover:bg-opacity-90">
                Guardar producto
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
