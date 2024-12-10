import { useState } from "react";
import { SearchItem } from "../components/Button/SearchItem";
import { TableOne } from "../components/Tables/TableOne";
import { TitleItem } from "../components/TitleItem";
import {
  AiFillDownSquare,
  AiOutlineCloudDownload,
  AiOutlineDownload,
} from "react-icons/ai";
import { toast } from "react-toastify";
import { downloadForm } from "../api/post";

const Principal = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // APRENDAMOS A COMO PASAR PROPS Y DEVOLVER AL PADRE
  const handleSearch = (term) => {
    setSearchTerm(term);
  };


  return (
    <>
      <TitleItem pageName="Todos los usuarios" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 2xl:gap-7.5 mt-3">
        <div className="grid grid-cols-1 gap-1 sm:gap-9 sm:grid-cols-2 items-center">
          <SearchItem handleSearch={handleSearch} />
          <a
            href="https://aniversariohero.com/hero/exportar.php"
            className="bg-green-500 flex items-center justify-center text-black py-3 rounded font-bold  gap-2 hover:bg-green-400"
          >
            Descargar
            <AiOutlineDownload className="text-xl" />{" "}
          </a>
        </div>
        <TableOne dataSearch={searchTerm} />
      </div>
    </>
  );
};

export default Principal;
