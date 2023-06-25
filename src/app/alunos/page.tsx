import { cookies } from "next/headers";
import { verificaTokenExpirou } from "@/services/Token";
import { redirect } from "next/navigation";

export default async function Usuarios() {
  const cookie = cookies();
  const token = cookie.get("bibliotech.token");
  
  if (!token?.value || verificaTokenExpirou(token.value)) {
    redirect("/login");
  }

  redirect("/alunos/listagem");
}
