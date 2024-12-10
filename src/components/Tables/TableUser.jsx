import { useState, useEffect } from "react";
import { getDatas } from "../../api/post";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineEye } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { BiPowerOff } from "react-icons/bi";
import { BiChevronsLeft } from "react-icons/bi";
import { BiChevronsRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Loader } from "../Complements/Loader";

export const TableUser = ({ dataSearch }) => {
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
      formData.append("action", "get_placas");
      const response = await getDatas(formData);
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
      formData.append("action", "search_placa");
      formData.append("searchcamp", term);
      const response = await getDatas(formData);

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

  return (
    <>
      <ToastContainer position="top-center" />

      <div className="rounded-sm border border-stroke bg-white px-3 pt-3 pb-2 md:px-5 md:pt-6 md:pb-2.5 shadow-defaul">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray text-left">
                <th className="min-w-[20px] py-4 px-4 text-red-500 text-center font-bold  xl:pl-11">
                  #
                </th>

                <th className="min-w-[140px] py-4 px-4 text-black font-bold xl:pl-11">
                  PLACA
                </th>

              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    className="border-b border-[#eee] py-5 px-4 pl-9  xl:pl-11"
                    colSpan={2} // Ajusta el colspan según la cantidad de columnas de tu tabla
                  >
                    <Loader />{" "}
                    {/* Muestra el loader mientras loading es true */}
                  </td>
                </tr>
              ) : errors ? (
                <tr>
                  <td
                    className="border-b border-[#eee] py-5 px-4 pl-9  xl:pl-11"
                    colSpan={2} // Ajusta el colspan según la cantidad de columnas de tu tabla
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
                      <p className="text-black ">{`${item.placa}`}</p>
                    </td>
  
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="pagination w-full mt-2">
            <div className="flex justify-between gap-2 items-center">
              <div className="">
                Cantidad de placas: <strong>{user.length}</strong>
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
