import React, { useEffect, useState } from "react";
import { TitleItem } from "../components/TitleItem";
import { Link, useNavigate } from "react-router-dom";
import { getDatas } from "../api/post";
import { toast, ToastContainer } from "react-toastify";
import { userAuth } from "../hooks/AuthProvider";

export const NewEpisode = () => {
  const navigate = useNavigate();
  const { user } = userAuth();

  useEffect(() => {}, [user]);

  const [formData, setFormData] = useState({
    titulo: "",
    foto: undefined,
  });

  const [error, setError] = useState({
    titulo: "",

    foto: "",
  });

  const validateForm = () => {
    const newError = {
      titulo: formData.titulo ? "" : "Ingresa un nombre al producto",
      foto: formData.foto ? "" : "La foto de portada es requerida",
    };

    setError(newError);

    // Return false if there are any errors
    return !Object.values(newError).some((err) => err);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Asegúrate que todos los campos estén llenos");
      return;
    }
    try {
      const sentData = new FormData();
      sentData.append("action", "new_relacionar");
      sentData.append("file", formData.foto);
      sentData.append("titulo", formData.titulo);
      const add = await getDatas(sentData);
      const data = add.data;
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      navigate("/panel/actividad");
    } catch (error) {
      toast.error("Error al agregar episodio");
    }
  };

  return (
    <>
      <TitleItem pageName="Crear productos" />
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
                    Nombre del producto
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
                    <span className="text-verde ">{error.titulo}</span>
                  )}
                </div>
                <div className="w-full ">
                  <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                    Foto del producto
                  </label>
                  <input
                    type="file"
                    required
                    name="foto"
                    accept=".png, .jpg, .jpeg, .webp"
                    onChange={handleChange}
                    className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-verde  file:focus:border-verde  active:border-verde  disabled:cursor-default disabled:bg-white"
                  />
                  {error.foto && (
                    <span className="text-verde ">{error.foto}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Link
                to="/panel/actividad"
                className="flex justify-center font-normal rounded bg-verde  p-3  text-white hover:bg-opacity-90"
              >
                Cancelar
              </Link>
              <button className="flex font-bold justify-center rounded bg-verde  p-3 text-gray hover:bg-opacity-90">
                Guardar producto
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
