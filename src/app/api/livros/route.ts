import { NextResponse } from "next/server";
import axios from "axios";
import queryString from "query-string";

export async function GET() {
  let livros = await axios.get("http://127.0.0.1:8000/api/livro/list/1/0");
  if (livros.data.success) {
    let objLivros = livros.data.dados;
    return NextResponse.json({ livros: objLivros });
  }
}

export async function POST(req: Request) {
  const { titulo, subtitulo, isbn, local, ano, autor_id, editora_id }: any =
    await req.json();
  let livro = await axios.post("http://127.0.0.1:8000/api/livro/store", {
    titulo: titulo,
    subtitulo: subtitulo,
    isbn: isbn,
    local: local,
    ano: ano,
    autor_id: autor_id,
    editora_id: editora_id,
  });
  if (livro.data.success) {
    return NextResponse.json({ message: livro.data.message });
  }
}

export async function DELETE(req: Request) {
  const params = queryString.parseUrl(req.url);
  let livro = await axios.post("http://127.0.0.1:8000/api/livro/destroy", {
    id: params.query.id,
  });
  if (livro.data.success) {
    return NextResponse.json({ message: livro.data.message });
  }
}

export async function PUT(req: Request) {
  try {
    const {
      id,
      titulo,
      subtitulo,
      isbn,
      local,
      ano,
      autor_id,
      editora_id,
    }: any = await req.json();
    let livro = await axios.post("http://127.0.0.1:8000/api/livro/update", {
      id: id,
      titulo: titulo,
      subtitulo: subtitulo,
      isbn: isbn,
      local: local,
      ano: ano,
      autor_id: autor_id,
      editora_id: editora_id,
    });

    return NextResponse.json({ message: livro.data.message });
  } catch (error: any) {
    return NextResponse.json({ message: error.data.message });
  }
}
