import { useEffect, useState } from "react";
import type { Game } from "../types/game.types";
import { getGames } from "../services/games.service";

/*
A hook feladata lesz kezelni a:
    async (loading) részt
    hibát
    state-t
    react Lifecyclet
    stb.
Érdemes külön fileba megírni, hogy ne kelljen minden komponensben megismételni.
 */

export function useGames() {
  //Adatlekérésnek 3 fontos állapota lesz: Loading, error és games.
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
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
    //Arra az esetre, ha elnavigálna a user, mielőtt visszatér a fetch()
    //Jelenleg csak 1x fut le amikor betölt az oldal
    let cancelled = false;

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

  return { games, loading, error };
}
