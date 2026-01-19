import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Listings } from './pages/Listings';
import { PropertyDetails } from './pages/PropertyDetails';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Favorites } from './pages/Favorites';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import Lofts from './pages/Admin/Lofts';
import LoftForm from './pages/Admin/LoftForm';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import AdminLayout from './components/Admin/AdminLayout';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <FavoritesProvider>
        <Router>
          <Routes>
            <Route path="/admin" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="lofts" element={<Lofts />} />
                <Route path="lofts/new" element={<LoftForm />} />
                <Route path="lofts/edit/:id" element={<LoftForm />} />
              </Route>
            </Route>
            <Route
              path="/*"
              element={
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/imoveis" element={<Listings />} />
                    <Route path="/imoveis/:id" element={<PropertyDetails />} />
                    <Route path="/sobre" element={<About />} />
                    <Route path="/contato" element={<Contact />} />
                    <Route path="/favoritos" element={<Favorites />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Layout>
              }
            />
          </Routes>
        </Router>
      </FavoritesProvider>
    </LanguageProvider>
  );
};

export default App;