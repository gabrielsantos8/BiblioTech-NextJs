import { cookies } from "next/headers";
import { LayoutDashboard } from "@/components/LayoutDashboard";
import { validaPermissao, verificaTokenExpirou } from "@/services/Token";
import { redirect } from "next/navigation";
import axios from "axios";

interface interUsuarios {
  id: number;
  nome: string;
}

export default async function Usuarios() {
  const cookie = cookies();
  const token = cookie.get("bibliotech.token");
  
  if (!token?.value || verificaTokenExpirou(token.value)) {
    redirect("/login");
  }

  redirect("/usuarios/listagem");
}
