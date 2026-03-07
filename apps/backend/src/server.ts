//Express egy Node HTTP framework, ad routinget, middleware pipeline, json kezelést stb.
//Cors -> Express middleware csomag, cross origin network resource sharing -> engedélyezi a cross-origin kéréseit a böngészőnek
import express from "express";
import cors from "cors";

/* pipeline: uest bejön → middleware lánc → route handler → response kimegy
Teljes request flow:
  request → express.json middleware → cors middleware → route match (/health) → handler → response
Ha nincs match a routera:
  request → middlewares → routes → 404 fallback → response
Ha hiba történik:
  request → middlewares → routes → error middleware → response
 */

/* Minimal server factory
-Ahelyett, hogy azonnal elindítanánk a szervert, egy függvényt exportálunk, ami:
  létrehozza az Express appot és visszaadja
  Ha ezt írnánk:
    const app = express();
    app.listen(3001);
  akkor automatikusan elindulna importkor, de így nehéz tesztelni, újra felhasználni stb.

-Factory pattern:
  server.ts -> Összerakja az appot
  main.ts -> Elindítja az alkalmazást
 */
export function createServer() {
  /* Factory függvény, ami visszaad egy Express application objektumot.
      -Tárolja a middlewareket, routeokat, kezeli a request pipelinet
  */
  const app = express();

  /* Az app.use() egy middleware függvényt regisztrál. 
    -Részei: (req, res, next) -> Lefut minden requestnél
  */

  /* express.json
    -Beépített middleware, feladata a JSON request body parseolása
    -Elolvassa a request body-t, JSON.parse-olja, majd beteszi a req.body-ba.
    -Limit: body engedlyezett maximális mérete 
   */
  app.use(express.json({ limit: "1mb" }));

  /* Hozzáadja a CORS headereket a responehoz, ezáltal lehetővé teszi a FE-BE közti kommunikációt)
  -origin: true -> Dev módban engedélyezi az aktuális request originjét:
    FE: Origin: http://localhost:5173
    BE: Access-Control-Allow-Origin: http://localhost:5173
  -credentials: true -> Cooki, auth header, session küldését engedélyezi a cross-origin requesteknél
*/
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );

  /* Ha GET request jön a "/health" pathra, akkor futtasd az alább handlert.
    - Express handler paraméterei: (req, res, next)
    - _req azért underscore, mert nem használjuk

    -res.status(200).json({ ok: true });
      1) HTTPS status code: 200
      2) JSON response -> Content-Type: application/json
      3) response body: { "ok": true }

  */
  app.get("/health", (_req, res) => {
    res.status(200).json({ ok: true });
  });

  /* 404 fallback
    -Middleware ami csak akkor fut, ha egy route sem matchelt 
  */
  app.use((req, res) => {
    res.status(404).json({
      ok: false,
      error: {
        code: "NOT_FOUND",
        message: `Route not found: ${req.method} ${req.path}`,
      },
    });
  });

  /* Error middleware -> az alap handlerek mellett van neki "err" is*/
  app.use(
    (
      err: unknown,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      console.error("[ERROR]", err);
      res.status(500).json({
        ok: false,
        error: { code: "INTERNAL_ERROR", message: "Unexpected server error" },
      });
    },
  );

  return app;
}
