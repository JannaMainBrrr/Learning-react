import { Link } from "react-router-dom";
import "./GamesPage.css";
import { getGames } from "../../services/games.service";
import type { Game } from "../../types/game.types";
import { useState, useEffect } from "react";

export default function GamesPage() {
  //Adatlekérésnek 3 fontos állapota lesz: Loading, error és games.
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true); //Amikor betölt az oldal (első render) még nincs adat, ezért true
  const [error, setError] = useState<string | null>(null);

  /* 
  Ez a blokk:
    Van egy useEffect, abban egy async func.
    Van egy try-catch-finally blokk.
    3 early return
    + Megfelelő státuszállítások
  
  Részletesen:
    useEffect -> Futtasd le a kódot render után, a végén ott a dependency array [] -> hogy ne minden render után fusson. Így fog csak mountkor lefutni.
    useEffect callback nem lehet async, ezért csinálunk benne egy async függvényt amit azonnal meg is hívunk.
  Sorrend:  
    Komponens mount
    useEffect lefut
    loading = true
    getGames elindul
    React renderel: Loading UI
    Promise visszaér
    setGames(data)
    setLoading(false)
    React újrarenderel: megjelenik a lista
  */
  useEffect(() => {
    let cancelled = false; //Arra az esetre, ha elnavigálna a user, mielőtt visszatér a fetch()
    //Jelenleg csak 1x fut le amikor betölt az oldal
    (async function load() {
      //Később még hasznos lehet, ha itt ugyanúgy beállítjuk a státuszokat
      setLoading(true);
      setError(null);
      //Várjuk az adatot, ha unmount történik -> return
      try {
        const data = await getGames();
        if (cancelled) return;
        //Ha megjön az adat, beállítjuk a gamest vele
        setGames(data);
      } catch (err) {
        if (cancelled) return;
        //TS furcsaság: Az err típusa unknown -> Ha tényleg Error típusú, akkor kiolvassuk, ha nem akkor fallback string
        //Az err insanceof Error egy runtime típus ellenőrzés, mert csak az Error típusnak lesz .message propja.
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        // A finally mindig lefut: Ezzel állítjuk a végén vissza a loading booleant.
      } finally {
        //Siker vagy hiba esetén újrarenderelünk:
        if (cancelled) return;
        setLoading(false);
      }
    })();
    //A useEffect callback 2 dolgot csinálhat: lefut a render után (effect) VAGY visszaad egy cleanup függvényt.
    //Ez a cleanup function, ami 2 esetben lesz hívva: Amikor a komponens unmounttol és amikor a dependency array változik, emiatt pedig újrafut az effect.
    //Az unmount lehet pl.: Elnavigálnak, feltételes render miatt eltűnik a komponens
    return () => {
      cancelled = true;
    };
  }, []);

  /*A useEffect után 4 returnunuk van (3 early return):
  1) Ameddig loading === true, addig loading felirat. A finally részben állítjuk false-ra.
  2) Ha hiba, akkor azt rendereljük ki
  3) Ha a games tömb hossza 0 -> Üres -> Azt rendereljük ki
  4) Az alap UI rész.
  
  Elég lenne egy return is, de akkor bele kéne rakni a feltételeket, ami kevésbé egyszerűbb:
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error...</p>}
      {!loading && !error && (
        <section>
          ...
        </section>
      )}
    </>
  );
*/

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
