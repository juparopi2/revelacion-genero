"use client";
import { supabase } from "@/model/supabaseClient";
import { useEffect, useState } from "react";
import { IconGenderMale } from "../icons/IconGenderMale";
import { IconGenderFemale } from "../icons/IconGenderFemale";
import { cn } from "../lib/utils";
import { User } from "../context/UserContext";

interface UserResults {
  id: string;
  celular: string;
  puntaje_formulario: number;
}

export default function CardsVotaciones() {
  const [votaciones, setVotaciones] = useState<User[]>([]);
  const [resultadosFormulario, setResultadosFormulario] = useState<
    UserResults[]
  >([]);
  const countM = votaciones.filter(
    (votacion) => votacion.genero === "M"
  ).length;
  const countF = votaciones.filter(
    (votacion) => votacion.genero === "F"
  ).length;

  const resultadosPorGenero = (genero: string) => {
    const resultadosM = resultadosFormulario.filter((resultado) => {
      const votante = votaciones.find((v) => v.celular === resultado.celular);
      return votante?.genero === genero;
    });


    const totalPuntaje = resultadosM.reduce(
      (sum, resultado) => sum + resultado.puntaje_formulario,
      0
    );

    const votantesPorGenero = resultadosFormulario.filter((resultado) => {
      const votante = votaciones.find((v) => v.celular === resultado.celular);
      return votante?.genero === genero;
    }).length;

    return countM > 0 ? (totalPuntaje / votantesPorGenero).toFixed(1) : "0";
  };

  useEffect(() => {
    async function fetchVotaciones() {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) console.log("Error al traer las votaciones", error);
      if (data) {
        setVotaciones(data.filter((votacion) => votacion.genero));
      }
    }
    async function fetchResultadosFormulario() {
      const { data, error } = await supabase.from("resultados").select("*");
      if (error)
        console.log("Error al traer los resultados del formulario", error);
      if (data) {
        setResultadosFormulario(data);
      }
    }
    fetchResultadosFormulario();
    fetchVotaciones();
  }, []);
  return (
    <div className="flex flex-col gap-4 w-full items-center justify-center z-40 px-4 pb-4">
      <h3 className="text-5xl font-bold w-full text-center">
        {" "}
        Resultados del formulario:
      </h3>
      <p className="text-center italic">
        {" "}
        ¡Calculamos el promedio de las respuestas que nos dieron los integrantes
        de cada equipo!{" "}
      </p>
      <p className="text-center italic">
        {" "}
        Recuerda que el puntaje máximo era 14 puntos{" "}
      </p>
      <ContadorResultados
        niños={resultadosPorGenero("M")}
        niñas={resultadosPorGenero("F")}
      />
      <h3 className="text-5xl font-bold w-full text-center">
        {" "}
        Así van las votaciones:
      </h3>
      <ContadorVotaciones niños={countM} niñas={countF} />

      <div className="w-full grid grid-flow-dense grid-cols-12 gap-4 h-fit z-40">
        {votaciones.map((votacion) => (
          <Card
            key={votacion.celular}
            nombre={votacion.nombre}
            genero={votacion.genero}
          />
        ))}
      </div>
    </div>
  );
}

interface CardProps {
  nombre: string;
  genero: string;
}

function Card(props: CardProps) {
  const { nombre, genero } = props;

  const totalColumns = 12;
  const baseCardWidthPx = 34;
  const charWidthPx = 9;
  const cardTextWidthPx = nombre.length * charWidthPx;
  let screenWidthPx = 400;

  if (typeof window !== "undefined") {
    screenWidthPx = Math.min(window.innerWidth - 32, 850);
  }

  const approxCardWidthPx = baseCardWidthPx + cardTextWidthPx;
  const colSpan = Math.min(
    totalColumns,
    Math.max(1, Math.ceil((approxCardWidthPx / screenWidthPx) * totalColumns))
  );

  const genderColor = genero === "M" ? "bg-custom-boy" : "bg-custom-girl";
  return (
    <div
      className={cn(
        genderColor,
        "w-fit rounded-xl p-2 mx-auto break-inside-avoid z-40"
      )}
      style={{ gridColumn: `span ${colSpan}` }}
    >
      <div className="p-2 w-full h-full rounded-lg text-white border-2 border-dashed border-white">
        <p>{nombre}</p>
      </div>
    </div>
  );
}

interface ContadorVotacionesProps {
  niños: number;
  niñas: number;
}
function ContadorVotaciones(props: ContadorVotacionesProps) {
  const { niños, niñas } = props;
  return (
    <div className="z-40 flex flex-row w-full gap-4 items-center justify-center">
      <div className="w-32 bg-custom-boy rounded-xl p-2 flex flex-col items-center justify-center text-white">
        <div className="w-full h-full p-2 border-2 border-dashed border-white rounded-lg">
          <div className="flex flex-row items-center justify-center ">
            <IconGenderMale width={"4rem"} height={"4rem"} />
            <p className="text-4xl">{niños}</p>
          </div>
          <p className="text-center w-full font-semibold">Niños</p>
        </div>
      </div>
      <div className="w-32 bg-custom-girl rounded-xl p-2 flex flex-col items-center justify-center text-white">
        <div className="w-full h-full p-2 border-2 border-dashed border-white rounded-lg">
          <div className="flex flex-row items-center justify-center ">
            <IconGenderFemale width={"4rem"} height={"4rem"} />
            <p className="text-4xl">{niñas}</p>
          </div>
          <p className="text-center w-full font-semibold">Niñas</p>
        </div>
      </div>
    </div>
  );
}

interface ContadorResultadosProps {
  niños: string;
  niñas: string;
}
function ContadorResultados(props: ContadorResultadosProps) {
  const { niños, niñas } = props;
  return (
    <div className="z-40 flex flex-row w-full gap-4 items-center justify-center">
      <div className="w-32 bg-custom-boy rounded-xl p-2 flex flex-col items-center justify-center text-white">
        <div className="w-full h-full p-2 border-2 border-dashed border-white rounded-lg">
          <div className="flex flex-row items-center justify-center ">
            <IconGenderMale width={"4rem"} height={"4rem"} />
            <p className="text-4xl">{niños}</p>
          </div>
          <p className="text-center w-full font-semibold">Niños</p>
        </div>
      </div>
      <div className="w-32 bg-custom-girl rounded-xl p-2 flex flex-col items-center justify-center text-white">
        <div className="w-full h-full p-2 border-2 border-dashed border-white rounded-lg">
          <div className="flex flex-row items-center justify-center ">
            <IconGenderFemale width={"4rem"} height={"4rem"} />
            <p className="text-4xl">{niñas}</p>
          </div>
          <p className="text-center w-full font-semibold">Niñas</p>
        </div>
      </div>
    </div>
  );
}
