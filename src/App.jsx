import { useState, useEffect } from "react";
import Taymer from "./Taymer";

export default function App() {
  const [ishVaqti, setIshVaqti] = useState(25);
  const [tanaffusVaqti, setTanaffusVaqti] = useState(5);

  const [bugungiSikl, setBugungiSikl] = useState(
    () => Number(localStorage.getItem("pomodoroSoni")) || 0
  );

  // statistikani saqlash
  useEffect(() => {
    localStorage.setItem("pomodoroSoni", bugungiSikl);
  }, [bugungiSikl]);

  return (
    <div className="container">
      <h1>Pomodoro Taymer (React)</h1>

      <div className="settings">
        <label>
          Ish vaqti (min):
          <input
            type="number"
            value={ishVaqti}
            onChange={(e) => setIshVaqti(Number(e.target.value))}
          />
        </label>

        <label>
          Tanaffus (min):
          <input
            type="number"
            value={tanaffusVaqti}
            onChange={(e) => setTanaffusVaqti(Number(e.target.value))}
          />
        </label>
      </div>

      <Taymer
        ishVaqti={ishVaqti}
        tanaffusVaqti={tanaffusVaqti}
        pomodoroTugaganda={() => setBugungiSikl(bugungiSikl + 1)}
      />

      <h3>Bugungi bajarilgan Pomodoro sikllari: {bugungiSikl}</h3>
    </div>
  );
}
