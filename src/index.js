import React from 'react';
// import { createRoot } from 'react-dom/client';
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import './index.css';

// const container = document.getElementById('root');
// const root = createRoot(container);

// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );

const root = document.getElementById("root");
render(
<React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
</React.StrictMode>, root);