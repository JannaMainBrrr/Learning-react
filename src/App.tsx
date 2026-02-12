import { Routes, Route, Navigate } from "react-router-dom";
//  <Routes> --> konténer, amely a benne levő Routeok közül fog MINDIG EGYET kirenderelni.
// <Route> --> Mint egy if feltétel: Ha az URL ilyen, akkor rendereld ezt a komponenst.
// <Navigate> --> Ez egy komponens, ami ÁTÍRJA AZ URL-T. A replace miatt nem marad a historyban, így nem lehet a back-gombbal visszanavigálni oda.
/*
      URL változik (link / navigate)
      Router észreveszi
      Routes dönt
      Route renderel
*/

import LandingPage from "./pages/landing/LandingPage";
import GamesPage from "./pages/games/GamesPage";
import GameDetailsPage from "./pages/games/GameDetailsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import SettingsPage from "./pages/settings/SettingsPage";
import AppLayout from "./layout/AppLayout";

export default function App() {
  function handleLogout() {
    console.log("TODO: logout");
  }

  return (
    <AppLayout onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="games/:gameId" element={<GameDetailsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}
