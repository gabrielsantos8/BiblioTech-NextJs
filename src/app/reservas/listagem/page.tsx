"use client";

import { LayoutDashboard } from "@/components/LayoutDashboard";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ButtonCad,
  ButtonDel,
  ButtonEdit,
  ButtonWrapper,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TableWrapper,
} from "./style";
import axios from "axios";
import { Loading } from "@/components/Loading";
import { Trash3, Pencil } from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import {
  ButtonConfig,
  CardButton,
  CardForm,
  InputLogin,
  InputSelect,
} from "@/app/login/styles";
import { ToastComponent } from "@/components/Toast";

interface reservasProps {
  id: number;
  aluno_id: number;
  aluno: string;
  livro_id: number;
  livro: string;
  datainicio: string;
  datafim: string;
  observacao: string;
  created_at: string;
  updated_at: string;
}

interface livrosProps {
  id: number;
  titulo: string;
  subtitulo: string;
  isbn: number;
  autor_id: number;
  autor: string;
  editora_id: number;
  editora: string;
  local: string;
  ano: number;
  created_at: string;
  updated_at: string;
}

interface alunosProps {
  id: number;
  nome: string;
  ra: string;
  endereco: string;
  cidade: string;
  uf: string;
  telefone: string;
  curso_id: number;
  curso: string;
  created_at: string;
  updated_at: string;
}

