import { NextResponse } from "next/server";
import axios from "axios";
import queryString from "query-string";

export async function GET() {
  let alunos = await axios.get("http://127.0.0.1:8000/api/aluno/list");
  if (alunos.data.success) {
    let objAlunos = alunos.data.dados;
    return NextResponse.json({ alunos: objAlunos });
  }
}

export async function POST(req: Request) {
  const { nome, ra, endereco, cidade, uf, telefone, curso_id }: any =
    await req.json();
  let aluno = await axios.post("http://127.0.0.1:8000/api/aluno/store", {
    nome: nome,
    ra: ra,
    endereco: endereco,
    cidade: cidade,
    uf: uf,
    telefone: telefone,
    curso_id: curso_id,
  });
  if (aluno.data.success) {
    return NextResponse.json({ message: aluno.data.message });
  }
}

export async function DELETE(req: Request) {
  const params = queryString.parseUrl(req.url);
  let aluno = await axios.post("http://127.0.0.1:8000/api/aluno/destroy", {
    id: params.query.id,
  });
  if (aluno.data.success) {
    return NextResponse.json({ message: aluno.data.message });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, nome, ra, endereco, cidade, uf, telefone, curso_id }: any =
      await req.json();
    let aluno = await axios.post("http://127.0.0.1:8000/api/aluno/update", {
      id: id,
      nome: nome,
      ra: ra,
      endereco: endereco,
      cidade: cidade,
      uf: uf,
      telefone: telefone,
      curso_id: curso_id,
    });

    return NextResponse.json({ message: aluno.data.message });
  } catch (error: any) {
    return NextResponse.json({ message: error.data.message });
  }
}
