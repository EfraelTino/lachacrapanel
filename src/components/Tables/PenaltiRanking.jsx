import { Loader } from "../Complements/Loader";
import { useState, useEffect } from "react";
import { downloadForm, getDatas } from "../../api/post";
import { ToastContainer } from "react-toastify";
import { BiChevronsLeft } from "react-icons/bi";
import { BiChevronsRight } from "react-icons/bi";
import { AiOutlineDownload } from "react-icons/ai";
export const PenaltiRanking = ({ dataSearch }) => {
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
      formData.append("action", "penalti_puntos");
      //   SELECT * FROM `jugados` WHERE juego=3 order by correcto DESC, time;

      const response = await getDatas(formData);
      // console.log(response);
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
      formdata.append("action", "descargar_penalti");
      formdata.append("iduser", id);

      const response = await downloadForm(formdata);
      if (response && response.status === 200) {
        const blob = new Blob([response.data], {
          type: "application/vnd.ms-excel",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "rankingpenalti.xls";
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
          <iframe
            src="https://www.aniversariohero.com/hero/base_datos_uno.php"
            frameborder="0"
            className="w-full min-h-[860px]"
          ></iframe>
        </div>
      </div>
    </>
  );
};
