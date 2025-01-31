import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider
import App from './App';
import { store } from './store/store'; 

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>  {/* Wrap your App with Provider and pass in the store */}
    <App />
  </Provider>
);
