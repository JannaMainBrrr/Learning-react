/*
Feladata:
  Tárolja a user állapotot
  Adjon login és logout függvényeket
  Perzisztálja localStorage-be
  App induláskor visszatöltse a usert
  Biztosítsa, hogy bárhonnan elérhető legyen 
*/

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

//User egyelőre csak ennyi adatot tartalmaz, később lehet még role, id stb.
type User = { username: string };
/*Meghatározzuk mit fog tudni a context: 3 dolgot exportálunk az alkalmazásnak: a usert és a login()-t, logout()-ot
Ez lesz a "public API" az auth réteghez majd.
*/
type AuthContextValue = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};
type Props = { children: React.ReactNode };
//Létrehozzuk a contextet, az alapérték undefined, mert ha valaki useAuth()-ot hívna a Provider nélkül, akkor így hibát tudunk dobni.
const AuthContext = createContext<AuthContextValue | undefined>(undefined);
//Kulcs, amivel a Local Storaget használjuk
const STORAGE_KEY = "doksi_user";

/*
Auth Provider -> Wrapper komponens. Ezt rakjuk a main.tsx-be
Ami alatta van komponens (pl. az <App />  és a gyerekei is hozzáférnek így majd a contexthez)
*/
export function AuthProvider(props: Props) {
  //null -> nincs bejelentkezve, User objektum -> be van jelentkezve
  const children = props.children;
  const [user, setUser] = useState<User | null>(null);

  /*
  App indulásakor, vagyis mountingkor 1x lefut
    1) Megnézi van-e mentett user
    2) Ha van: JSON.parse
    3) setUser(parsed)
    Ez a "fake session restore"

    Try-catch azért érdemes, mert ha pl. sérült adatot tartalmaz a localStorage akkor hibára futna.
  */
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as User;
      setUser(parsed);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  /*
  Fake login: “bármi jó”, ami nem üres
    Most csak azért async, hogy később backend kompatibilis legyen
  */
  const login = async (username: string, password: string) => {
    const u = username.trim();
    const p = password;

    if (!u || !p) return false;
    //sikeres login esetén frissítjük a statet és mentünk a local storagebe (sessiont szimulálunk).
    const nextUser: User = { username: u };
    setUser(nextUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    return true;
  };

  const logout = () => {
    //Kijelentkezéskor null-ra állitjuk (null vagy User lehet ugye) + töröjük a localStorage adatot
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };
  /*
  Azért kell, hogy ne jöjön létre új objektum minden rendernél. Csak akkor, ha változik az AuthContext vagy a user
  */
  const value = useMemo(() => ({ user, login, logout }), [user]);
  /*
  Az auth provider wrappeli az appot (main.tsx) majd a {children} (amit wrappel) átengedi a Provideren keresztül.
    Visszaadja a contextet -> Minden child komponens hozzáfér.
    value={value} -> adatot adunk a contextnek -> Provider mindig kap egy value propot, amit "lefelé sugároz" a komponensfában.
    A value tartalma:
      value = {
      user,
      login,
      logout
    }
    { children } ezek a komponensek férnek hozzá ehhez az adathoz

  */
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
/*
Csinálunk egy saját hookot:
  Tisztább használat: const {user} =useAuth(); vs. ha nem saját hook lenne: useContext(AuthContext)
*/
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
