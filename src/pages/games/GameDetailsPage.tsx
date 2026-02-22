import { useParams, Link, Outlet } from "react-router-dom";
import GameTabs from "./components/GameTabs";
import { getGameById } from "../../services/games.service";
import type { Game } from "../../types/game.types"; //A game típusra továbbra is szükség van

/* A useParams() egy hook, ami kiolvassa az aktuális URL paramétereket
  Ha az url: /games/minecraft és a route games/:gameId  , akkor a useParams() ezt az objektumot adja vissza: {gameId: "minecraft"} 
*/

/*
Az Outlet context egy OBJEKTUM, aminek van egy game property-je, ami Game típusú
*/
export type GameDetailsOutletContext = {
  game: Game;
};

export default function GameDetailsPage() {
  /*
Destructuring: const { gameId } =(...) -> “vedd ki a gameId mezőt a visszakapott objektumból”
useParams <{}>(); -> Megmondjuk neki explicit, hogy egy objektum jön vissza, aminek van egy gameId nevű string mezője. Ezt írtuk meg a Route táblában.
Runtime-ban a gameId lehet undefined, ezért érdemesebb gameId?: -ként megadni
*/
  const { gameId } = useParams<{ gameId?: string }>();

  const game = gameId ? getGameById(gameId) : undefined;

  //Kikerestük a game propertyből a game.id tartalmát, ha nincs ilyen, akkor vissza navigálunk
  if (!game) {
    return (
      <div>
        <h1>Game not found</h1>
        <p>Nem találom ezt a játékot: {String(gameId)}</p>
        <Link to="/games">Back to the games</Link>
      </div>
    );
  }
  /*
Különbség a : és a satisfies között ->
: -> Típus erőltetés “Ez az objektum pontosan GameDetailsOutletContext típusú.”
satisfies -> Ellenőrzés, hogy megfelel-e a típusnak, de meghagyja az eredeti típust. Tehát ha a minimum propertyk megvannak, nem dob hibát, ha van plusszban property, azt meghagyja.
 */
  return (
    <div className="gameDetailsPage">
      <div className="gameDetailsPage__tab">
        <GameTabs />
      </div>
      <div className="gameDetailsPage__content">
        <Outlet context={{ game }} />
      </div>
    </div>
  );
}
