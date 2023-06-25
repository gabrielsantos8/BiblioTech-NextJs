import { NextResponse } from "next/server";
import axios from "axios";
import queryString from "query-string";

export async function GET() {
  let reservas = await axios.get("http://127.0.0.1:8000/api/reserva/list");
  if (reservas.data.success) {
    let objReservas = reservas.data.dados;
    return NextResponse.json({ reservas: objReservas });
  }
}

export async function POST(req: Request) {
  const { aluno_id, livro_id, datainicio, datafim, observacao }: any =
    await req.json();
  let reserva = await axios.post("http://127.0.0.1:8000/api/reserva/store", {
    aluno_id: aluno_id,
    livro_id: livro_id,
    datainicio: datainicio,
    datafim: datafim,
    observacao: observacao,
  });
  if (reserva.data.success) {
    return NextResponse.json({ message: reserva.data.message });
  }
}

export async function DELETE(req: Request) {
  const params = queryString.parseUrl(req.url);
  let reserva = await axios.post("http://127.0.0.1:8000/api/reserva/destroy", {
    id: params.query.id,
  });
  if (reserva.data.success) {
    return NextResponse.json({ message: reserva.data.message });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, aluno_id, livro_id, datainicio, datafim, observacao }: any =
      await req.json();
    let reserva = await axios.post("http://127.0.0.1:8000/api/reserva/update", {
      id: id,
      aluno_id: aluno_id,
      livro_id: livro_id,
      datainicio: datainicio,
      datafim: datafim,
      observacao: observacao,
    });

    return NextResponse.json({ message: reserva.data.message });
  } catch (error: any) {
    return NextResponse.json({ message: error.data.message });
  }
}
