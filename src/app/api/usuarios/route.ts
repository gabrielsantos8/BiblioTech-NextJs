import { NextResponse } from "next/server";
import axios from "axios";
import queryString from 'query-string'

export async function GET() {
  let usuarios = await axios.get("http://127.0.0.1:8000/api/admin/list");
  if (usuarios.data.success) {
    let objUsuarios = usuarios.data.dados;
    return NextResponse.json({ usuarios: objUsuarios });
  }
}


export async function POST(req: Request) {
  const { name, email, password }: any = await req.json();
  let usuario = await axios.post("http://127.0.0.1:8000/api/admin/store", {
    name: name,
    email: email,
    password: password,
  });
  if (usuario.data.success) {
    return NextResponse.json({ message: usuario.data.message });
  }
}


export async function DELETE( req: Request ) {
  const params = queryString.parseUrl(req.url);
  let usuario = await axios.post("http://127.0.0.1:8000/api/admin/destroy", {
    id: params.query.id
  });
  if (usuario.data.success) {
    return NextResponse.json({ message: usuario.data.message });
  }
}


export async function PUT( req: Request ) {
  const {id, name, email }: any = await req.json();
  let usuario = await axios.post("http://127.0.0.1:8000/api/admin/update", {
    id: id,
    name: name,
    email: email
  });
  if (usuario.data.success) {
    return NextResponse.json({ message: usuario.data.message });
  }
}