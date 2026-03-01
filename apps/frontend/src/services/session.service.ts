import { sessionsMock } from "../data/sessions.mock";
import type { SessionRecord } from "../types/session.types";

//Fake API késletetés
function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export async function getSessionsByGameId(
  gameId: string,
): Promise<SessionRecord[]> {
  await sleep(120);
  //Visszaadja az összes olyan sessiont, ahol a paraméterül kapott gameId megegyezik a session.gameId-val. pl.: "anno-1800"
  return (
    sessionsMock
      .filter((s) => s.gameId === gameId)
      //A rendezés adatlekérési és nem UI logika, ezért itt is belerakjuk.
      //uploadedAt ISO string, ami lexikografikusan rendezhető, így nem kell Date objektum
      .sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt))
  );
}

export async function getSessionById(
  sessionId: string,
): Promise<SessionRecord | null> {
  await sleep(80);

  return sessionsMock.find((s) => s.id === sessionId) ?? null;
}
