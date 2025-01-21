"use client";

import { useState } from "react";
import LoginAdmin from "./components/LoginAdmin";
import VistaAdmin from "./components/VistaAdmin";

export default function AdminPage() {
  const [acceso, setAcceso] = useState(false);

  return (
    <main className="w-full h-[100svh] flex flex-col items-center justify-center p-3 bg-gradient-to-b from-secondary to-background text-primary overflow-auto">
      {!acceso && <LoginAdmin setAcceso={setAcceso} />}
      {acceso && <VistaAdmin />}
    </main>
  );
}
