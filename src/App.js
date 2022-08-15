import React, { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';
import { ThemeProvider } from '@mui/material/styles';

import { routes } from './routes'
import { theme } from './theme'

import Layout from './components/Layout';

function App() {
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Layout>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.component} />
            ))}
          </Routes>
        </Layout>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
