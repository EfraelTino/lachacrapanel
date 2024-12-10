import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TitleItem } from "../components/TitleItem";
import { Notify } from "../components/NotifyItem";
import { toast } from "react-toastify";
import { getDatas } from "../api/post";
export const AddUser = () => {
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
  const navigate = useNavigate();
  const validateForm = () => {
    const newError = {
      nombre: formData.nombre ? "" : "El nombre es requerido",
      usuario: formData.usuario ? "" : "El usuario es requerido",
      password: formData.password ? "" : "La contraseña es requerida",
      cedula: formData.cedula ? "" : "La cédula es requerida",
      cargo: formData.cargo ? "" : "El cargo es requerido",
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
      toast.error("Asegúrate que todos los campos estén llenos ");
      return;
    }
    try {
      const sentData = new FormData();
      sentData.append("action", "add_user");
      sentData.append("nombre", formData.nombre);
      sentData.append("usuario", formData.usuario);
      sentData.append("password", formData.password);
      sentData.append("cedula", formData.cedula);
      sentData.append("cargo", formData.cargo);
      const add = await getDatas(sentData);
      console.log("add: ", add)
      const data = add.data;
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      navigate(-1);
    } catch (error) {
      console.log("err: ", error)
      toast.error("Error al agregar usuario");
    }
  };

  return (
    <>
      <TitleItem pageName="Agregar Usuario" />
      {error && <Notify error={error} />}

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default">
            <div className="border-b border-stroke py-4 px-6.5 ">
              <h3 className="font-semibold text-center md:text-left text-title-[15px] text-black ">
                Registrar nuevo usuario
              </h3>
            </div>
            <form onSubmit={handleRegister}>
              <div className="p-3 sm:p-6.5">
                <div className="mb-4.5 flex flex-col gap-1">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
                    <div className="w-full ">
                      <label className="mb-0.5 md:mb-2.5 block text-black font-bold ">
                        Nombres
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Ingresar Nombre"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-verde  active:border-verde  disabled:cursor-default disabled:bg-whiter"
                      />
                      {error.nombre && (
                        <span className="text-verde ">{error.nombre}</span>
                      )}
                    </div>

                    <div className="w-full ">
                      <label className="mb-0.5 md:mb-2.5 block text-black font-bold ">
                        Usuario
                      </label>
                      <input
                        type="email"
                        id="usuario"
                        name="usuario"
                        value={formData.usuario}
                        onChange={handleChange}
                        placeholder="Ingresar Apellidos"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-verde  active:border-verde  disabled:cursor-default disabled:bg-whiter "
                      />
                      {error.usuario && (
                        <span className="text-verde ">{error.usuario}</span>
                      )}
                    </div>
                    <div className="w-full ">
                      <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Ingresar contraseña"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-verde  active:border-verde  disabled:cursor-default disabled:bg-whiter "
                      />
                      {error.password && (
                        <span className="text-verde ">{error.password}</span>
                      )}
                    </div>

                    <div className="w-full ">
                      <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                        Cédula
                      </label>
                      <input
                        type="number"
                        placeholder="Ingresa la cédula"
                        id="cedula"
                        name="cedula"
                        value={formData.cedula}
                        onChange={handleChange}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-verde  active:border-verde  disabled:cursor-default disabled:bg-whiter "
                      />
                      {error.cedula && (
                        <span className="text-verde ">
                          {error.cedula}
                        </span>
                      )}
                    </div>
                    <div className="w-full ">
                      <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                        Cargo
                      </label>
                      <input
                        type="text"
                        placeholder="Ingresa el cargo"
                        id="cargo"
                        name="cargo"
                        value={formData.cargo}
                        onChange={handleChange}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-verde  active:border-verde  disabled:cursor-default disabled:bg-whiter "
                      />
                      {error.cargo && (
                        <span className="text-verde ">
                          {error.cargo}
                        </span>
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
                  <button className="flex  justify-center rounded font-bold bg-verde  p-3  text-gray hover:bg-opacity-90">
                    Guardar usuario
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
