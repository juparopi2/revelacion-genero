"use client";

import PageLogin from "./components/PageLogin";
import PageMain from "./components/PageMain";
import { useUserContext } from "@/app/context/UserContext";

export default function Home() {
  const { user, setUser } = useUserContext();
  return (
    <main className="w-full h-[100svh] flex flex-col items-center justify-center p-3 bg-gradient-to-b from-secondary to-background text-primary overflow-auto">
      {/* <BackgroundLines className="flex items-center justify-center w-full h-full flex-col"> */}
      {user && (user.nombre == "" || !user.genero || user.genero == "") && (
        <PageLogin user={user} setUser={setUser} />
      )}
      {user && user.nombre !== "" && user.genero && user.genero !== "" && (
        <PageMain user={user} />
      )}
      {/* </BackgroundLines> */}
    </main>
  );
}
