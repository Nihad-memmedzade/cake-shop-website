import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";

import "./App.css";

import i18n from "@/i18n";
import publicRoutes from "@/routes";
import { LanguageMiddleware } from "@/routes/middlewares";
import { getMeThunk } from "@/store/authSlice";
import {
  fetchCart,
  restoreGuestCart,
} from "@/store/cartSlice";
import {
  fetchWishlist,
  restoreGuestWishlist,
} from "@/store/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

const App = () => {
  const dispatch = useAppDispatch();
  const { i18n: translationInstance } = useTranslation();

  const accessToken = useAppSelector(
    (state) => state.auth.accessToken,
  );

  const currentLanguage =
    translationInstance.resolvedLanguage?.split("-")[0] ||
    translationInstance.language?.split("-")[0] ||
    "en";

  const supportedLngs = i18n.options.supportedLngs || [
    i18n.options.fallbackLng,
  ];

  useEffect(() => {
    if (accessToken) {
      dispatch(getMeThunk());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchWishlist());
      dispatch(fetchCart());
      return;
    }

    dispatch(restoreGuestWishlist());
    dispatch(restoreGuestCart());
  }, [accessToken, currentLanguage, dispatch]);

  return (
    <Routes>
      {publicRoutes.map((route, index) => (
        <React.Fragment key={route.path || index}>
          <Route
            path={route.path}
            element={
              <LanguageMiddleware>
                {route.component}
              </LanguageMiddleware>
            }
          />

          {supportedLngs.map((lng) => (
            <Route
              key={`${route.path}-${lng}`}
              path={`/${lng}/${route.path.replace("/", "")}`}
              element={
                <LanguageMiddleware>
                  {route.component}
                </LanguageMiddleware>
              }
            />
          ))}
        </React.Fragment>
      ))}
    </Routes>
  );
};

export default App;