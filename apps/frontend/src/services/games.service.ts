import type { Game } from "../types/game.types";
import { mockGames } from "../data/games.mock";

export async function getGames(): Promise<Game[]> {
  return mockGames;
}

export async function getGameById(id: string): Promise<Game | undefined> {
  return mockGames.find((g) => g.id === id);
}
