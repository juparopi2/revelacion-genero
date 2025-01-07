"use client";

import { useEffect, useState } from "react";
import { IconCalendarCheck } from "../icons/IconCalendarCheck";
import { IconCalendarXmark } from "../icons/IconCalendarChecMark";
import { cn } from "../lib/utils";
import { useUserContext } from "@/app/context/UserContext";
import { supabase } from "@/model/supabaseClient";

export default function ConfirmarAsistencia() {
  const [asistire, setAsistire] = useState<boolean | null>(null);
  const { user } = useUserContext();

  useEffect(() => {
    const updateAsistencia = async () => {
      if (user && asistire != null) {
        const { data, error } = await supabase
          .from("profiles")
          .update({
            confirmacion_asistencia: asistire,
          })
          .eq("celular", user.celular);
        if (data) {
        }
        if (error) {
          console.log("Error updating asistencia:", error);
        }
      }
    };
    updateAsistencia();
  }, [user, asistire]);

  useEffect(() => {
    const fetchAsistencia = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("confirmacion_asistencia")
          .eq("celular", user.celular)
          .single();
        if (data) {
          setAsistire(data.confirmacion_asistencia);
        }
        if (error) {
          console.log("Error fetching asistencia:", error);
        }
      }
    };
    fetchAsistencia();
  }, [user]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h2 className="text-primary text-center text-5xl font-bold">
        ¿Contamos con tu asistencia?
      </h2>
      <div className="w-full flex flex-row items-center justify-center gap-4 py-2">
        <button
          className={cn(
            asistire == null
              ? "opacity-40"
              : asistire == false
              ? "opacity-100"
              : "opacity-10",
            "size-32 bg-[#c02918] rounded-xl flex flex-col items-center justify-center gap-2 text-slate-50"
          )}
          onClick={() => setAsistire(false)}
        >
          <IconCalendarXmark className="w-8 h-8" />
          No podré asistir
        </button>
        <button
          className={cn(
            asistire == null
              ? "opacity-60"
              : asistire == true
              ? "opacity-100"
              : "opacity-30",
            "size-32 bg-[#a3bf8f] rounded-xl flex flex-col items-center justify-center gap-2 text-slate-50"
          )}
          onClick={() => setAsistire(true)}
        >
          <IconCalendarCheck className="w-8 h-8" />
          Allí estaré
        </button>
      </div>
    </div>
  );
}
