import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";

export const SearchItems = ({ handleSearch }) => {
  const [userSearch, setUserSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(userSearch);
  };
  const handleClear = () =>{
    setUserSearch("");
    handleSearch("");
  }
  return (
   <div className="col-span-1">
     <div className="grid grid-cols-3 gap-1 md:grid-cols-4">
      <form onSubmit={handleSubmit} className="col-span-3">
        <div className="relative ">
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
            <BiSearchAlt className="fill-body hover:fill-verde   text-2xl" />
          </button>
          <input
            type="text"
            id="user"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            placeholder="Buscar usuario..."
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-verde  active:border-verde  disabled:cursor-default disabled:bg-white"
          />
        </div>
      </form>
      <button onClick={handleClear} className="col-span-1 inline-flex items-center justify-center rounded-md bg-verde  py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">Cancelar</button>
    </div>
   </div>
  );
};
