import { NavLink } from "react-router-dom";
import "./Sidebar.css";

import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

type SidebarItem = {
  label: string;
  path: string; // Routinghoz fog kelleni
};
//Array of objects, aminek meghatároztuk előre az itemek típusát (typescript).
const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: "Dashboard", path: "/" },
  { label: "Games", path: "/games" },
  { label: "Profile", path: "/profile" },
  { label: "Settings", path: "/settings" },
];

//Lista mappolása, annyi a különbség, hogy a routing miatt a path lesz a key, van BEM naming convention (Block__element--modifier)
//A kezdő {} a JS helye, illetve egyelőre belerakunk egy buttont minden listaelemhez, ami a consoleba írja, hova navigálnánk.)
//A map () tartalma azért van plusz zárójelben, mert függvényt vár. A függvéy szintaxisa pedig: (item) => (...)

/* Navlink működése:

to={item.path} -> Egy olyan prop, ami megadja a NavLinknek, hogy hova navigáljunk kattintáskor.

className={...}
  ->Egy függvény, amit a NavLink meghív és átadja neki az aktuális állapotot, még pedig azt, hogy isActive === true vagy false
    ->Ezt a paramétert destructoljuk, azért kell a ({isActive}) => ...
    Outputja egy string lesz, mert a className prop stringet vár
      Stringbe ágyazott javascript : `sidebar__link ${isActive ? "sidebar__link--active" : ""}` -> feltétel ? érték_ha_igaz : érték_ha_hamis
        ha isActive === true, akkor: "sidebar__link sidebar__link--active"
        ha isActive === false, akkor: "sidebar__link"

item.path === "/" -> ez egy boolean prop, azért kell, hogy a Dashboard ne legyen mindig aktív.
  true, ha Dashboard -> a NavLink csak akkor aktív, ha az URL pontosan /
  false, ha bármi más

{item.label} -> a label szövege jelenik meg, ami a link felirata lesz.

Teljes folyamat:
1) User kattint a NavLink-re
2) URL megváltozik (pl. /games)
3) Router észreveszi
4) <Routes> kiválasztja a <GamesPage />-et
5) Az AppLayout {children}-je ez lesz
6) A Sidebar újrarenderelődik
7) A NavLink megkapja: isActive = true
8) Rákerül a sidebar__link--active class

*/

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar__nav">
        <ul className="sidebar__list">
          {SIDEBAR_ITEMS.map((item) => (
            <li key={item.path} className="sidebar__item">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
                }
                end={item.path === "/"}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar__footer">
        <button
          type="button"
          className="sidebar__logout"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
