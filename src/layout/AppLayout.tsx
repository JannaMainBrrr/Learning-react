import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";

import "./AppLayout.css";

//Az AppLayout felel a struktúráért: A header és a sidebar componenseket meghívja + definiálja az elrendezéshez szükséges UI blokkokat, illetve formázza őket. -> Keretet ad
//Az App.tsx-ben minden ami az <AppLayout> ... </AppLayout> között van, az automatikusan props.children
//A {children} helyére kerül pont az, amit az App.tsx-ben beletettünk, tehát a Router által URL alapján kiválasztott és renderelt komponens ebben az esetben.
//Azért van erre szükség, mert az AppLayout: Nem tudja, épp melyik oldal aktív, nem is kell, hogy tudja.

/*
Mi történik renderkor?
1️⃣ A BrowserRouter figyeli az URL-t
2️⃣ A <Routes> megnézi az aktuális URL-t
3️⃣ Kiválasztja: / → <LandingPage /> vagy /games → <GamesPage />
4️⃣ A <Routes> pont egy JSX elemet ad vissza
5️⃣ Ez a JSX elem: <LandingPage /> vagy <GamesPage />
6️⃣ Ez kerül be: props.children
7️⃣ Az AppLayout csak ezt csinálja: <main>{children}</main>
*/

/*
<Outlet />
  Ha az URL /games, akkor:
  Router kiválasztja a parent route-ot az App.tsx-ben ("/")
  Rendereli az AppLayoutot
  Megkeresi a child route-ot ("games")
  A GamesPage-t beteszi az <Outlet /> helyére
 */

export default function AppLayout() {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <Sidebar />
        <main className="mainContent">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
