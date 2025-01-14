"use client";
import React, { useState } from "react";

interface LoginAdminProps {
  setAcceso: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginAdmin(props: LoginAdminProps) {
  const { setAcceso } = props;
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  const handleClaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const claveAdmin = process.env.NEXT_PUBLIC_CLAVE_ADMIN;
    if (clave !== claveAdmin) {
      setError("Clave incorrecta");
      return;
    }
    setAcceso(true);
  };

  return (
    <>
      <h1 className="bg-clip-text text-transparent text-center bg-gradient-to-b  from-primary to-amber-950 text-5xl py-2 relative z-20 font-bold tracking-tight">
        Administración
      </h1>
      <div className="z-30 bg-background p-4 rounded-lg">
        <form onSubmit={handleClaveSubmit} className="flex flex-col gap-5 pb-4">
          <input
            className="rounded-lg w-full bg-background p-1 text-primary text-lg font-semibold border-secondary border-4"
            type="password"
            placeholder="Clave de admin..."
            value={clave}
            onChange={(e) => setClave(e.target.value)}
          />
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button className="button-validar text-black font-bold" type="submit">
            Ingresar
            <div className="hoverEffect">
              <div />
            </div>
          </button>
        </form>
      </div>
    </>
  );
}
