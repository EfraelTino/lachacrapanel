import { useState, useEffect } from "react";
import { getDatas } from "../../api/post";
import { toast, ToastContainer } from "react-toastify";
import { BiChevronsLeft } from "react-icons/bi";
import { BiChevronsRight } from "react-icons/bi";
import { Loader } from "../Complements/Loader";
import { CiSaveUp2 } from "react-icons/ci";

export const TableOne = ({ dataSearch }) => {
  const [user, setUser] = useState([]);
  const [errors, setErrors] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const usersPerPage = 5;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = user.slice(indexOfFirstUser, indexOfLastUser);
  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const formData = new FormData();
      formData.append("action", "get_users");
      const response = await getDatas(formData);
      console.log(response);
      if (response.data.code !== 200) {
        setErrors(response.data.message);
        setLoading(false);
      } else {
        setUser(response.data.message);
        setErrors(null);
        setLoading(false);
      }
    };
    const searchUser = async (term) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("action", "search_user");
      formData.append("searchcamp", term);
      const response = await getDatas(formData);
      console.log(response)
      if (response.data.code !== 200) {
        setErrors(response.data.message);
        setLoading(false);
      } else {
        setUser(response.data.message);
        setErrors(null);
        setLoading(false);
      }
    };

    if (dataSearch) {
      searchUser(dataSearch);
    } else {
      getUser();
    }
  }, [dataSearch]);

  const totalPages = Math.ceil(user.length / usersPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const activarData = async (id, estado) => {
    const idUser = parseInt(id);
    const estadoUser = parseInt(estado);
    let nuesvoEstado = estadoUser == 1 ? 0 : 1;

    const formData = new FormData();
    formData.append("action", "activar_usuario");
    formData.append("iduser", idUser);
    formData.append("estado", nuesvoEstado);
    const response = await getDatas(formData);
    console.log(response);
    if (response.data.success) {
      return window.location.reload();
    }
    toast.error("No se pudo activar el puntaje del usuario");
  };
  return (
    <>
      <ToastContainer position="top-center" />

      <div className="rounded-sm border border-stroke bg-white px-3 pt-3 pb-2 md:px-5 md:pt-6 md:pb-2.5 shadow-defaul">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray text-left">
                <th className="min-w-[20px] py-4 px-4 text-red-500 font-bold  xl:pl-11">
                  #
                </th>

                <th className="min-w-[140px] py-4 px-4 text-black font-bold xl:pl-11">
                  Nombres
                </th>
                <th className="min-w-[20px] py-4 px-4 text-black font-bold xl:pl-11">
                  Email
                </th>
                <th className="min-w-[150px] py-4 px-4 text-black font-bold ">
                  Ciudad
                </th>
                <th className="min-w-[150px] py-4 px-4 text-black font-bold ">
                  Cédula
                </th>
                <th className="min-w-[120px] py-4 px-4 text-black font-bold ">
                  Placa
                </th>
                <th className="min-w-[80px] py-4 px-4 text-black font-bold ">
                  Teléfono
                </th>
                <th className="min-w-[80px] py-4 px-4 text-black font-bold ">
                  Puntaje
                </th>
                <th className="min-w-[80px] py-4 px-4 text-black font-bold ">
                  Puntaje aprobado
                </th>
                <th className="min-w-[80px] py-4 px-4 text-black font-bold ">
                  Factura
                </th>
                <th className="min-w-[80px] py-4 px-4 text-black font-bold ">
                  Ip
                </th>
                <th className="min-w-[140px] py-4 px-4 text-black font-bold ">
                  Fecha de <br /> juego
                </th>
                {/* <th className="min-w-[140px] py-4 px-4 text-black font-bold ">
                  Acciones
                </th> */}
                {/* <th className="py-4 px-4 text-black font-bold ">Acciones</th> */}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    className="border-b border-[#eee] py-5 px-4 pl-9  xl:pl-11"
                    colSpan={8} // Ajusta el colspan según la cantidad de columnas de tu tabla
                  >
                    <Loader />{" "}
                    {/* Muestra el loader mientras loading es true */}
                  </td>
                </tr>
              ) : errors ? (
                <tr>
                  <td
                    className="border-b border-[#eee] py-5 px-4 pl-9  xl:pl-11"
                    colSpan={8} // Ajusta el colspan según la cantidad de columnas de tu tabla
                  >
                    <h5 className="font-bold text-danger text-center">
                      {errors}
                    </h5>
                  </td>
                </tr>
              ) : (
                currentUsers.map((item, index) => (
                  <tr key={index}>
                    <td className="border-b border-[#eee] py-5 px-4 ">
                      <p className="text-red-500 text-center font-bold ">
                        {" "}
                        {indexOfFirstUser + index + 1}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 ">
                      <p className="text-black ">{`${item.nombres}`}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 ">
                      <p className="text-black ">{`${item.email}`}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 ">
                      {item.ciudad}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 ">
                      {item.cedula}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 ">
                      {item.placa}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 ">
                      {item.telefono}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 ">
                      {item.puntaje_alto}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 ">
                      <strong className="flex justify-center">
                        {item.puntaje_arprobado == 0 ? "NO" : "SÍ"}
                      </strong>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 ">
                      <a
                        href={`https://aniversariohero.com/hero/facturas/${item.factura}`}
                        target="_blank"
                      >
                        <img
                          src={`https://aniversariohero.com/hero/facturas/${item.factura}`}
                          alt={item.nombres}
                        />
                      </a>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 ">
                      {item.ip}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 ">
                      {item.fecharegistro}
                    </td>
                    {/* <td className="border-b border-[#eee] py-5 px-4 ">
                      <div className="flex flex-col items-center justify-center">
                        <button
                          onClick={() =>
                            activarData(item.id, item.puntaje_arprobado)
                          }
                          className="border rounded"
                        >
                          {" "}
                          <CiSaveUp2 className="text-2xl" />
                        </button>
                        <p className="text-[10px] font-bold">Activar puntaje</p>
                      </div>
                    </td> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="pagination w-full mt-2">
            <div className="flex justify-between gap-2 items-center">
              <div className="">
                Usuarios registrados: <strong>{user.length}</strong>
              </div>
              <div className="flex items-center space-between gap-2">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`${
                    currentPage === 1
                      ? `text-black bg-whiter font-normal`
                      : `bg-opacity-10 text-red-500 bg-red-500 font-semibold`
                  } px-2 rounded`}
                >
                  <small className="flex items-center">
                    <BiChevronsLeft />
                    Anterior
                  </small>
                </button>
                <span className="rounded-full bg-opacity-10 flex items-center p-1 px-2 text-xs bg-success text-success font-bold">
                  {currentPage}
                </span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`${
                    currentPage === totalPages
                      ? `text-black bg-whiter font-normal`
                      : `bg-opacity-10 text-red-500 bg-red-500 font-semibold`
                  } px-2 rounded`}
                >
                  <small className="flex items-center">
                    Siguiente <BiChevronsRight />
                  </small>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
