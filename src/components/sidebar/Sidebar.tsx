import "./Sidebar.css";

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

//A sidebar nem kezeli a stateket, de megcsináljuk a kiállást neki: Ha megkapja az onLogout függvényt, akkor végrehajtja majd.
type SidebarProps = {
  onLogout?: () => void;
};
//Lista mappolása, annyi a különbség, hogy a routing miatt a path lesz a key, van BEM naming convention (Block__element--modifier)
//A kezdő {} a JS helye, illetve egyelőre belerakunk egy buttont minden listaelemhez, ami a consoleba írja, hova navigálnánk.)
//A map () tartalma azért van plusz zárójelben, mert függvényt vár. A függvéy szintaxisa pedig: (item) => (...)
export default function Sidebar({ onLogout }: SidebarProps) {
  return (
    <aside className="sidebar">
      <nav className="sidebar__nav">
        <ul className="sidebar__list">
          {SIDEBAR_ITEMS.map((item) => (
            <li key={item.path} className="sidebar__item">
              <button
                type="button"
                className="sidebar__link"
                onClick={() => console.log("Navigate to:", item.path)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar__footer">
        <button
          type="button"
          className="sidebar__logout"
          onClick={() =>
            onLogout ? onLogout() : console.log("Logout clicked")
          }
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
