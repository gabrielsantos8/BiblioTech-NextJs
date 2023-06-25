import { NextResponse } from "next/server";
import axios from "axios";
import queryString from 'query-string'

export async function GET() {
  let cursos = await axios.get("http://127.0.0.1:8000/api/curso/list");
  if (cursos.data.success) {
    let objCursos = cursos.data.dados;
    return NextResponse.json({ cursos: objCursos });
  }
}


export async function POST(req: Request) {
  const { nome, coordenador, duracao }: any = await req.json();
  let curso = await axios.post("http://127.0.0.1:8000/api/curso/store", {
    nome: nome,
    coordenador: coordenador,
    duracao: duracao,
  });
  if (curso.data.success) {
    return NextResponse.json({ message: curso.data.message });
  }
}


export async function DELETE( req: Request ) {
  const params = queryString.parseUrl(req.url);
  let curso = await axios.post("http://127.0.0.1:8000/api/curso/destroy", {
    id: params.query.id
  });
  if (curso.data.success) {
    return NextResponse.json({ message: curso.data.message });
  }
}


export async function PUT( req: Request ) {
  const {id, nome, coordenador, duracao }: any = await req.json();
  let curso = await axios.post("http://127.0.0.1:8000/api/curso/update", {
    id: id,
    nome: nome,
    coordenador: coordenador,
    duracao: duracao
  });
  if (curso.data.success) {
    return NextResponse.json({ message: curso.data.message });
  }
}