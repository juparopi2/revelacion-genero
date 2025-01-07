import { User } from "@/app/context/UserContext";
import IconGoogleMaps from "../icons/IconGoogleMaps";

interface TarjetaInvitacionProps {
  user: User;
}

export default function TarjetaInvitacion(props: TarjetaInvitacionProps) {
  const { user } = props;
  return (
    <>
      <div className="grid grid-cols-1 gap-4 p-4 z-40">
        <article className="text-center">
          <div className="w-fit mx-auto bg-custom-gender rounded-2xl shadow-sm shadow-custom-gender outline outline-secondary -outline-offset-8">
            <div className="group overflow-hidden relative after:duration-500 before:duration-500  duration-500 hover:after:duration-500 hover:after:-translate-x-52 after:-translate-y-4 hover:before:translate-y-10 hover:before:translate-x-52 hover:duration-500 after:absolute after:bg-custom-gender after:rounded-full  after:blur-xl after:top-2 after:right-2 after:w-12 after:h-12  before:absolute before:bg-custom-gender before:rounded-full  before:blur-xl before:top-10 before:left-2 before:bottom-2 before:w-12 before:h-12  hover:rotate-12 flex justify-center items-center py-6 px-10  bg-secondary rounded-2xl outline outline-custom-gender -outline-offset-8 outline-2">
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-4xl font-bold">Hola! {user.nombre}</h1>
                <p className="text-lg font-medium">
                  {" "}
                  Eres equipo{" "}
                  <span className="font-bold text-custom-gender-dark">
                    {user.genero === "M" ? "Niño" : "Niña"}
                  </span>
                </p>
                <p>
                  {" "}
                  Te esperamos el
                  <span className="font-bold text-custom-gender-dark">
                    {" "}
                    Sábado, 1 de Febrero{" "}
                  </span>
                  a las 10 a.m. en{" "}
                  <span className="font-bold text-custom-gender-dark">
                    {" "}
                    Gipsy Grill Park{" "}
                  </span>
                </p>
                <p className="italic">
                  Lleva camisa del{" "}
                  <span className="font-bold text-custom-gender-dark ">
                    {" "}
                    color{" "}
                  </span>{" "}
                  del equipo que escogiste.
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
      <button
        className="bg-custom-gender text-secondary p-2 rounded-md flex flex-row gap-2 items-center justify-center w-fit mx-auto"
        onClick={() =>
          window.open("https://maps.app.goo.gl/owS69isVAbnPV17q9", "_blank")
        }
      >
        <IconGoogleMaps width={"2rem"} height={"2rem"} />
        <span className="w-max flex-1">Ver lugar en Google Maps</span>
      </button>
    </>
  );
}
