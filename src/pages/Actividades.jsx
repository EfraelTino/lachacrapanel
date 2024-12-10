import React, { useState } from "react";
import { LinkComponent } from "../components/Button/LinkComponent";
import { AiFillPlusCircle } from "react-icons/ai";
import { TitleItem } from "../components/TitleItem";
import { TableActividad } from "../components/Tables/TableActividad";
import { ToastContainer } from "react-toastify";
import { SearchItem } from "../components/Button/SearchItem";

export const Actividades = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // APRENDAMOS A COMO PASAR PROPS Y DEVOLVER AL PADRE
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  return (
    <>
      <TitleItem pageName="Actividad relacionada" />
      <ToastContainer />
      <div className="grid grid-cols-1 gap-4  md:grid-cols-1 md:gap-6 mt-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-9">
          <SearchItem handleSearch={handleSearch} />
          <LinkComponent
            content={"Agregar productos"}
            redirectItem="/panel/new-actividad"
            iconitem={<AiFillPlusCircle className="text-2xl" />}
          />
        </div>
        <TableActividad dataSearch={searchTerm} />
      </div>
    </>
  );
};
