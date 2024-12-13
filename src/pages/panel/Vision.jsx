import { InputElement } from "../../components/InputElement";

export const VisionPage = () => {
  return (
    <>
      <h1>Visión</h1>

      <form action="" className="flex flex-col gap-5 mt-5">
        <InputElement idElement={"file"} typeElement={"file"} />
        <InputElement
          idElement={"title"}
          typeElement={"text"}
          precarga={"TÍTULO"}
        />
        <InputElement
          idElement={"description"}
          typeElement={"text"}
          precarga={"DESCRIPCIÓN"}
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
