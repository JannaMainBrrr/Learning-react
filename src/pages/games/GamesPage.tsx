import { Link } from "react-router-dom";
import "./GamesPage.css";
import { useGames } from "../../hooks/useGames";

export default function GamesPage() {
  //Adatlekérésnek 3 fontos állapota lesz: Loading, error és games.
  const { games, loading, error } = useGames();

  if (loading) {
    return <p className="gamesPage">Loading games...</p>;
  }

  if (error) {
    return (
      <div className="gamesPage">
        <h1>Could not load games</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="gamesPage">
        <h1>No games yet</h1>
      </div>
    );
  }

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
