import { useState, useMemo } from "react";
import "./LoginPageInt.css";

import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

/*Login page - "Haladóbb"
    Kezdő verzió, viszont vannak "hibái, ami miatt kevésbé jól skálázható:"
    1) 5db state is van, de csak 2 input mező, ha bővülne mezővel, akkor kéne sok új state, sok kódismétlés stb.
    2) A validációs logika a komponensben van, keveredik az UI-val
    3) Ha több mező lenne, több feltételt kéne kézzel beletákolni, kéne egy egységes error objektum.

    Megoldások:
    1) values és touched objektumokat csinálunk: values = {username,password} és touched={username,password}
    2) Kiszervezzük a UI-ból a validálást külön függvénybe: Validate(values)
    3) Egységes error objektumot hozunk létre: errors.username és errors.password
*/

//Meghatározzuk az objektumaink típusait

type Values = {
  username: string;
  password: string;
};

type Touched = {
  username: boolean;
  password: boolean;
};
//Opcionális, mivel nem biztos, hogy lesz hiba:
type Errors = {
  username?: string;
  password?: string;
};

//1) Kiszervezzük a validációt külön függvénybe, illetve használjuk a típusokat, hogy ne kelljen annyit másolni.
//:Errors -> Visszatérési érték típusa (errors objekt)
function validate(values: Values): Errors {
  const errors: Errors = {}; //Létrehozunk egy error típusú üres objektumot

  const u = values.username.trim();
  if (!u) {
    errors.username = "A felhasználónév kötelező!";
  } else if (u.length < 3) {
    errors.username = "Legalább 3 karakter legyen!";
  }

  const p = values.password;
  if (!p) {
    errors.password = "A jelszó kötelező";
  } else if (p.length < 6) {
    errors.password = "Legalább 6 karakter legyen!";
  }
  return errors;
}

export default function LoginPageInt() {
  //2 Values objektumban: Meghatározzuk az objektum típusát majd oda adjuk az alapértékkel:
  const [values, setValues] = useState<Values>({ username: "", password: "" });
  //2 touched is 1 sorban objektumként odaadva, ugyanúgy:
  const [touched, setTouched] = useState<Touched>({
    username: false,
    password: false,
  });
  //Globális submit hiba későbbre A useState mindig egy párt ad vissza, ezétr: string | null --> Lehet string VAGY null, de a kezdeti értéke null.
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Honnan jött a user? (ProtectedLayout-ból)
  const from = (location.state as any)?.from?.pathname || "/";

  //Errors objektum
  //Ez a hook azért "kell", hogy ne fusson le minden rendernél -> futtasd le a validate(values)-t.
  // A [values] a függőségi lista, amit figyel, hogy változik-e. Ha nem változik, akkor a korábbi eredményt adja vissza
  const errors = useMemo(() => validate(values), [values]);
  //Object.keys -> Visszaadja a paraméterül kapott objektum kulcsait TÖMBBEN.
  const isValid = Object.keys(errors).length === 0;

  //Külön handlerek, de már objektumba írnak.
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //Másold át a régi objektumot (ami a values)
    //Írd felül a username mezőt az új értékke
    //Azért kell, mert a React state-et nem szabad módosítani közvetlenül, mivel itt a prev-ben (values) a jelszó is benne van.
    //Tehát ha csak simán setValues({ username: e.target.value }); -et írnánk, akkor a password elveszne. (meg az objektum többi tartalma is, ha lenne)
    setValues((prev) => ({ ...prev, username: e.target.value }));
    //Ha valamilyen hiba van, töröljük.
    if (submitError) setSubmitError(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, password: e.target.value }));
  };
  if (submitError) setSubmitError(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ username: true, password: true });

    if (!isValid) return;

    const ok = await login(values.username, values.password);

    if (!ok) {
      setSubmitError("Adj meg felhasználónevet és jelszót.");
      return;
    }

    navigate(from, { replace: true });
  };

  return (
    <div className="login-page">
      <h1>Bejelentkezés</h1>

      <form className="login-page__form" onSubmit={handleSubmit} noValidate>
        <div className="login-page__field">
          <label className="login-page__label">Felhasználónév</label>
          <input
            className="login-page__input"
            value={values.username}
            onChange={handleUsernameChange}
            onBlur={() => setTouched((p) => ({ ...p, username: true }))}
          />
          {touched.username && errors.username && (
            <div className="login-page__error">{errors.username}</div>
          )}
        </div>

        <div className="login-page__field">
          <label className="login-page__label">Jelszó</label>
          <input
            className="login-page__input"
            value={values.password}
            onChange={handlePasswordChange}
            onBlur={() => setTouched((p) => ({ ...p, password: true }))}
            type="password"
          />
          {touched.password && errors.password && (
            <div className="login-page__error">{errors.password}</div>
          )}
        </div>

        {submitError && <div>{submitError}</div>}

        <button
          className="login-page__button"
          type="submit"
          disabled={!isValid}
        >
          Belépés
        </button>
      </form>
    </div>
  );
}
