import React from "react";
import { Route, Routes } from 'react-router-dom';

import "./App.css";


import i18n from '@/i18n';
import publicRoutes from '@/routes';
import { LanguageMiddleware } from '@/routes/middlewares';

const App = () => {
  const supportedLngs = i18n.options.supportedLngs || [
    i18n.options.fallbackLng,
  ];

  return (
    <Routes>
      {publicRoutes.map((route, index) => (
        <React.Fragment key={index}>
          <Route
            path={route.path}
            element={<LanguageMiddleware>{route.component}</LanguageMiddleware>}
          />
          {supportedLngs.map((lng) => (
            <Route
              key={`${index}-${lng}`}
              path={`/${lng}/${route.path.replace('/', '')}`}
              element={
                <LanguageMiddleware>{route.component}</LanguageMiddleware>
              }
            />
          ))}
        </React.Fragment>
      ))}
    </Routes>
  );
};

export default App;
