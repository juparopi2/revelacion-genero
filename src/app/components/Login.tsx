import { useState } from "react";
import { supabase } from "@/model/supabaseClient";
import { User } from "@/app/context/UserContext";
import { IconGenderMale } from "../icons/IconGenderMale";
import { IconGenderFemale } from "../icons/IconGenderFemale";
import { cn } from "../lib/utils";

interface LoginProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export default function Login(props: LoginProps) {
  const { user, setUser } = props;
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("celular", phone)
        .single();

      if (error) throw error;

      if (data) {
        setUser(data);
        if (!data.genero || data.genero === "") {
          setShowAdditionalFields(true);
        }
      } else {
        setShowAdditionalFields(true);
      }
    } catch (error) {
      console.log("Error checking phone:", error);
      setShowAdditionalFields(true);
    }
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();

    if (gender === "") return;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({
          genero: gender,
        })
        .eq("celular", phone)
        .select();
      console.log("celular", phone);
      console.log("genero", gender);
      console.log("data", data);

      if (error) throw error;

      if (data && data.length > 0) {
        setUser(data[0]);
        setShowAdditionalFields(false);
      }
    } catch (error) {
      console.log("Error inserting profile:", error);
    }
  };

  return (
    <div className="z-30 bg-background p-4 rounded-lg">
      <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-5 pb-4">
        <input
          className="rounded-lg w-full bg-secondary p-1 text-primary text-xl font-semibold"
          type="text"
          placeholder="Teléfono ..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {(!user || user.nombre === "") && (
          <button className="button-validar text-black font-bold" type="submit">
            Validar
            <div className="hoverEffect">
              <div />
            </div>
          </button>
        )}
      </form>

      {showAdditionalFields && (
        <>
          <form className="flex flex-col gap-5" onSubmit={handleRegistration}>
            <div>
              <p className="font-semibold text-lg text-center">
                {" "}
                ¿Hola {user.nombre}, de que team eres?
              </p>
            </div>
            <div className="flex flex-row gap-10 items-center justify-between">
              <div
                className={cn(
                  "w-1/2 text-custom-boy rounded-lg p-2 bg-secondary",
                  gender === "M" && "bg-primary scale-110"
                )}
                onClick={() => setGender("M")}
              >
                <IconGenderMale />
              </div>
              <div
                className={cn(
                  "w-1/2 text-custom-girl rounded-lg p-2 bg-secondary",
                  gender === "F" && "bg-primary scale-110"
                )}
                onClick={() => setGender("F")}
              >
                <IconGenderFemale />
              </div>
            </div>
            <button
              className="button-validar text-black font-bold"
              type="submit"
            >
              Registrar voto
              <div className="hoverEffect">
                <div />
              </div>
            </button>
          </form>
        </>
      )}
    </div>
  );
}
