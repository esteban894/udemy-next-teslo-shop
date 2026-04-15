"use server";

import { signIn } from "@/auth";

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return "Success";
  } catch (error) {
    console.error(error);
    return "CredentialsSignin";
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", { email, password });

    return { ok: true, message: "Inicio de sesión exitoso" };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Error al iniciar sesión" };
  }
};
