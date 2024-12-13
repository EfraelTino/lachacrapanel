import { InputElement } from "../../components/InputElement";

export const TalleresPage = () => {
  return (
    <>
      <h1>Talleres</h1>
      <form action="" className="flex flex-col gap-5 mt-5">
        <div className="flex items-center gap-3">
          <div className="space-y-2">
            <label htmlFor="img-bg">Imagen de fondo</label>
            <InputElement
              typeElement={"file"}
              idElement={"img-bg"}
              precarga={"FOTOGRAFÍA DE FONDO"}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="img-principal">Imagen principal</label>
            <InputElement
              typeElement={"file"}
              idElement={"img-principal"}
              precarga={"FOTOGRAFÍA DE FONDO"}
            />
          </div>
        </div>

        <InputElement
          typeElement={"text"}
          idElement={"title"}
          precarga={"TÍTULO"}
        />

        <InputElement
          typeElement={"text"}
          idElement={"description"}
          precarga={"DESCRIPCIÓN DEL TALLER"}
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
