import { useParams, Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import GameTabs from "./components/GameTabs";
import { getGameById } from "../../services/games.service";
import type { Game } from "../../types/game.types"; //A game típusra továbbra is szükség van

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
  /*
Destructuring: const { gameId } =(...) -> “vedd ki a gameId mezőt a visszakapott objektumból”
useParams <{}>(); -> Megmondjuk neki explicit, hogy egy objektum jön vissza, aminek van egy gameId nevű string mezője. Ezt írtuk meg a Route táblában.
Runtime-ban a gameId lehet undefined, ezért érdemesebb gameId?: -ként megadni
*/
  const { gameId } = useParams<{ gameId?: string }>();

  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true); //Amikor betölt az oldal (első render) még nincs adat, ezért true
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      // reset minden új lekérés előtt
      setLoading(true);
      setError(null);
      setNotFound(false);
      setGame(null);

      // ha nincs gameId (rossz route), kezeljük not found-ként
      if (!gameId) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const data = await getGameById(gameId);
        if (cancelled) return;

        if (!data) {
          setNotFound(true);
          return;
        }

        setGame(data);
      } catch (err) {
        if (cancelled) return;

        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      } finally {
        if (cancelled) return;
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [gameId]); // <-- Dependency array nem üres: param változáskor újra lekér

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
