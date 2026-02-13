import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};

