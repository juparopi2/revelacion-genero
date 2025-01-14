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

export default function VistaAdmin() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [sortConfig, setSortConfig] = useState({
    key: "nombre",
    direction: "ascending",
  });

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const { data, error } = await supabase.from("profiles").select("*");

    if (error) console.error("Error:", error);
    if (data) {
      setProfiles(data);
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

  return (
    <section className="pt-20 w-full h-full flex flex-col items-center justify-center">
      <h1 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-primary to-amber-950 text-5xl py-2 relative z-20 font-bold tracking-tight">
        Vista Admin
      </h1>
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
            {profiles.filter((profile) => profile.confirmacion_asistencia == true).length}
          </p>
          <p className="w-fit text-center">Confirmó asistencia</p>
        </div>
        <div className="w-1/4 flex flex-col items-center justify-center bg-slate-100 rounded-xl p-2">
          <p className="text-3xl">
            {profiles.filter((profile) => !profile.confirmacion_asistencia).length}
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
    </section>
  );
}
