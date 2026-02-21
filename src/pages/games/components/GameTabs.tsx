import { NavLink } from "react-router-dom";
import "./GameTabs.css";

type GameTabItem = {
  label: string;
  path: string;
};

const GAME_TAB_ITEMS: GameTabItem[] = [
  { label: "Overview", path: "overview" },
  { label: "Sessions", path: "sessions" },
  { label: "Analyze", path: "analyze" },
  { label: "Compare", path: "compare" },
];

export default function GameTab() {
  return (
    <aside className="gameTab">
      <ul className="gameTab__list">
        {GAME_TAB_ITEMS.map((item) => (
          <li key={item.path} className="gameTab__item">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `gameTab__link ${isActive ? "gameTab__link--active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
