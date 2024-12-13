import { InputElement } from "../../components/InputElement";

export const SeoPage = () => {
  return (
    <>
      <h1>SEO</h1>

      <form action="" className="flex flex-col gap-5 mt-5">
        <InputElement
          typeElement={"text"}
          idElement={"name"}
          precarga={"NOMBRE DEL SITIO"}
        />

        <InputElement
          typeElement={"text"}
          idElement={"description"}
          precarga={"META DESCRIPTION"}
        />

        <InputElement
          typeElement={"text"}
          idElement={"keywords"}
          precarga={"PALABRAS CLAVES"}
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
