import { useEffect } from "react";

export default function CountDown() {
  const flipAllCards = (time: any) => {
    const segundosPorDia = 86400;
    const segundosPorHora = 3600;
    const segundosPorMinuto = 60;

    const dias = Math.floor(time / segundosPorDia);
    time %= segundosPorDia;

    const horas = Math.floor(time / segundosPorHora);
    time %= segundosPorHora;

    const minutos = Math.floor(time / segundosPorMinuto);
    time %= segundosPorMinuto;

    const segsRestantes = time;

    flip(document.querySelector("[data-hours-tens]"), Math.floor(horas / 10));
    flip(document.querySelector("[data-hours-ones]"), horas % 10);

    flip(
      document.querySelector("[data-minutes-tens]"),
      Math.floor(minutos / 10)
    );
    flip(document.querySelector("[data-minutes-ones]"), minutos % 10);
    flip(document.querySelector("[data-days-tens]"), Math.floor(dias / 10));
    flip(document.querySelector("[data-days-ones]"), dias % 10);

    flip(
      document.querySelector("[data-seconds-tens]"),
      Math.floor(segsRestantes / 10)
    );
    flip(document.querySelector("[data-seconds-ones]"), segsRestantes % 10);
  };

  const flip = (flipCard: any, newNumber: any) => {
    const top = flipCard.querySelector(".top");
    const bottom = flipCard.querySelector(".bottom");
    const startNumber = flipCard.querySelector(".top").textContent;

    if (newNumber == startNumber) return;

    top.textContent = startNumber;
    bottom.textContent = startNumber;
    flipCard.dataset.currentNumber = newNumber;
    flipCard.dataset.nextNumber = newNumber;

    flipCard.addEventListener("animationstart", () => {
      top.textContent = newNumber;
    });

    flipCard.addEventListener("animationend", () => {
      bottom.textContent = newNumber;
      flipCard.classList.remove("flip");
    });

    flipCard.classList.add("flip");
  };

  useEffect(() => {
    const startTime = new Date(2025, 1, 1, 12, 0, 0).getTime();
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      var totalCountDownTime = Math.ceil((startTime - currentTime) / 1000);
      if (totalCountDownTime == 0) clearInterval(interval);

      flipAllCards(totalCountDownTime);
    }, 250);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="countdown-wrapper text-custom-gender z-34 flex flex-col items-center justify-center">
      <h2 className="text-primary text-center text-lg font-bold">
        Te esperamos en la revelación en:{" "}
      </h2>
      <div className="countdown-container">
        <div className="countdown-cards">
          <div className="card-title">Días</div>
          <div className="card-container">
            <div className="flip-card" data-days-tens>
              <div className="top">3</div>
              <div className="bottom">3</div>
            </div>
            <div className="flip-card" data-days-ones>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
          </div>
        </div>
        <div className="countdown-cards">
          <div className="card-title">Horas</div>
          <div className="card-container">
            <div className="flip-card" data-hours-tens>
              <div className="top">2</div>
              <div className="bottom">2</div>
            </div>
            <div className="flip-card" data-hours-ones>
              <div className="top">4</div>
              <div className="bottom">4</div>
            </div>
          </div>
        </div>
        <div className="countdown-cards">
          <div className="card-title">Minutos</div>
          <div className="card-container">
            <div className="flip-card" data-minutes-tens>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
            <div className="flip-card" data-minutes-ones>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
          </div>
        </div>
        <div className="countdown-cards">
          <div className="card-title">Segundos</div>
          <div className="card-container">
            <div className="flip-card" data-seconds-tens>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
            <div className="flip-card" data-seconds-ones>
              <div className="top">0</div>
              <div className="bottom">0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}