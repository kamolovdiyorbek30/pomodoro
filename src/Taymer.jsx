import { useState, useEffect, useRef } from "react";

export default function Taymer({ ishVaqti, tanaffusVaqti, pomodoroTugaganda }) {
  const [qolganVaqt, setQolganVaqt] = useState(ishVaqti * 60);
  const [ishgaTushgan, setIshgaTushgan] = useState(false);
  const [ishRejimida, setIshRejimida] = useState(true);

  const signalRef = useRef(null);

  // ish/tanaffus qiymatlari o'zgarsa — taymer reset bo'ladi
  useEffect(() => {
    setQolganVaqt(ishVaqti * 60);
    setIshRejimida(true);
  }, [ishVaqti, tanaffusVaqti]);

  // taymer logikasi
  useEffect(() => {
    let vaqtInterval = null;

    if (ishgaTushgan) {
      vaqtInterval = setInterval(() => {
        setQolganVaqt((old) => {
          if (old <= 1) {
            clearInterval(vaqtInterval);
            signalRef.current.play();

            // ish tugasa statistika oshadi
            if (ishRejimida) pomodoroTugaganda();

            const yangiVaqt = ishRejimida
              ? tanaffusVaqti * 60
              : ishVaqti * 60;

            setIshRejimida(!ishRejimida);
            setIshgaTushgan(false);

            return yangiVaqt;
          }
          return old - 1;
        });
      }, 1000);
    }

    return () => clearInterval(vaqtInterval);
  }, [ishgaTushgan, ishRejimida, ishVaqti, tanaffusVaqti, pomodoroTugaganda]);

  const vaqtFormat = (sekund) => {
    const m = Math.floor(sekund / 60).toString().padStart(2, "0");
    const s = (sekund % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const qaytaOlish = () => {
    setIshgaTushgan(false);
    setIshRejimida(true);
    setQolganVaqt(ishVaqti * 60);
  };

  return (
    <div>
      <h2>{ishRejimida ? "Ish rejimi" : "Tanaffus"}</h2>

      <div className="timer">{vaqtFormat(qolganVaqt)}</div>

      <div className="controls">
        <button onClick={() => setIshgaTushgan(true)}>Boshlash</button>
        <button onClick={() => setIshgaTushgan(false)}>Pauza</button>
        <button onClick={qaytaOlish}>Qayta o‘rnatish</button>
      </div>

      <audio
        ref={signalRef}
        src="https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"
      />
    </div>
  );
}
