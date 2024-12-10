import { Loader } from "../Complements/Loader";
import { useState, useEffect } from "react";
import { getDatas } from "../../api/post";
import { BiChevronsLeft } from "react-icons/bi";
import { BiChevronsRight } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { APIMAGE } from "../../util/util";
import { toast } from "react-toastify";
export const TableActividad = ({ dataSearch }) => {
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
      formData.append("action", "seerelacionar");
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
    if(dataSearch){
      handleSearch();

    }else{
      getUser();
    }
  }, [dataSearch]);
  const handleSearch = () => {
    setLoading(true);
    const nuevoUser = user.filter(item =>
      item.nombreproducto.toLowerCase().includes(dataSearch.toLowerCase())
    );
    console.log(nuevoUser)
    setUser(nuevoUser);
    setLoading(false);
  };



  const totalPages = Math.ceil(user.length / usersPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const handleDelete = async (id) => {
    const formData = new FormData();
    formData.append("action", "deleteproducto");
    formData.append("idproduct", id);
    formData.append("tipo", 3);
    const response = await getDatas(formData);
    const { message, success } = response.data;
    if (!success) {
      toast.error(message);
      return;
    }
    toast.success(message);
    setUser(user.filter((user) => user.id !== id));
  };
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default  sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray text-left ">
                <th className="min-w-[20px] py-4 px-4 text-red-500 text-center xl:pl-11 font-bold">
                  #
                </th>
                <th className="min-w-[140px] py-4 px-4 text-black font-bold  xl:pl-11">
                  Nombre del producto
                </th>
                <th className="min-w-[150px] py-4 px-4 text-black font-bold ">
                  Imagen
                </th>
                <th className="py-4 px-4 text-black font-bold ">Acciones</th>
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
                    <h5 className="font-bold text-danger  text-center">
                      {errors}
                    </h5>
                  </td>
                </tr>
              ) : (
                currentUsers.map((item, index) => (
                  <tr key={index}>
                    <td className="border-b border-[#eee] text-center py-5 px-4text-red-500 font-bold ">
                      {index + 1}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 ">
                      {item.nombreproducto}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 ">
                      <img
                        src={`${APIMAGE}${item.imagen}`}
                        alt="IMAGEN DE PRODUCTO"
                        className="w-[60px]"
                      />
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 ">
                      <div className="flex items-center space-x-3.5">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="hover:bg-red-500 rounded-md py-1"
                        >
                          <AiFillDelete className="text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="pagination w-full mt-2">
            <div className="flex justify-end gap-2 items-center">
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
    </>
  );
};
