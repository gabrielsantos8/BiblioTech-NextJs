import { NextResponse } from "next/server";
import axios from "axios";
import queryString from "query-string";

export async function GET() {
  let editoras = await axios.get("http://127.0.0.1:8000/api/editora/list");
  if (editoras.data.success) {
    let objEditoras = editoras.data.dados;
    return NextResponse.json({ editoras: objEditoras });
  }
}

export async function POST(req: Request) {
  const { nome, endereco, cidade, uf, telefone }: any = await req.json();
  let editora = await axios.post("http://127.0.0.1:8000/api/editora/store", {
    nome: nome,
    endereco: endereco,
    cidade: cidade,
    uf: uf,
    telefone: telefone,
  });
  if (editora.data.success) {
    return NextResponse.json({ message: editora.data.message });
  }
}

export async function DELETE(req: Request) {
  const params = queryString.parseUrl(req.url);
  let editora = await axios.post("http://127.0.0.1:8000/api/editora/destroy", {
    id: params.query.id,
  });
  if (editora.data.success) {
    return NextResponse.json({ message: editora.data.message });
  }
}

export async function PUT(req: Request) {
  const { id, nome, endereco, cidade, uf, telefone }: any = await req.json();
  let editora = await axios.post("http://127.0.0.1:8000/api/editora/update", {
    id: id,
    nome: nome,
    endereco: endereco,
    cidade: cidade,
    uf: uf,
    telefone: telefone,
  });
  if (editora.data.success) {
    return NextResponse.json({ message: editora.data.message });
  }
}
