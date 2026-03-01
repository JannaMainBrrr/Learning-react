import { useParams, Link, Outlet } from "react-router-dom";
import GameTabs from "./components/GameTabs";
import type { Game } from "../../types/game.types";
import { useGame } from "../../hooks/useGame";

/* A useParams() egy hook, ami kiolvassa az aktuális URL paramétereket
  Ha az url: /games/minecraft és a route games/:gameId  , akkor a useParams() ezt az objektumot adja vissza: {gameId: "minecraft"} 
*/

/*
Az Outlet context egy OBJEKTUM, aminek van egy game property-je, ami Game típusú
*/
export type GameDetailsOutletContext = {
  game: Game;
};

export default function GameDetailsPage() {
  const { gameId } = useParams<{ gameId?: string }>();
  const { game, loading, error, notFound } = useGame(gameId);

  // Early returnok állapot alapján
  if (loading) {
    return <p>Loading game...</p>;
  }

  if (error) {
    return (
      <div>
        <h1>Could not load game</h1>
        <p>{error}</p>
        <Link to="/games">Back to the games</Link>
      </div>
    );
  }

  if (notFound || !game) {
    return (
      <div>
        <h1>Game not found</h1>
        <p>Game not found: {String(gameId)}</p>
        <Link to="/games">Back to the games</Link>
      </div>
    );
  }

  // Success render
  return (
    <div className="gameDetailsPage">
      <div className="gameDetailsPage__tab">
        <GameTabs />
      </div>

      <div className="gameDetailsPage__content">
        <Outlet context={{ game }} />
      </div>
    </div>
  );
}
