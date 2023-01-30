import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './slices/auth';
import messageReducer from './slices/message';
import candidatosReducer from './slices/candidatos';
// import tecnologiasReducer from './slices/tecnologias';
import clientesReducer from './slices/clientes';

// Redux store configuration
const reducer = {
  // auth: authReducer,
  message: messageReducer,
  candidatos: candidatosReducer,
  // tecnologias: tecnologiasReducer,
  clientes: clientesReducer,
};

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
