"use client";
import { supabase } from "@/model/supabaseClient";
import { useEffect, useState } from "react";
import { IconGenderMale } from "../icons/IconGenderMale";
import { IconGenderFemale } from "../icons/IconGenderFemale";
import { cn } from "../lib/utils";

export default function CardsVotaciones() {
  const [votaciones, setVotaciones] = useState<any[]>([]);
  const countM = votaciones.filter(
    (votacion) => votacion.genero === "M"
  ).length;
  const countF = votaciones.filter(
    (votacion) => votacion.genero === "F"
  ).length;

  useEffect(() => {
    async function fetchVotaciones() {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) console.error("Error al traer las votaciones", error);
      if (data) {
        setVotaciones(data.filter((votacion) => votacion.genero));
        //setVotaciones(data);
      }
    }
    fetchVotaciones();
  }, []);
  return (
    <div className="flex flex-col gap-4 w-full items-center justify-center z-40 pb-4">
      <h3 className="text-2xl font-bold"> Así van las votaciones:</h3>
      <ContadorVotaciones niños={countM} niñas={countF} />
      <div className="w-full grid grid-flow-dense grid-cols-12 gap-4 h-fit z-40 px-4">
        {votaciones.map((votacion) => (
          <Card
            key={votacion.id}
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
  const baseCardWidthPx = 32;
  const charWidthPx = 9;
  const cardTextWidthPx = nombre.length * charWidthPx;
  let screenWidthPx = 400;

  if (typeof window !== "undefined") {
    screenWidthPx = window.innerWidth;
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
      <div className="p-2 w-full h-full rounded-lg text-white border border-dashed border-white">
        <h4>{nombre}</h4>
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
        <div className="w-full h-full p-2 border border-dashed border-white rounded-lg">
          <div className="flex flex-row items-center justify-center ">
            <IconGenderMale width={"4rem"} height={"4rem"} />
            <p className="text-4xl">{niños}</p>
          </div>
          <p className="text-center w-full italic">Niños</p>
        </div>
      </div>
      <div className="w-32 bg-custom-girl rounded-xl p-2 flex flex-col items-center justify-center text-white">
        <div className="w-full h-full p-2 border border-dashed border-white rounded-lg">
          <div className="flex flex-row items-center justify-center ">
            <IconGenderFemale width={"4rem"} height={"4rem"} />
            <p className="text-4xl">{niñas}</p>
          </div>
          <p className="text-center w-full italic">Niñas</p>
        </div>
      </div>
    </div>
  );
}
