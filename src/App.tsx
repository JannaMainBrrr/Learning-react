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
import LoginPageInt from "./pages/login/LoginPageInt";
import ProtectedLayout from "./auth/ProtectedLayout";
import GameAnalyzeTab from "./pages/games/tabs/GameAnalyzeTab";
import GameCompareTab from "./pages/games/tabs/GameCompare";
import GameOverviewTab from "./pages/games/tabs/GameOverviewTab";
import GameSessionsTab from "./pages/games/tabs/GameSessionsTab";

export default function App() {
  //Index element: Ha pontosan a szülő útvonalon vagyunk ("/") és nincs további path szegmens, akkor ezt fogja renderelni.
  //A ProtectedLayout egy “névtelen” route wrapper: csak azt mondja, hogy a benne lévő route-ok védettek, és ő adja az <Outlet />-et.
  return (
    <Routes>
      <Route path="/login" element={<LoginPageInt />} />

      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="games" element={<GamesPage />} />
          <Route path="games/:gameId" element={<GameDetailsPage />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<GameOverviewTab />} />
            <Route path="compare" element={<GameCompareTab />} />
            <Route path="analyze" element={<GameAnalyzeTab />} />
            <Route path="sessions" element={<GameSessionsTab />} />
            <Route path="*" element={<Navigate to="overview" replace />} />
          </Route>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
