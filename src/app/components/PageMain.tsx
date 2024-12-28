import { User } from "@/app/context/UserContext";
import React from "react";
import TarjetaInvitacion from "./TarjetaInvitacion";
import CountDown from "./CountDown";
import CardsVotaciones from "./CardsVotaciones";

interface PageMainProps {
  user: User;
}

export default function PageMain(props: PageMainProps) {
  const { user } = props;
  return (
    <section className="w-full h-full">
      <TarjetaInvitacion user={user} />
      <CountDown />
      <CardsVotaciones />
    </section>
  );
}
