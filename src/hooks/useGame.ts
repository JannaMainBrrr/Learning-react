import { useEffect, useState } from "react";
import type { Game } from "../types/game.types";
import { getGameById } from "../services/games.service";

export function useGame(gameId?: string) {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      setNotFound(false);
      setGame(null);

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
  }, [gameId]);

  return { game, loading, error, notFound };
}
