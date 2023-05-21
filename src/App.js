import React from 'react';
import { Routes, Route, } from 'react-router-dom'
import './App.css';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from './theme'

import Layout from './components/Layout';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Login from './pages/Login';
import { RequireAuth } from './components/RequireAuth';
import PolicyPrivacy from './pages/PolicyPrivacy';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={
            <RequireAuth>
              <Users />
            </RequireAuth>
          } />
          <Route path="/settings" element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          } />
          <Route path="/policy-and-privacy" element={
            <RequireAuth>
              <PolicyPrivacy />
            </RequireAuth>
          } />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
