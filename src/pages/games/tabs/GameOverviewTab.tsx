import { useOutletContext } from "react-router-dom";
import type { GameDetailsOutletContext } from "../GameDetailsPage";

export default function GameOverviewTab() {
  const { game } = useOutletContext<GameDetailsOutletContext>();

  return (
    <section>
      <h2>Overview</h2>

      <p>
        <strong>Title:</strong> {game.title}
      </p>

      {game.releaseYear != null && (
        <p>
          <strong>Release year:</strong> {game.releaseYear}
        </p>
      )}

      {game.genre && (
        <p>
          <strong>Genre:</strong> {game.genre}
        </p>
      )}

      {game.description ? (
        <p>{game.description}</p>
      ) : (
        <p>No description yet.</p>
      )}
    </section>
  );
}
