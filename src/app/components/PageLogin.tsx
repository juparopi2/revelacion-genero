import { User } from "@/app/context/UserContext";
import Login from "@/app/components/Login";
import LoginHero from "./LoginHero";
import Image from "next/image";

interface LoginProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export default function PageLogin(props: LoginProps) {
  const { user, setUser } = props;
  return (
    <section className="w-full h-full flex flex-col items-center justify-center p-3 gap-3 relative">
      <Image
        className="elefante-azul"
        src={"/Elefante azul.webp"}
        width={"100"}
        height={"435"}
        alt={"Elefante Azul"}
      ></Image>
      <Image
        className="elefante-rosa"
        src={"/Elefante rosa.webp"}
        width={"100"}
        height={"435"}
        alt={"Elefante Rosa"}
      ></Image>
      <Image
        className="interrogante-azul"
        src={"/Interrogacion azul.webp"}
        width={"150"}
        height={"535"}
        alt={"Interrogante Azul"}
      ></Image>
      <Image
        className="interrogante-rosa"
        src={"/Interrogacion rosa.webp"}
        width={"150"}
        height={"535"}
        alt={"Interrogante Rosa"}
      ></Image>
      <LoginHero />
      <Login user={user} setUser={setUser} />
    </section>
  );
}
