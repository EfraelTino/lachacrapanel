import { InputElement } from "../../components/InputElement";

export const ImaginaVideosPage = () => {
  return (
    <>
      <h1>Imagina & Videos</h1>

      <form action="" className="flex flex-col gap-5 mt-5">
        <InputElement idElement={"title"} precarga={"TÍTULO"} />
        <InputElement idElement={"description"} precarga={"DESCRIPCIÓN"} />
        <InputElement idElement={"link-1"} precarga={"ENLACE DEL VIDEO 1"} />
        <InputElement idElement={"link-2"} precarga={"ENLACE DEL VIDEO 2"} />
        <InputElement idElement={"link-3"} precarga={"ENLACE DEL VIDEO 3"} />

        <div>
          <button className="p-3 bg-green-600 text-white font-semibold rounded-md">
            Guardar
          </button>
        </div>
      </form>
    </>
  );
};
