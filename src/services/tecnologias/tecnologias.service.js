import axiosConfig from '../../utils/axios.config';
// import authHeader from '../auth/auth-header';

const getAllTecnologias = () => {
  return axiosConfig.get('tecnologia');
};

const getTecnologiasById = (id) => {
  return axiosConfig.get(`tecnologia/${id}`);
};
// TODO finishs the CRUD services

const tecnologiasService = {
  getAllTecnologias,
  getTecnologiasById,
};

export default tecnologiasService;
