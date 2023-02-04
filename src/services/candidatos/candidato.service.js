import axiosConfig from '../../utils/axios.config';
import sleep from '../../utils/sleep';
// import authHeader from '../auth/auth-header';

// Call auth header auxiliar function to generate the request`s headers to include the bearer token
const getAllCandidatos = async ({ query = '' }) => {
  if (query === '') {
    await sleep(2000);
    return axiosConfig.get('candidato');
  }
  return axiosConfig.get(`candidato/?${query}`);
};

const getCandidatosById = (id) => {
  return axiosConfig.get(`candidato/${id}`);
};

// // TODO finish the CRUD services
// const createCandidato = (candidato) => {
//   return axiosConfig.post('candidato', candidato, { headers: authHeader() });
// };

const updateCandidato = ({ id, updatedFormData }) => {
  console.log(id);
  return axiosConfig.patch(`candidato/${id}`, updatedFormData);
};

// const updateCandidatoTag = ({ id, tecnologias }) => {
//   const data = {
//     tecnologias,
//   };
//   return axiosConfig.put(`candidato/${id}`, data, { headers: authHeader() });
// };

const candidatosService = {
  getAllCandidatos,
  getCandidatosById,
  //   createCandidato,
  updateCandidato,
//   updateCandidatoTag,
};

export default candidatosService;
