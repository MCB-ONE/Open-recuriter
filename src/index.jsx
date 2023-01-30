// Imports de React
import React from 'react';
import ReactDOM from 'react-dom';
// Redux imports
import { Provider } from 'react-redux';

// Store and main component import
import store from './store/index';
import App from './components/App';

// Style sheets imports
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/css/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
