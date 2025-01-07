import { User } from "@/app/context/UserContext";
import React from "react";
import TarjetaInvitacion from "./TarjetaInvitacion";
import CountDown from "./CountDown";
import CardsVotaciones from "./CardsVotaciones";
import TextoInvitacion from "./TextoInvitacion";
import ConfirmarAsistencia from "./ConfirmarAsistencia";

interface PageMainProps {
  user: User;
}

export default function PageMain(props: PageMainProps) {
  const { user } = props;
  return (
    <section className="w-full h-full">
      <TarjetaInvitacion user={user} />
      <TextoInvitacion />
      <ConfirmarAsistencia />
      <CountDown />
      <CardsVotaciones />
    </section>
  );
}
