import type { Game } from "../types/game.types";
import { mockGames } from "../data/games.mock";

export function getGames(): Game[] {
  return mockGames;
}

export function getGameById(id: string): Game | undefined {
  return mockGames.find((g) => g.id === id);
}
