import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './AppRoutes'; // Asegúrate que la ruta sea correcta
import { CssBaseline } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <AppRoutes />
  </React.StrictMode>
);
