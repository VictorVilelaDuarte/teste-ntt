"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TextInput from "../components/TextInput";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await api.post("/authenticate", data);

      localStorage.setItem("token", res.data.token);
      router.push("/dashboard");
    } catch (err) {
      setError("Email ou senha inválidos");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

        <TextInput
          {...register("email")}
          errorMessage={errors.email ? "E-mail inválido" : ""}
          placeholder="E-mail"
        />

        <TextInput
          {...register("password")}
          errorMessage={errors.password ? "A senha é obrigatória" : ""}
          placeholder="Senha"
          type="password"
        />

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition"
        >
          Entrar
        </button>
        <p>
          Ainda não tem login?
          <Link href={"/register"}>
            <b className="underline cursor-pointer"> Registre-se</b>
          </Link>
        </p>
      </form>
    </div>
  );
}
