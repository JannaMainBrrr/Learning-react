
function PracticeComponent() {

{/* A visszatérési érték mindig egyetlen root element kell hogy legyen, pl. egy div */}


{/* Változó deklarálás */}
const title: string = "This is a string";
const szam: number = 2;
const isAdmin: boolean = true;

{/* Objektumok létrehozása */}

const user = {
    id: 1,
    name: "Peti",
    age: 28
};
<p>Név: {user.name}</p>; {/* Így kérjük le, ha nem a returnbe rakjuk, nem renderelődik. */}

{/*Arrays*/}

const fruits = ["alma","körte","répa"];
{/*El kell látnia listaelemeket egy egyedi ID-val, hogy rendereléskor felismerje az új elemeket*/}
<ul>
    {fruits.map(fruit =>(
        <li key={fruit}>{fruit}</li>  
    ))}
</ul>

{/*Array of objects*/}

const users = [
    { id: 1, name: "Anna" },
    { id: 2, name: "Béla" },  
]

{/*Bejárása ugyanaz mint a tömbnek*/}
<ul>
    {users.map(user => (
        <li key = {user.id}>{user.name}</li>
    ))}
</ul>

{/*
    Feltételes logika - Ternary --> {isLoggedIn ? <Profile /> : <Login />}
    Ha isLoggedIn = True, akkor profile meghívása, ha false, akkor Login meghívása
*/}

{/*
    Feltételes logika - Ternary --> {isAdmin && <AdminPanel />}
    Ha isAdmin = True, akkor AdminPanel meghívása, ha false, akkor semmi
*/}


{/*Függvények*/}
const greet = (name: string): string => {
    return `Szia ${name}`;
}
<p>{greet("Gábor")}</p>







  return (

    <div>
      <h2> Hello from PracticeComponent!</h2>
    </div>
   
  )
}

export default PracticeComponent