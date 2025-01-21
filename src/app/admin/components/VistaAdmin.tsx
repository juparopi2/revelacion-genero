"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/model/supabaseClient";

interface Profile {
  id: string;
  nombre: string;
  celular: string;
  genero: string;
  confirmacion_asistencia: boolean;
}

interface Respuesta {
  id: string;
  celular: string;
  respuesta: boolean;
}

export default function VistaAdmin() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
  const [sortConfig, setSortConfig] = useState({
    key: "nombre",
    direction: "ascending",
  });

  const [view, setView] = useState("respuestas");

  useEffect(() => {
    fetchProfiles();
    fetchRespuestas();
  }, []);

  const fetchProfiles = async () => {
    const { data, error } = await supabase.from("profiles").select("*");

    if (error) console.error("Error:", error);
    if (data) {
      setProfiles(data);
    }
  };

  const fetchRespuestas = async () => {
    const { data, error } = await supabase.from("resultados").select("*");

    if (error) console.error("Error:", error);
    if (data) {
      const processedData = data.map((respuesta) => ({
        ...respuesta,
        respuesta:
          respuesta.puntaje_formulario !== null &&
          respuesta.puntaje_formulario !== undefined,
      }));
      setRespuestas(processedData);
    }
  };

  const requestSort = (key: keyof Profile) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedProfiles = [...profiles].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });

    setProfiles(sortedProfiles);
  };

  const sortByResponse = () => {
    let direction = "ascending";
    if (
      sortConfig.key === "respuesta" &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key: "respuesta", direction });

    const sortedProfiles = [...profiles].sort((a, b) => {
      const aHasResponded = respuestas.some((r) => r.celular === a.celular);
      const bHasResponded = respuestas.some((r) => r.celular === b.celular);

      if (aHasResponded === bHasResponded) return 0;
      if (direction === "ascending") {
        return aHasResponded ? -1 : 1;
      } else {
        return aHasResponded ? 1 : -1;
      }
    });

    setProfiles(sortedProfiles);
  };

  const asistencia = () => {
    return (
      <>
        <div className="w-full max-w-[450px] flex flex-row gap-2">
          <div className="w-1/4 flex flex-col items-center justify-center bg-slate-100 rounded-xl p-2">
            <p className="text-3xl">
              {profiles.filter((profile) => profile.genero).length}
            </p>
            <p className="w-fit text-center">Votos de genero</p>
          </div>
          <div className="w-1/4 flex flex-col items-center justify-center bg-slate-100 rounded-xl p-2">
            <p className="text-3xl">
              {profiles.filter((profile) => !profile.genero).length}
            </p>
            <p className="w-fit text-center">No votó genero</p>
          </div>
          <div className="w-1/4 flex flex-col items-center justify-center bg-slate-100 rounded-xl p-2">
            <p className="text-3xl">
              {
                profiles.filter(
                  (profile) => profile.confirmacion_asistencia == true
                ).length
              }
            </p>
            <p className="w-fit text-center">Confirmó asistencia</p>
          </div>
          <div className="w-1/4 flex flex-col items-center justify-center bg-slate-100 rounded-xl p-2">
            <p className="text-3xl">
              {
                profiles.filter((profile) => !profile.confirmacion_asistencia)
                  .length
              }
            </p>
            <p className="w-fit text-center">No asiste o no confirma</p>
          </div>
        </div>

        <div className="w-full h-full py-2">
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th
                  onClick={() => requestSort("nombre")}
                  className="px-1 py-3 text-center cursor-pointer hover:bg-gray-100"
                >
                  Nombre{" "}
                  {sortConfig.key === "nombre" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
                <th
                  onClick={() => requestSort("celular")}
                  className="px-1 py-3 text-center cursor-pointer hover:bg-gray-100"
                >
                  Teléfono{" "}
                  {sortConfig.key === "celular" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
                <th
                  onClick={() => requestSort("genero")}
                  className="px-1 py-3 text-center cursor-pointer hover:bg-gray-100"
                >
                  Género{" "}
                  {sortConfig.key === "genero" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
                <th
                  onClick={() => requestSort("confirmacion_asistencia")}
                  className="px-1 py-3 text-center cursor-pointer hover:bg-gray-100"
                >
                  Asistencia{" "}
                  {sortConfig.key === "confirmacion_asistencia" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {profiles.map((profile) => (
                <tr key={profile.id} className="hover:bg-gray-50">
                  <td className="px-1 py-4 text-center">{profile.nombre}</td>
                  <td className="px-1 py-4 text-center">{profile.celular}</td>
                  <td className="px-1 py-4 text-center">
                    {profile.genero ? profile.genero : "🤷‍♂️"}
                  </td>
                  <td className="px-1 py-4 text-center">
                    {profile.confirmacion_asistencia
                      ? "✅"
                      : profile.confirmacion_asistencia === false
                      ? "❌"
                      : "🤷‍♂️"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  const respuestasView = () => {
    return (
      <>
        <div className="w-full max-w-[450px] flex flex-row gap-2">
          <div className="w-1/2 flex flex-col items-center justify-center bg-slate-100 rounded-xl p-2">
            <p className="text-3xl">
              {respuestas.filter((profile) => profile.respuesta).length}
            </p>
            <p className="w-fit text-center">Responden formulario</p>
          </div>
          <div className="w-1/2 flex flex-col items-center justify-center bg-slate-100 rounded-xl p-2">
            <p className="text-3xl">{profiles.length - respuestas.length}</p>
            <p className="w-fit text-center">No responden formulario</p>
          </div>
        </div>

        <div className="w-full h-full py-2">
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th
                  onClick={() => requestSort("nombre")}
                  className="px-1 py-3 text-center cursor-pointer hover:bg-gray-100"
                >
                  Nombre{" "}
                  {sortConfig.key === "nombre" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
                <th
                  onClick={() => requestSort("celular")}
                  className="px-1 py-3 text-center cursor-pointer hover:bg-gray-100"
                >
                  Teléfono{" "}
                  {sortConfig.key === "celular" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
                <th
                  onClick={() => requestSort("genero")}
                  className="px-1 py-3 text-center cursor-pointer hover:bg-gray-100"
                >
                  Género{" "}
                  {sortConfig.key === "genero" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
                <th
                  onClick={() => sortByResponse()}
                  className="px-1 py-3 text-center cursor-pointer hover:bg-gray-100"
                >
                  Respuesta{" "}
                  {sortConfig.key === "respuesta" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {profiles.map((profile) => {
                const hasResponded = respuestas.some(
                  (respuesta) => respuesta.celular === profile.celular
                );
                return (
                  <tr key={profile.id} className="hover:bg-gray-50">
                    <td className="px-1 py-4 text-center">{profile.nombre}</td>
                    <td className="px-1 py-4 text-center">{profile.celular}</td>
                    <td className="px-1 py-4 text-center">
                      {profile.genero ? profile.genero : "🤷‍♂️"}
                    </td>
                    <td className="px-1 py-4 text-center">
                      {hasResponded ? "✅" : "❌"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <section className="pt-32 w-full h-full flex flex-col items-center justify-center">
      <h1 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-primary to-amber-950 text-5xl py-2 relative z-20 font-bold tracking-tight">
        Vista Admin
      </h1>
      <div className="w-full max-w-[450px] flex flex-row gap-2 py-4">
        <button
          onClick={() => setView("asistencias")}
          className={`w-1/2 py-2 text-center text-white bg-gradient-to-r from-primary to-amber-950 rounded-lg ${
            view === "asistencias" && "bg-amber-950"
          }`}
        >
          Asistencias
        </button>
        <button
          onClick={() => setView("respuestas")}
          className={`w-1/2 py-2 text-center text-white bg-gradient-to-r from-primary to-amber-950 rounded-lg ${
            view === "respuestas" && "bg-amber-950"
          }`}
        >
          Respuestas
        </button>
      </div>
      {view === "asistencias" && asistencia()}
      {view === "respuestas" && respuestasView()}
    </section>
  );
}
