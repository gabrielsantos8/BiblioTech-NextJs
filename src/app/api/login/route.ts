import { NextResponse } from "next/server";
import axios from "axios";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, senha }: any = await req.json();

  let usuario = await axios.post("http://127.0.0.1:8000/api/admin/login", {
    email: email,
    password: senha,
  });

  if (usuario.data.success) {
      let objUsuario = usuario.data.dados[0];
      delete objUsuario.password;
      const token = jwt.sign(objUsuario, "123456", {
        expiresIn: 60 * 60,
      });
      return NextResponse.json({ token: token, user: objUsuario.name});
  }
  return new Response("Dados incorretos", {
    status: 401,
  });
}
