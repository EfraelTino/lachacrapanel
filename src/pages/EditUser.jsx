import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TitleItem } from "../components/TitleItem";
import { ToastContainer, toast } from "react-toastify";
import { getDatas } from "../api/post";
import { Loader } from "../components/Complements/Loader";

export const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    usuario: "",
    password: "",
    cedula: "",
    cargo: "",
  });

  const [error, setError] = useState({
    nombre: "",
    usuario: "",
    password: "",
    cedula: "",
    cargo: "",
  });

  const validateForm = () => {
    const newError = {
      nombre: formData.nombre ? "" : "El nombre es requerido",
      usuario: formData.usuario ? "" : "El usuario es requerido",
      cedula: formData.cedula ? "" : "Ingrese la cédula",
      cargo: formData.cargo ? "" : "Ingrese el cargo",
    };

    setError(newError);

    // Return false if there are any errors
    return !Object.values(newError).some((err) => err);
  };

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const formData = new FormData();
      formData.append("action", "user_for_id");
      formData.append("iduser", id);
      const result = await getDatas(formData);
      const { success, message } = result.data;

      if (!success) {
        return navigate("/panel");
      }
      setLoading(false);
      setFormData((prevFormData) => ({
        ...prevFormData, // Keep current values
        nombre: message[0].nombre,
        usuario: message[0].usuario,
        cedula: message[0].cedula,
        cargo: message[0].cargo,
      }));
    };
    getUser();
  }, [id, navigate]);

  const handleChange = async (e) => {
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Asegúrate que todos los campos estén llenos");
      return;
    }
    const formdata = new FormData();
    formdata.append("action", "update_data_user");
    formdata.append("password", formData.password);
    formdata.append("cargo", formData.cargo);
    formdata.append("cedula", formData.cedula);
    formdata.append("nombre", formData.nombre);
    formdata.append("usuario", formData.usuario);
    formdata.append("iduser", id);
    const response = await getDatas(formdata);
    const { message, success } = response.data;
    if (!success) {
      toast.error(message);
      return;
    }
    toast.success(message);
  };

  return (
    <>
      <TitleItem pageName={`Actualizar datos de ${formData.usuario}`} />
      <ToastContainer position="top-center" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default  ">
            <div className="border-b border-stroke py-4 px-6.5 ">
              <h3 className="font-medium text-black ">
                Actualizar datos de: <strong>{formData.usuario}</strong>
              </h3>
            </div>
            {loading ? (
              <Loader className="mt-10" />
            ) : (
              <form onSubmit={handleUpdate}>
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 ">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
                      <div className="w-full">
                        <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                          Nombres
                        </label>
                        <input
                          type="text"
                          id="nombre"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          placeholder="Ingresar Nombre"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-verde  active:border-verde  disabled:cursor-default disabled:bg-whiter    "
                        />
                        {error.nombre && (
                          <span className="text-verde ">{error.nombre}</span>
                        )}
                      </div>
                      <div className="w-full">
                        <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                          Cédula
                        </label>
                        <input
                          type="text"
                          id="cedula"
                          name="cedula"
                          value={formData.cedula}
                          onChange={handleChange}
                          placeholder="Ingresar Nombre"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-verde  active:border-verde  disabled:cursor-default disabled:bg-whiter    "
                        />
                        {error.cedula && (
                          <span className="text-verde ">{error.cedula}</span>
                        )}
                      </div>
                      <div className="w-full">
                        <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                          Cargo
                        </label>
                        <input
                          type="text"
                          id="cargo"
                          name="cargo"
                          value={formData.cargo}
                          onChange={handleChange}
                          placeholder="Ingresar Nombre"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-verde  active:border-verde  disabled:cursor-default disabled:bg-whiter    "
                        />
                        {error.cargo && (
                          <span className="text-verde ">{error.cargo}</span>
                        )}
                      </div>
                      <div className="w-full">
                        <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                          Usuario
                        </label>
                        <input
                          type="text"
                          id="usuario"
                          name="usuario"
                          value={formData.usuario}
                          onChange={handleChange}
                          placeholder="Ingresar Nombre"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-verde  active:border-verde  disabled:cursor-default disabled:bg-whiter    "
                        />
                        {error.usuario && (
                          <span className="text-verde ">{error.usuario}</span>
                        )}
                      </div>
                      <div className="w-full">
                        <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                          Contraseña
                        </label>
                        <input
                          type="password"
                          id="password"
                          minLength={6}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Ingresar contraseña"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-verde  active:border-verde  disabled:cursor-default disabled:bg-whiter    "
                        />
                        {error.password && (
                          <span className="text-verde ">{error.password}</span>
                        )}
                      </div>
    
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <Link
                      to="/panel/admins"
                      className="flex justify-center font-normal rounded bg-verde  p-3  text-white hover:bg-opacity-90"
                    >
                      Cancelar
                    </Link>
                    <button className="flex justify-center rounded bg-verde  p-3 font-bold text-gray hover:bg-opacity-90">
                      Guardar usuario
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
