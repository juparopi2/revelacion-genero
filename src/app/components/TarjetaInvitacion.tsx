import { User } from "@/app/context/UserContext";

interface TarjetaInvitacionProps {
  user: User;
}

export default function TarjetaInvitacion(props: TarjetaInvitacionProps) {
  const { user } = props;
  return (
    <div className="grid grid-cols-1 gap-4 p-4 z-40">
      <article className="text-center">
        <div className="bg-custom-gender rounded-2xl shadow-sm shadow-custom-gender outline outline-secondary -outline-offset-8">
          <div className="group overflow-hidden relative after:duration-500 before:duration-500  duration-500 hover:after:duration-500 hover:after:-translate-x-52 after:-translate-y-4 hover:before:translate-y-10 hover:before:translate-x-52 hover:duration-500 after:absolute after:bg-custom-gender after:rounded-full  after:blur-xl after:top-2 after:right-2 after:w-12 after:h-12  before:absolute before:bg-custom-gender before:rounded-full  before:blur-xl before:top-10 before:left-2 before:bottom-2 before:w-12 before:h-12  hover:rotate-12 flex justify-center items-center py-6 px-10  bg-secondary rounded-2xl outline outline-light-primary -outline-offset-8">
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-3xl font-bold">Hola! {user.nombre}</h1>
              <p className="text-lg font-medium">
                {" "}
                Eres equipo{" "}
                <span className="font-semibold text-custom-gender-light">
                  {user.genero === "M" ? "Niño" : "Niña"}
                </span>
              </p>
              <p>
                {" "}
                Te esperamos el
                <span className="font-medium text-custom-gender">
                  {" "}
                  2 de Febrero{" "}
                </span>
                a las 12 medio día en{" "}
                <span className="font-medium text-custom-gender">
                  {" "}
                  Cra 73 # 152 B - 65{" "}
                </span>
              </p>
              <p className="italic">
                Lleva camisa de tu{" "}
                <span className="text-custom-gender font-semibold">
                  {" "}
                  color{" "}
                </span>
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
