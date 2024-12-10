import React, { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  AiFillExperiment,
  AiFillEye,
  AiFillHome,
  AiFillPlayCircle,
  AiOutlineDeploymentUnit,
  AiOutlineGlobal,
  AiOutlineKubernetes,
  AiOutlineSwapLeft,
  AiOutlineUsergroupAdd,
  AiOutlineUserSwitch,
} from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { FaWpforms } from "react-icons/fa";
import { SiActivision, SiEbox } from "react-icons/si";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;
  const trigger = useRef(null);
  const sidebar = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, []);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <aside
      ref={sidebar}
      className={`fixed bottom-0 right-0 left-0 top-[5rem] sm:top-0 z-9999 flex sm:min-h-[100vh]   flex-col overflow-y-hidden bg-black duration-300 ease-linear sm:static sm:translate-x-0 ${
        sidebarOpen ? "-translate-x-full w-0" : "translate-x-0 sm:w-72.5"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className=" hidden sm:flex items-center justify-between gap-2 px-6 py-5.5  sm:py-6.5">
        <NavLink to="/" className="hidden sm:flex">
          <img
            src="https://aniversariohero.com/hero/images/herotenyears.png"
            alt="Logo"
          />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block "
        >
          <svg
            className="fill-white"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="py-4 px-1 sm:mt-0 sm:px-6 lg:mt-9">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="hidden  sm:flex sm:text-xl mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>
            <ul className="sm:mb-6 grid grid-cols-2 sm:flex sm:flex-col gap-1.5">
              {/* <!-- Menu Item Calendar --> */}
                <>
               
                  <li>
                    <NavLink
                      to="/panel"
                      className={`group relative flex flex-col justify-center sm:flex-row sm:justify-normal items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
                        pathname === "/panel" && "bg-graydark"
                      }`}
                    >
                      <AiFillHome className="text-2xl" />
                      <span className="sm:text-xl">Principal</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/seo"
                      className={`group relative flex flex-col justify-center sm:flex-row sm:justify-normal items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
                        pathname === "/seo" && "bg-graydark"
                      }`}
                    >
                      <SiEbox className="text-2xl" />
                      <span className="sm:text-xl">SEO</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="videos"
                      className={`group relative flex flex-col justify-center sm:flex-row sm:justify-normal items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
                        pathname.includes("videos") && "bg-graydark "
                      }`}
                    >
                      <AiFillPlayCircle className="text-2xl" />
                      <span className="sm:text-xl">Imagina & videos</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="experiencia"
                      className={`group relative flex flex-col justify-center items-center  sm:flex-row sm:justify-normal gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
                        pathname.includes("experiencia") && "bg-graydark "
                      }`}
                    >
                      <AiOutlineGlobal className="text-2xl" />
                      <span className="sm:text-xl">Experiencia</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="comunidad"
                      className={`group relative flex flex-col justify-center items-center  sm:flex-row sm:justify-normal gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
                        pathname.includes("comunidad") && "bg-graydark "
                      }`}
                    >
                      <AiOutlineUserSwitch className="text-2xl" />
                      <span className="sm:text-xl">Comunidad</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="talleres"
                      className={`group relative flex flex-col justify-center items-center  sm:flex-row sm:justify-normal gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
                        pathname.includes("talleres") && "bg-graydark "
                      }`}
                    >
                      <AiFillExperiment className="text-2xl" />
                      <span className="sm:text-xl">Talleres</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="mision"
                      className={`group relative flex flex-col justify-center items-center  sm:flex-row sm:justify-normal gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
                        pathname.includes("mision") && "bg-graydark "
                      }`}
                    >
                      <AiFillEye className="text-2xl" />
                      <span className="sm:text-xl">Misón</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="vision"
                      className={`group relative flex flex-col justify-center items-center  sm:flex-row sm:justify-normal gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
                        pathname.includes("vision") && "bg-graydark "
                      }`}
                    >
                      <SiActivision className="text-2xl" />
                      <span className="sm:text-xl">Visión</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="vision"
                      className={`group relative flex flex-col justify-center items-center  sm:flex-row sm:justify-normal gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
                        pathname.includes("vision") && "bg-graydark "
                      }`}
                    >
                      <AiOutlineSwapLeft className="text-2xl" />
                      <span className="sm:text-xl">Venta de entradas</span>
                    </NavLink>
                  </li>
                </>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
