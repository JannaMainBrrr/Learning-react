import { useEffect, useState } from "react";
import type { SessionRecord } from "../types/session.types";
import { getSessionById } from "../services/session.service";

export function useSessionDetails(sessionId?: string) {
  const [session, setSession] = useState<SessionRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      setNotFound(false);
      setSession(null);
      //Ha a sessionId: undefined VAGY null VAGY üres string "", akkor lesz ez igaz.
      if (!sessionId) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const data = await getSessionById(sessionId);
        if (cancelled) return;

        if (!data) {
          setNotFound(true);
          return;
        }

        setSession(data);
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
  }, [sessionId]);

  return { session, loading, error, notFound };
}
