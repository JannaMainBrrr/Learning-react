import { useEffect, useState } from "react";
import type { SessionRecord } from "../types/session.types";
import { getSessionsByGameId } from "../services/session.service";

export function useSessions(gameId?: string) {
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      setNotFound(false);
      setSessions([]);

      if (!gameId) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const data = await getSessionsByGameId(gameId);
        if (cancelled) return;

        // Üres lista OK -> nem notFound
        setSessions(data);
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
    //Dependency array tartalma, ha változik, akkor fut az effect. (Újrarender)
  }, [gameId]);

  return { sessions, loading, error, notFound };
}
