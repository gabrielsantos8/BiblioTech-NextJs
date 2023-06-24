"use server";
import { cookies } from "next/headers";

export async function POST() {
  cookies().delete("bibliotech.token");
  cookies().delete("bibliotech.usuario");
  return true;
}
