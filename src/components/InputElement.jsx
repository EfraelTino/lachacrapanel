export const InputElement = ({
  typeElement,
  idElement,
  dataValue,
  precarga,
}) => {
  return (
    <input
      type={typeElement}
      id={idElement}
      value={dataValue}
      placeholder={precarga}
      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-verde  active:border-verde  disabled:cursor-default disabled:bg-whiter"
    />
  );
};
