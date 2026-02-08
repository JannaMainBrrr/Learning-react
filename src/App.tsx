import "./App.css";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Landing from "./pages/landing/Landing";

function App() {
  return (
    <div className="app">
      {/* Wrapper -> Legkülsőbb réteg, minden elem a gyereke lesz, a neve lehet még: Layout, container, content, page, root */}
      <Header />
      <div className="content">
        <Sidebar onLogout={() => console.log("TODO: logout")} />
        <Landing />
      </div>
    </div>
  );
}

export default App;