export default function Listagem() {
  const refForm = useRef<any>();
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toast, setToast] = useState(false);
  const [reservas, setReservas] = useState<Array<reservasProps>>();
  const [livros, setLivros] = useState<Array<livrosProps>>();
  const [alunos, setAlunos] = useState<Array<alunosProps>>();
  const [showModal, setShowModal] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState<reservasProps>();

  const openModal = (reserva: reservasProps) => {
    setSelectedReserva(reserva);
    setShowModal(true);
  };

  useEffect(() => {
    setLoading(true);
    loadLivros();
    loadAlunos();
    loadReservas();
  }, []);

  const loadLivros = function () {
    axios.get("http://localhost:3000/api/livros").then((resposta) => {
      setLivros(resposta.data.livros);
      setLoading(false);
    });
  };

  const loadAlunos = function () {
    axios.get("http://localhost:3000/api/alunos").then((resposta) => {
      setAlunos(resposta.data.alunos);
      setLoading(false);
    });
  };

  const loadReservas = function () {
    axios.get("http://localhost:3000/api/reservas").then((resposta) => {
      setReservas(resposta.data.reservas);
      setLoading(false);
    });
  };

  const excluirReservas = useCallback((id: number) => {
    setLoading(true);
    axios
      .delete("http://localhost:3000/api/reservas?id=" + id)
      .then((resposta) => {
        setLoading(false);
        loadReservas();
      })
      .catch((err) => {
        setToastMessage(err.message);
        setLoading(false);
        setToast(true);
      });
  }, []);

  const submitForm = useCallback((e: any) => {
    e.preventDefault();
    if (refForm.current.checkValidity()) {
      setLoading(true);
      const objAtualizar = {
        id: e.target.id.value,
        aluno_id: e.target.aluno_id.value,
        livro_id: e.target.livro_id.value,
        datainicio: e.target.datainicio.value,
        datafim: e.target.datafim.value,
        observacao: e.target.observacao.value,
      };
      axios
        .put("http://localhost:3000/api/reservas", objAtualizar)
        .then((resposta) => {
          loadReservas();
          setShowModal(false);
          setLoading(false);
        })
        .catch((err) => {
          setToastMessage(err.message);
          setLoading(false);
        });
    } else {
      refForm.current.classList.add("was-validated");
    }
  }, []);

  return (
    <>
      {" "}
      <ToastComponent
        show={toast}
        message={toastMessage}
        colors="danger"
        onClose={() => {
          setToast(false);
        }}
      />
      <Loading loading={loading} />
      <LayoutDashboard active="reservas">
        <ButtonWrapper>
          <ButtonCad href={"/reservas/cadastro"}>Cadastrar</ButtonCad>
        </ButtonWrapper>
        <TableWrapper>
          <Table>
            <thead>
              <TableRow>
                <TableHeader>ID</TableHeader>
                <TableHeader>Aluno</TableHeader>
                <TableHeader>Livro</TableHeader>
                <TableHeader>Data Inicio</TableHeader>
                <TableHeader>Data Fim</TableHeader>
                <TableHeader>Observação</TableHeader>
                <TableHeader>Ações</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {reservas?.map((rec, index) => {
                return (
                  <>
                    <TableRow>
                      <TableCell key={index}>{rec.id}</TableCell>
                      <TableCell>{rec.aluno}</TableCell>
                      <TableCell>{rec.livro}</TableCell>
                      <TableCell>{rec.datainicio}</TableCell>
                      <TableCell>{rec.datafim}</TableCell>
                      <TableCell>{rec.observacao}</TableCell>
                      <TableCell>
                        <ButtonEdit onClick={() => openModal(rec)}>
                          <Pencil />
                        </ButtonEdit>
                        <ButtonDel
                          onClick={() => {
                            excluirReservas(rec.id);
                          }}
                        >
                          <Trash3></Trash3>
                        </ButtonDel>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </tbody>
          </Table>
        </TableWrapper>
      </LayoutDashboard>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Editar Reserva</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          {selectedReserva && (
            <p>Editando reserva com código: {selectedReserva.id}</p>
          )}
          <CardForm
            className="row g-1 needs-validation"
            noValidate
            ref={refForm}
            onSubmit={submitForm}
          >
            <div className="input-group has-validadion">
              <div className="col-md-12">
                <InputLogin
                  type="number"
                  id="id"
                  name="id"
                  defaultValue={selectedReserva?.id}
                  hidden
                />
              </div>

              <div className="col-md-12">
                <InputSelect
                  name="aluno_id"
                  id="aluno_id"
                  required
                  defaultValue={selectedReserva?.aluno_id}
                >
                  {alunos?.map((aluno, index) => {
                    return (
                      <>
                        <option value={aluno.id}>{aluno?.nome}</option>
                      </>
                    );
                  })}
                </InputSelect>

                <div className="invalid-feedback">
                  Por favor selecione o aluno da reserva.
                </div>
              </div>

              <div className="col-md-12">
                <InputSelect
                  name="livro_id"
                  id="livro_id"
                  required
                  defaultValue={selectedReserva?.livro_id}
                >
                  {livros?.map((livro, index) => {
                    return (
                      <>
                        <option value={livro.id}>{livro?.titulo}</option>
                      </>
                    );
                  })}
                </InputSelect>

                <div className="invalid-feedback">
                  Por favor selecione a livro da reserva.
                </div>
              </div>

              <div className="col-md-12">
                <InputLogin
                  type="date"
                  className="form-control"
                  placeholder="Digite a data inicio da reserva"
                  id="datainicio"
                  name="datainicio"
                  defaultValue={selectedReserva?.datainicio}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite a data inicio da reserva.
                </div>
              </div>

              <div className="col-md-12">
                <InputLogin
                  type="date"
                  className="form-control"
                  placeholder="Digite a data fim da reserva"
                  id="datafim"
                  name="datafim"
                  defaultValue={selectedReserva?.datafim}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite a data fim da reserva.
                </div>
              </div>
              <div className="col-md-12">
                <InputLogin
                  type="string"
                  className="form-control"
                  placeholder="Digite a observação da reserva"
                  id="observacao"
                  name="observacao"
                  defaultValue={selectedReserva?.observacao}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite a observação da reserva.
                </div>
              </div>
            </div>
            <CardButton className="col-md-12">
              <ButtonConfig
                className="btn btn-primary"
                type="submit"
                id="botao"
              >
                Salvar
              </ButtonConfig>
            </CardButton>
          </CardForm>
        </Modal.Body>
      </Modal>
    </>
  );
}
