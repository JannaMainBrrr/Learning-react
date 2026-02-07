//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'
import { useEffect, useState } from "react";

function App() {

  const [advice,setAdvice] = useState("");
  const [count,setCount] = useState(0);
  const [time,setTime] = useState(new Date().toLocaleDateString()); 
//a UseState egy tömböt ad vissza: [state,SetState] -> state az aktuális érték, a setState pedig egy függvény amivel frissíthetjük
//Amikor meghívjuk: setAdvice(data.slip.advice); akkor a react frissíti az advice statet a megadott új értékre.
//Ez újrarendereli automatikusan a komponenst, az új statet felhasználva



  async function getAdvice() {
    const response = await fetch("https://api.adviceslip.com/advice"); //Egy olyan Promiset ad vissza, ami egy Response Objektum
    const data = await response.json();   //response.text() vagy response.json() is Promise-t ad vissza, mert az olvasás is aszinkron (nem blokkolhatha a szálat)
    
    //Megvan az adatunk, most kell a useStattel szinkronba hozni a felületet az adatokkal -> Frissít a függvénnyel + újrarendereli a komponenst.
    //A data egy Javascript objektum, aminek van slip propertyje, azon belül advice propertyje.
    setAdvice(data.slip.advice);
    setCount((c) => c+1); //A setCount úgyis a count-ot fogja változtatni, szóval itt nem kell direktbe a count-ra hivatkozni.

  }

  //Mivel a setAdvice miatt újrarenderelődik a komponens, ezért újból lefutna a getAdvice() API hívása, így kialakulna egy végtelen loop: Folyamatosan hívnánk az API-t.
  // A useEffect biztosítja, hogy kontrolláltan, csak egyszer fusson le a getAdvice() a komponens betöltésekor.
  //Az első argumentuma a függvény, ami lefut -> getAdvice()
  //A második argmumentuma a dependency array, függőségi tömb.
    //Ha ez egy üres tömb [] -> Egyszer fut le, a komponens mountolásakor
    //Ha nincs megadva, minden rendernél lefut, ez veszélyes és ritkán használjuk
    //Megadható lenne pl a [count] is ->Ekkor ha a count state változik, akkor renderel. De ez megint csak infinite loophoz vezetne, hiszen a getAdvice() azt is változtatja


useEffect(function () {
  getAdvice();
}, []);

useEffect(function(){
  setInterval(function(){
    setTime(new Date().toLocaleTimeString())
  },1000)
},[]);

function resetCount(){
  setCount(0);
}





  return (

    <div>
      <h1>{advice}</h1>
      <button onClick={getAdvice}>Get Advice </button>
      <MessageCount count = {count}/>
      {/* resetelő komponens */}
      {/* A ResetButton a gyerekkomponens. Az onReset egy tetszőleges prop amit mi adtunk meg
      A szülő (App) átad egy függvényt amit onReset nével ér el a gyerekkomponens)*/}
      <ResetButton onReset={resetCount}/>
      <p>The current time is {time}</p>

    </div>
   
  )
}

//Kell egy message function amit renderelünk, ehhez kell először a ts miatt a típusát megadni

type MessageProps = {
  count: number; //típusa = number
}

function ResetButton(props:{onReset: () => void }) { //Meghatározzuk a típusát a paraméternek: Egy függvény lesz, ami nem ad vissza semmit.
  //A props egy objektum, ami tartalmaz minden átadott paramétert, itt csak csak a props.onReset = resetCount függvényt
  return(
  <button onClick={props.onReset}>
    Reset count
  </button>
  );
}


export function MessageCount({count}:MessageProps){
  return(
    <p>
      You have read <strong>{count}</strong> pieces of advice
    </p>
  );
}








export default App
