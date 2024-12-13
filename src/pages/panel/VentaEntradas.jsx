export const VentaEntradas = () => {
  const headerTitles = [
    { name: "#" },
    { name: "Nombres" },
    { name: "Apellidos" },
    { name: "Tipo Documento" },
    { name: "Teléfono" },
    { name: "Email" },
    { name: "N° Adultos" },
    { name: "N° Niños" },
    { name: "Fecha" },
    { name: "Método de pago" },
    { name: "Pago completado" },
  ];

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Venta de entradas</h1>

      <div className="rounded-sm border border-stroke bg-white px-3 pt-3 pb-2 md:px-5 md:pt-6 md:pb-2.5 shadow-default">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto min-w-[800px] border-collapse">
            <thead>
              <tr className="bg-gray text-left">
                {headerTitles.map((item) => (
                  <th
                    key={item.name}
                    className="px-4 py-2 text-sm font-medium text-gray-700"
                  >
                    {item.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b border-gray-300">1</td>
                <td className="px-4 py-2 border-b border-gray-300">
                  Jhon Alejando
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  Casas Dias
                </td>
                <td className="px-4 py-2 border-b border-gray-300">DNI</td>
                <td className="px-4 py-2 border-b border-gray-300">
                  99999999999
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  email@email.com
                </td>
                <td className="px-4 py-2 border-b border-gray-300">200</td>
                <td className="px-4 py-2 border-b border-gray-300">200</td>
                <td className="px-4 py-2 border-b border-gray-300">12/12/24</td>
                <td className="px-4 py-2 border-b border-gray-300">Paypal</td>
                <td className="px-4 py-2 border-b border-gray-300">true</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
