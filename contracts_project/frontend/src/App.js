import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import OrganizationsPage from './pages/superadmin/OrganizationsPage';
import ContractsPage from './pages/admin/ContractsPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/superadmin/organizations" element={
            <PrivateRoute roles={['superadmin']}>
              <OrganizationsPage />
            </PrivateRoute>
          } />
          <Route path="/admin/contracts" element={
            <PrivateRoute roles={['admin', 'superadmin']}>
              <ContractsPage />
            </PrivateRoute>
          } />
          <Route path="/manager/contracts" element={
            <PrivateRoute roles={['manager']}>
              <ContractsPage />
            </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;