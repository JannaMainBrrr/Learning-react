import { GAMES } from "../../data/games"; //Ismernie kell neki is a games.ts tartalmát, hisz onnan fogja az egyes objectek információit megkapni
import { useParams, Link } from "react-router-dom";

/* A useParams() egy hook, ami kiolvassa az aktuális URL paramétereket
  Ha az url: /games/minecraft és a route games/:gameId  , akkor a useParams() ezt az objektumot adja vissza: {gameId: "minecraft"} 
*/

export default function GameDetailsPage() {
  //destructuring: const { gameId } =(...) -> “vedd ki a gameId mezőt a visszakapott objektumból”
  //useParams <{}>(); -> Megmondjuk neki explicit, hogy egy objektum jön vissza, aminek van egy gameId nevű string mezője. Ezt írtuk meg a Rotue táblában.
  const { gameId } = useParams<{ gameId: string }>();

  const game = GAMES.find((g) => g.id === gameId); //game.id az id property értékét adja vissza

  //Kikerestük a game propertyből a game.id tartalmát, ha nincs ilyen, akkor vissza navigálunk
  if (!game) {
    return (
      <div>
        <h1> TODO </h1>
        <Link to="/games"> Back to the games</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>TODO</h1>
      <p>Kiválasztott játék: {game.title}</p>
      <Link to="/games">Vissza a listához</Link>
    </div>
  );
}
