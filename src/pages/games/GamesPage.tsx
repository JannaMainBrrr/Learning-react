import { Link } from "react-router-dom";
import "./GamesPage.css";
import { getGames } from "../../services/games.service";

export default function GamesPage() {
  const games = getGames();

  return (
    <section className="gamesPage">
      <header className="gamesPage__header">
        <h1 className="gamesPage__title">Welcome to the games page!</h1>
      </header>
      <div className="gamesPage__grid">
        {games.map((game) => (
          <Link
            key={game.id}
            to={`/games/${game.id}`}
            className="gamesPage__card"
          >
            <div className="gamesPage__cardInner">
              <img
                className="gamesPage__cover"
                src={game.coverUrl}
                alt={game.title}
                loading="lazy"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
