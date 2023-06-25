import { NextResponse } from "next/server";
import axios from "axios";
import queryString from "query-string";

export async function GET() {
  let autores = await axios.get("http://127.0.0.1:8000/api/autor/list");
  if (autores.data.success) {
    let objAutores = autores.data.dados;
    return NextResponse.json({ autores: objAutores });
  }
}

export async function POST(req: Request) {
  const { nome, endereco, cidade, uf, telefone }: any = await req.json();
  let autor = await axios.post("http://127.0.0.1:8000/api/autor/store", {
    nome: nome,
    endereco: endereco,
    cidade: cidade,
    uf: uf,
    telefone: telefone,
  });
  if (autor.data.success) {
    return NextResponse.json({ message: autor.data.message });
  }
}

export async function DELETE(req: Request) {
  const params = queryString.parseUrl(req.url);
  let autor = await axios.post("http://127.0.0.1:8000/api/autor/destroy", {
    id: params.query.id,
  });
  if (autor.data.success) {
    return NextResponse.json({ message: autor.data.message });
  }
}

export async function PUT(req: Request) {
  const { id, nome, endereco, cidade, uf, telefone }: any = await req.json();
  let autor = await axios.post("http://127.0.0.1:8000/api/autor/update", {
    id: id,
    nome: nome,
    endereco: endereco,
    cidade: cidade,
    uf: uf,
    telefone: telefone,
  });
  if (autor.data.success) {
    return NextResponse.json({ message: autor.data.message });
  }
}
