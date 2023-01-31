import axiosConfig from '../../utils/axios.config';
// import authHeader from '../auth/auth-header';

// Call auth header auxiliar function to generate the request`s headers to include the bearer token
const getAllCandidatos = ({ query = '', page = 1 }) => {
  if (query === '') {
    return axiosConfig.get(`candidato/?page=${page}`);
  }
  return axiosConfig.get(`candidato/?${page}&${query}`);
};

const getCandidatosById = (id) => {
  return axiosConfig.get(`candidato/${id}`);
};

// // TODO finish the CRUD services
// const createCandidato = (candidato) => {
//   return axiosConfig.post('candidato', candidato, { headers: authHeader() });
// };

// const updateCandidato = ({ field, id }) => {
//   const name = Object.keys(field)[0];
//   const value = Object.values(field)[0];
//   const formData = new FormData();
//   formData.append(name, value);
//   return axiosConfig.put(`candidato/${id}`, formData, { headers: authHeader() });
// };

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
//   updateCandidato,
//   updateCandidatoTag,
};

export default candidatosService;
