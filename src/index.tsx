import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {setupStore} from "./store/store";
import {persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const store = setupStore();
export const persistor = persistStore(store);

root.render(
  <React.StrictMode>
      <Provider store={store}>
          <PersistGate persistor={persistor} >
              <App />
          </PersistGate>
      </Provider>
  </React.StrictMode>
);
