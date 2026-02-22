/*
A cél, hogy egy egységes típus írja le az adatlekérés állapotait.
A <T> -> generikus típusparaméter, az lesz a típusa, amit kap: pl.: AsyncState<Game[]> → T = Game[] típusú lesz
Discriminated union -> Többféle objektumformát adunk meg, a megkülönböztető mező a status lesz.
A status értéke alapján fogja tudni a TS, hogy melyik objektum formáról van szó

Azért lesz jó, mert a TS letudja szűkíteni a típust:
    if (state.status === "error") {
    state.error.message; // ✅ TS tudja, hogy error nem null
    }
        ha status === "error", akkor a unionból csak az error ág marad így -> error: Error és data: null
        Így nem lehet véletlenül pl. succes állapotban error.messaget olvasni
 */

//Az AsnycStatus értékei csak ezek lehetnek:
export type AsyncStatus = "idle" | "loading" | "success" | "error";
//Az AsyncState az alábbi 4 objektum-formák egyike lehet:
export type AsyncState<T> =
  | { status: "idle"; data: null; error: null }
  | { status: "loading"; data: null; error: null }
  | { status: "success"; data: T; error: null }
  | { status: "error"; data: null; error: Error };
