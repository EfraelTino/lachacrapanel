import { Loader } from "../Complements/Loader";
import { useState, useEffect } from "react";
import { downloadForm, getDatas } from "../../api/post";
import { ToastContainer } from "react-toastify";
import { BiChevronsLeft } from "react-icons/bi";
import { BiChevronsRight } from "react-icons/bi";
import { AiOutlineDownload } from "react-icons/ai";
export const TablaRelacion = ({ dataSearch }) => {
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
      formData.append("action", "relacionar_conceptos");
      //   SELECT * FROM `jugados` WHERE juego=3 order by correcto DESC, time;

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
    getUser();
  }, [dataSearch]);

  const totalPages = Math.ceil(user.length / usersPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const handleDownload = async (id) => {
    try {
      const formdata = new FormData();
      formdata.append("action", "descargar_relacionar");
      formdata.append("iduser", id);

      const response = await downloadForm(formdata);
      if (response && response.status === 200) {
        const blob = new Blob([response.data], {
          type: "application/vnd.ms-excel",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "relacionar.xls";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url); // Limpia el URL del objeto después de la descarga
        a.remove();
        toast.success("Descargando ...");
      } else {
        toast.error("Este usuario no tiene formularios llenados");
      }
    } catch (error) {
      toast.error("Error al descargar archivo, intenta más tarde");
    }
  };
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default ">
        <div className="max-w-full overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-xl  mb-4 text-center">
              Ranking - Relacione los conceptos
            </h2>
            <button
              onClick={ handleDownload}
              className="inline-flex items-center justify-center rounded-md bg-green-500 py-3 px-10 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Descargar
              <AiOutlineDownload className="text-xl" />
            </button>
          </div>

          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray text-left ">
                <th className="min-w-[20px] py-4 px-4 text-red-500 font-bold text-center  xl:pl-11">
                  Puesto
                </th>
                <th className="min-w-[140px] py-4 px-4 text-black font-bold xl:pl-11">
                  Jugador
                </th>
                <th className="min-w-[140px] py-4 px-4 text-black font-bold xl:pl-11">
                  Email
                </th>
                <th className="min-w-[140px] py-4 px-4 text-black font-bold xl:pl-11">
                  Visitador
                </th>
                <th className="min-w-[140px] py-4 px-4 text-black font-bold xl:pl-11">
                  Celular
                </th>
                <th className="min-w-[150px] py-4 px-4 text-black font-bold ">
                  Juego
                </th>
                <th className="min-w-[80px] py-4 px-4 text-black font-bold ">
                  Correctos
                </th>
                <th className="min-w-[80px] py-4 px-4 text-black font-bold ">
                  Incorrectos
                </th>
                <th className="py-4 px-4 text-black font-bold ">Tiempo</th>
                {/* <th className="py-4 px-4 text-black font-bold ">Acciones</th> */}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    className="border-b border-[#eee] py-5 px-4 pl-9 "
                    colSpan={8} // Ajusta el colspan según la cantidad de columnas de tu tabla
                  >
                    <Loader />{" "}
                    {/* Muestra el loader mientras loading es true */}
                  </td>
                </tr>
              ) : errors ? (
                <tr>
                  <td
                    className="border-b border-[#eee] py-5 px-4 pl-9 "
                    colSpan={8} // Ajusta el colspan según la cantidad de columnas de tu tabla
                  >
                    <h5 className="font-bold text-danger">{errors}</h5>
                  </td>
                </tr>
              ) : (
                currentUsers.map((item, index) => (
                  <tr key={index}>
                    <td className="border-b border-[#eee] text-center font-bold py-5 px-4 ">
                      <p className="text-red-500 text-center font-bold ">
                        {" "}
                        {indexOfFirstUser + index + 1}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 ">
                      {item.cliente_nombre}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 ">
                      {item.email}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 ">
                      {item.usuario_nombre}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 ">
                      {item.celular}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4">
                      <span>Relacione los conceptos</span>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 ">
                      {item.correcto}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 ">
                      {item.incorrecto}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 ">
                      {item.time}
                    </td>
                    {/* <td className="border-b border-[#eee] py-5 px-4 ">
                      <div className="flex items-center space-x-3.5">
                        <button
                          onClick={() => handleDownload(item.id)}
                          className="font-bold flex items-center gap-1 bg-green-400 px-2 rounded-[4px] py-1"
                        >
                          <AiOutlineDownload className="text-xl" />
                          Descargar
                          <AiFillFileExcel />
                        </button>
                        <button
                          onClick={() =>
                            handleChangeStatus(
                              parseInt(item.activo) === 1 ? 0 : 1,
                              item.id
                            )
                          }
                          className={`hover:text-red-500 p-1 rounded-md ${
                            parseInt(item.activo) === 1
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          <BiPowerOff className="text-xl" />
                        </button>
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
                Participantes: <strong>{user.length}</strong>
              </div>

              <div className="flex items-center justify-between gap-2">
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
