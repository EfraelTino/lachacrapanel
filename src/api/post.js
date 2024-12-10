import axios from "axios";

// DOMINIO ACÁ
const APIBASE = "https://apiadmin.aniversariohero.com/conexion/superadmin.php";   
// const APIBASE = "http://localhost/admin_hero/conexion/admin.php";

axios.defaults.withCredentials = true;

export const getDatas = async (data) => {
  try {
    return await axios.post(APIBASE, data);
  } catch (error) {
    console.log("error en catch: ", error);
    return;
  }
};
export const downloadForm = async (data) => {
  try {
    const response = await axios.post(APIBASE, data, {
      responseType: "blob", // Importante para manejar la respuesta binaria
    });    
    return response;
  } catch (error) {
    return;
  }
};
