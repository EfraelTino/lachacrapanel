import React, { useEffect, useState } from "react";
import { TitleItem } from "../components/TitleItem";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDatas } from "../api/post";
import { BiEdit } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
export const SeeUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  // BUSQUEDA DE USUARIO
  useEffect(() => {
    // Verificar si no hay id o si id es una cadena vacía
    const getUser = async () => {
      const formData = new FormData();
      formData.append("action", "user_for_id");
      formData.append("iduser", id);
      const result = await getDatas(formData);
      const data = result.data;

      if (!data.success) {
        return navigate("/panel");
      }
      setUser(data.message);
    };
    getUser();
  }, [id, navigate]);
  return (
    <>
      <TitleItem pageName="Datos del usuario" />
      <ToastContainer position="top-center" />
      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default  ">
            {user.map((item, index) => (
              <div key={index}>
                <div className="border-b border-stroke py-4 px-6.5 ">
                  <div className="grid grid-cols-1 gap-2 sm:gap-0 sm:grid-cols-4 items-center">
                    <h3 className="font-medium text-black text-center sm:text-left  col-span-1 sm:col-span-3 ">
                      Datos del usuario -{" "}
                      <strong className="uppercase">{`${item.nombre}`}</strong>
                    </h3>
                    <Link
                      to={`/panel/edit-user/${item.id}`}
                      className="col-span-1 flex items-center justify-center rounded-md bg-meta-3 py-3 px-6 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 "
                    >
                      <BiEdit className="text-xl" /> Editar
                    </Link>
                  </div>
                </div>

                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
                      <div className="w-full xl:w-1/2">
                        <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                          Nombres
                        </label>

                        <p className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-verde  hover:border-verde  active:border-verde  disabled:cursor-default disabled:bg-whiter   ">
                          {item.nombre}
                        </p>
                      </div>
                      <div className="w-full xl:w-1/2">
                        <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                          Cedula
                        </label>

                        <p className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-verde  hover:border-verde  active:border-verde  disabled:cursor-default disabled:bg-whiter   ">
                          {item.cedula}
                        </p>
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                          Cargo
                        </label>

                        <p className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-verde  hover:border-verde  active:border-verde  disabled:cursor-default disabled:bg-whiter   ">
                          {item.cargo}
                        </p>
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                          Usuario
                        </label>
                        <p className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-verde  hover:border-verde  active:border-verde  disabled:cursor-default disabled:bg-whiter   ">
                          {item.usuario}
                        </p>
                      </div>
                      <div className="w-full xl:w-1/2">
                        <label className="mb-0.5 md:mb-2.5 block text-black font-bold">
                          Contraseña
                        </label>

                        <p className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-verde  hover:border-verde  active:border-verde  disabled:cursor-default disabled:bg-whiter   ">
                          **********
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
