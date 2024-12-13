import { InputElement } from "../../components/InputElement";

export const PrincipalPage = () => {
  return (
    <>
      <h1>Sección principal</h1>

      <form action="" className="flex flex-col gap-5 mt-5">
        <InputElement typeElement={"file"} idElement={"file"} />
        <InputElement
          typeElement={"text"}
          precarga={"TÍTULO"}
          idElement={"title"}
        />
        <InputElement
          typeElement={"text"}
          precarga={"TEXTO DEL BOTÓN"}
          idElement={"text-btn"}
        />
        <InputElement
          typeElement={"text"}
          precarga={"REDIRECCIÓN DE BOTÓN"}
          idElement={"redirection-btn"}
        />

        <div>
          <button className="p-3 bg-green-600 text-white font-semibold rounded-md">
            Guardar
          </button>
        </div>
      </form>
    </>
  );
};
