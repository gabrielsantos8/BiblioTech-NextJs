"use client";

import { LayoutDashboard } from "@/components/LayoutDashboard";
import { useRouter } from "next/navigation";
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

interface cursosProps {
  id: number;
  nome: string;
  coordenador: string;
  duracao: number;
  created_at: string;
  updated_at: string;
}

export default function Listagem() {
  const refForm = useRef<any>();
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toast, setToast] = useState(false);
  const [alunos, setAlunos] = useState<Array<alunosProps>>();
  const [cursos, setCursos] = useState<Array<cursosProps>>();
  const [showModal, setShowModal] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState<alunosProps>();

  const openModal = (aluno: alunosProps) => {
    setSelectedAluno(aluno);
    setShowModal(true);
  };

  useEffect(() => {
    setLoading(true);
    loadAlunos();
    loadCursos();
  }, []);

  const loadAlunos = function () {
    axios.get("http://localhost:3000/api/alunos").then((resposta) => {
      setAlunos(resposta.data.alunos);
      setLoading(false);
    });
  };

  const loadCursos = function () {
    axios.get("http://localhost:3000/api/cursos").then((resposta) => {
      setCursos(resposta.data.cursos);
      setLoading(false);
    });
  };

  const excluirAlunos = useCallback((id: number) => {
    setLoading(true);
    axios
      .delete("http://localhost:3000/api/alunos?id=" + id)
      .then((resposta) => {
        setLoading(false);
        loadAlunos();
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
        nome: e.target.nome.value,
        ra: e.target.ra.value,
        endereco: e.target.endereco.value,
        cidade: e.target.cidade.value,
        uf: e.target.uf.value,
        telefone: e.target.telefone.value,
        curso_id: e.target.curso_id.value,
      };
      axios
        .put("http://localhost:3000/api/alunos", objAtualizar)
        .then((resposta) => {
          loadAlunos();
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
      <LayoutDashboard active="alunos">
        <ButtonWrapper>
          <ButtonCad href={"/alunos/cadastro"}>Cadastrar</ButtonCad>
        </ButtonWrapper>
        <TableWrapper>
          <Table>
            <thead>
              <TableRow>
                <TableHeader>ID</TableHeader>
                <TableHeader>Nome</TableHeader>
                <TableHeader>RA</TableHeader>
                <TableHeader>Endereço</TableHeader>
                <TableHeader>Cidade</TableHeader>
                <TableHeader>UF</TableHeader>
                <TableHeader>Telefone</TableHeader>
                <TableHeader>Curso</TableHeader>
                <TableHeader>Ações</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {alunos?.map((rec, index) => {
                return (
                  <>
                    <TableRow>
                      <TableCell key={index}>{rec.id}</TableCell>
                      <TableCell>{rec.nome}</TableCell>
                      <TableCell>{rec.ra}</TableCell>
                      <TableCell>{rec.endereco}</TableCell>
                      <TableCell>{rec.cidade}</TableCell>
                      <TableCell>{rec.uf}</TableCell>
                      <TableCell>{rec.endereco}</TableCell>
                      <TableCell>{rec.curso}</TableCell>
                      <TableCell>
                        <ButtonEdit onClick={() => openModal(rec)}>
                          <Pencil />
                        </ButtonEdit>
                        <ButtonDel
                          onClick={() => {
                            excluirAlunos(rec.id);
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
          <Modal.Title>Editar Aluno</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          {selectedAluno && <p>Editando : {selectedAluno.nome}</p>}
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
                  defaultValue={selectedAluno?.id}
                  hidden
                />
                <InputLogin
                  type="text"
                  className="form-control"
                  placeholder="Digite o nome do aluno"
                  id="nome"
                  name="nome"
                  defaultValue={selectedAluno?.nome}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite o nome do aluno.
                </div>
              </div>

              <div className="col-md-12">
                <InputLogin
                  type="number"
                  className="form-control"
                  placeholder="Digite o RA do aluno"
                  id="ra"
                  name="ra"
                  defaultValue={selectedAluno?.ra}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite o RA do aluno.
                </div>
              </div>

              <div className="col-md-12">
                <InputLogin
                  type="string"
                  className="form-control"
                  placeholder="Digite a endereço do aluno"
                  id="endereco"
                  name="endereco"
                  defaultValue={selectedAluno?.endereco}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite a endereço do aluno.
                </div>
              </div>
              <div className="col-md-12">
                <InputLogin
                  type="string"
                  className="form-control"
                  placeholder="Digite a cidade do aluno"
                  id="cidade"
                  name="cidade"
                  defaultValue={selectedAluno?.cidade}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite a cidade do aluno.
                </div>
              </div>
              <div className="col-md-12">
                <InputLogin
                  type="string"
                  className="form-control"
                  placeholder="Digite a UF do aluno"
                  id="uf"
                  name="uf"
                  defaultValue={selectedAluno?.uf}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite a UF do aluno.
                </div>
              </div>
              <div className="col-md-12">
                <InputLogin
                  type="number"
                  className="form-control"
                  placeholder="Digite a telefone do aluno"
                  id="telefone"
                  name="telefone"
                  defaultValue={selectedAluno?.telefone}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite a telefone do aluno.
                </div>
              </div>
              <div className="col-md-12">
                <InputSelect
                  name="curso_id"
                  id="curso_id"
                  required
                  defaultValue={selectedAluno?.curso_id}
                >
                  {cursos?.map((curso, index) => {
                    return (
                      <>
                        <option value={curso.id}>{curso?.nome}</option>
                      </>
                    );
                  })}
                </InputSelect>

                <div className="invalid-feedback">
                  Por favor selecione o curso do aluno.
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
