import axiosConfig from '../../utils/axios.config';
import sleep from '../../utils/sleep';
// import authHeader from '../auth/auth-header';

const getAllTecnologias = async () => {
  await sleep(2000);
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
