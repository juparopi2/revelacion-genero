export default function TextoInvitacion() {
  return (
    <div className="text-center text-lg text-primary flex flex-col items-center justify-center p-4 gap-2">
      <p className="">
        ¿ Dulce o travieso,{" "}
        <span className="font-bold text-custom-girl-dark">rosa</span> o{" "}
        <span className="font-bold text-custom-boy-dark">azul</span>?
      </p>
      <p>Es hora de elegir un equipo!</p>
      <p>
        ¿<span className="font-bold text-custom-girl-dark">#TeamNiña</span> o{" "}
        <span className="font-bold text-custom-boy-dark">#TeamNiño</span>?
      </p>
      <p>
        Ven a descubrir el género de nuestro bebé, un instante único e
        inolvidable que marcará nuestras vidas.{" "}
      </p>
      <p>
        <span className="italic">
          ¡Será un día lleno de amor, alegría y sorpresas, los esperamos con
          mucha ilusión!
        </span>
      </p>
    </div>
  );
}
