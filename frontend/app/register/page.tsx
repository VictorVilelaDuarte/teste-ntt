"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TextInput from "../components/TextInput";
import Link from "next/link";

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: RegisterForm) => {
    try {
      await api.post("/users", data);
      router.push("/login");
    } catch (err) {
      setError("Erro ao registrar.");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Registrar</h1>

        <TextInput
          {...register("name")}
          errorMessage={errors.name ? "Nome obrigatório" : ""}
          placeholder="Nome"
        />

        <TextInput
          {...register("email")}
          errorMessage={errors.email ? "E-mail inválido" : ""}
          placeholder="E-mail"
        />

        <TextInput
          {...register("password")}
          errorMessage={
            errors.password ? "Senha obrigatória (mín. 6 caracteres)" : ""
          }
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
          Registrar
        </button>
        <p>
          Já tem uma conta?
          <Link href={"/login"}>
            <b className="underline cursor-pointer"> Faça login</b>
          </Link>
        </p>
      </form>
    </div>
  );
}
