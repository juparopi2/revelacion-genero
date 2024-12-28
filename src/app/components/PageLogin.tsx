import { User } from "@/app/context/UserContext";
import Login from "@/app/components/Login";
import LoginHero from "./LoginHero";
import { BackgroundLines } from "./external/background-lines";
import CountDown from "./CountDown";

interface LoginProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export default function PageLogin(props: LoginProps) {
  const { user, setUser } = props;
  return (
    <section className="w-full h-full flex flex-col items-center justify-center p-3 gap-3">
      <LoginHero />
      <Login user={user} setUser={setUser} />
    </section>
  );
}
