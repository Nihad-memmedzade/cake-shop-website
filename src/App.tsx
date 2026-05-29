import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";

import i18n from "@/i18n";
import publicRoutes from "@/routes";
import { LanguageMiddleware } from "@/routes/middlewares";
import { getMeThunk } from "@/store/authSlice";
import { fetchWishlist, restoreGuestWishlist } from "@/store/wishlistSlice";
import { fetchCart, restoreGuestCart } from "@/store/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

const App = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const supportedLngs = i18n.options.supportedLngs || [
    i18n.options.fallbackLng,
  ];

useEffect(() => {
  if (accessToken) {
    dispatch(getMeThunk());
    dispatch(fetchWishlist());
    dispatch(fetchCart());
  } else {
    dispatch(restoreGuestWishlist());
    dispatch(restoreGuestCart());
  }
}, [accessToken, dispatch]);

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
              path={`/${lng}/${route.path.replace("/", "")}`}
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
