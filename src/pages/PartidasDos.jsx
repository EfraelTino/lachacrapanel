import React, { useState } from "react";
import { TitleItem } from "../components/TitleItem";
import { downloadForm } from "../api/post";

import { PenaltiRankingDos } from "../components/Tables/PenaltiRankingDos";

export const PartidasDos = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // APRENDAMOS A COMO PASAR PROPS Y DEVOLVER AL PADRE

  const handleDownload = async (id) => {
    try {
      const formdata = new FormData();
      formdata.append("action", "download_form");
      formdata.append("iduser", id);

      const response = await downloadForm(formdata);
      if (response && response.status === 200) {
        const blob = new Blob([response.data], {
          type: "application/vnd.ms-excel",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "cliente.xls";
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
      <TitleItem pageName="Base de datos" />

      <div className="grid grid-cols-1 gap-1 md:grid-cols-1 md:gap-6 mt-3 space-y-5">
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-9">
          <div className="col-span-1">
            <SearchItem handleSearch={handleSearch} />
          </div>
          <div className="sm:col-span-1 w-full">
            <button
              onClick={ handleDownload}
              className="inline-flex w-full items-center justify-center rounded-md bg-green-500 py-3 px-10 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              <AiOutlineDownload className="text-xl" />
              Descargar
              <AiFillFileExcel />
            </button>
          </div>
        </div> */}
        {/* <TableForm dataSearch={searchTerm} /> */}
        <PenaltiRankingDos  dataSearch={searchTerm}/>
      </div>
    </>
  );
};
