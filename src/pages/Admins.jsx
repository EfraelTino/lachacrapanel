import { useState } from "react";
import { LinkComponent } from "../components/Button/LinkComponent";
import { SearchItem } from "../components/Button/SearchItem";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { TitleItem } from "../components/TitleItem";
import { TableUser } from "../components/Tables/TableUser";
import { getDatas } from "../api/post";
import { toast } from "react-toastify";

const Admins = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Estado para el loader

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true); // Activa el loader

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("action", "add_csv");
      const response = await getDatas(formData);

      console.log(response);
      if (response.data.success) {
        window.location.reload();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Hubo un problema al cargar el archivo");
    } finally {
      setIsLoading(false); // Desactiva el loader
    }
  };

  return (
    <>
      <TitleItem pageName="Todos las placas" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 2xl:gap-7.5 mt-3">
        <div className="grid grid-cols-1 gap-1 sm:gap-9 sm:grid-cols-2 items-center">
          <SearchItem handleSearch={handleSearch} />
          <form className="gap-3 flex items-center" onSubmit={handleUpload}>
            <input
              className="rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-verde  active:border-verde  disabled:cursor-default disabled:bg-white"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              disabled={isLoading} // Deshabilitar input mientras carga
            />
            <button
              type="submit"
              className={`inline-flex items-center justify-center rounded-md bg-red-600 py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading} // Deshabilitar botón mientras carga
            >
              {isLoading ? "Cargando..." : "Cargar CSV"}
            </button>
          </form>
        </div>
        <TableUser dataSearch={searchTerm} />
      </div>
    </>
  );
};

export default Admins;
