import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

/*
Kapu a védett route-ok előtt: ha nincs bejelentkezve a user, átdob /login-ra, ha be van, akkor továbbengedi a nested route-okat az <Outlet />-en.
Így néz ki a route fa az app.tsx-ben:
  /login (public)
  ProtectedLayout (guard wrapper)
    AppLayout
      index, games, profile, …
A kapu a szülőnél van: Ha az védve van, akkor az összes alatta lévő oldal automatikusan védett. Nem kell minden route köré külön wrapper.

useLocation():
  a React Router hookja, ami megadja az aktuális URL-t és extra infókat. 
    1) user beírja: /games
    2) nincs login → dobjuk /login-ra
    3) de jó lenne login után visszamenni /games-re

*/

export default function ProtectedLayout() {
  const { user } = useAuth(); //user objektbe kér: User objektet vagy null-t kap vissza annak függvényében, hogy van-e login.
  const location = useLocation();

  if (!user) {
    // elmentjük, hova akart menni
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />; //Rendereli az oldalt, amit a router kiválasztott a ProtectedLayout alatt
}
