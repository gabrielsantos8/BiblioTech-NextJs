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

interface autoresProps {
  id: number;
  nome: string;
  endereco: string;
  cidade: string;
  uf: string;
  telefone: string;
  created_at: string;
  updated_at: string;
}

interface editorasProps {
  id: number;
  nome: string;
  endereco: string;
  cidade: string;
  uf: string;
  telefone: string;
  created_at: string;
  updated_at: string;
}

export default function Listagem() {
  const refForm = useRef<any>();
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toast, setToast] = useState(false);
  const [livros, setLivros] = useState<Array<livrosProps>>();
  const [autores, setAutores] = useState<Array<autoresProps>>();
  const [editoras, setEditoras] = useState<Array<editorasProps>>();
  const [showModal, setShowModal] = useState(false);
  const [selectedLivro, setSelectedLivro] = useState<livrosProps>();

  const openModal = (livro: livrosProps) => {
    setSelectedLivro(livro);
    setShowModal(true);
  };

  useEffect(() => {
    setLoading(true);
    loadLivros();
    loadAutores();
    loadEditoras();
  }, []);

  const loadLivros = function () {
    axios.get("http://localhost:3000/api/livros").then((resposta) => {
      setLivros(resposta.data.livros);
      setLoading(false);
    });
  };

  const loadAutores = function () {
    axios.get("http://localhost:3000/api/autores").then((resposta) => {
      setAutores(resposta.data.autores);
      setLoading(false);
    });
  };

  const loadEditoras = function () {
    axios.get("http://localhost:3000/api/editoras").then((resposta) => {
      setEditoras(resposta.data.editoras);
      setLoading(false);
    });
  };

  const excluirLivros = useCallback((id: number) => {
    setLoading(true);
    axios
      .delete("http://localhost:3000/api/livros?id=" + id)
      .then((resposta) => {
        setLoading(false);
        loadLivros();
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
        titulo: e.target.titulo.value,
        subtitulo: e.target.subtitulo.value,
        isbn: e.target.isbn.value,
        autor_id: e.target.autor_id.value,
        editora_id: e.target.editora_id.value,
        local: e.target.local.value,
        ano: e.target.ano.value,
      };
      axios
        .put("http://localhost:3000/api/livros", objAtualizar)
        .then((resposta) => {
          loadLivros();
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
      <LayoutDashboard active="livros">
        <ButtonWrapper>
          <ButtonCad href={"/livros/cadastro"}>Cadastrar</ButtonCad>
        </ButtonWrapper>
        <TableWrapper>
          <Table>
            <thead>
              <TableRow>
                <TableHeader>ID</TableHeader>
                <TableHeader>Título</TableHeader>
                <TableHeader>Sub-Título</TableHeader>
                <TableHeader>ISBN</TableHeader>
                <TableHeader>Autor</TableHeader>
                <TableHeader>Editora</TableHeader>
                <TableHeader>Local</TableHeader>
                <TableHeader>Ano</TableHeader>
                <TableHeader>Ações</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {livros?.map((rec, index) => {
                return (
                  <>
                    <TableRow>
                      <TableCell key={index}>{rec.id}</TableCell>
                      <TableCell>{rec.titulo}</TableCell>
                      <TableCell>{rec.subtitulo}</TableCell>
                      <TableCell>{rec.isbn}</TableCell>
                      <TableCell>{rec.autor}</TableCell>
                      <TableCell>{rec.editora}</TableCell>
                      <TableCell>{rec.local}</TableCell>
                      <TableCell>{rec.ano}</TableCell>
                      <TableCell>
                        <ButtonEdit onClick={() => openModal(rec)}>
                          <Pencil />
                        </ButtonEdit>
                        <ButtonDel
                          onClick={() => {
                            excluirLivros(rec.id);
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
          <Modal.Title>Editar Livro</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          {selectedLivro && <p>Editando : {selectedLivro.titulo}</p>}
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
                  defaultValue={selectedLivro?.id}
                  hidden
                />
                <InputLogin
                  type="text"
                  className="form-control"
                  placeholder="Digite o titulo do livro"
                  id="titulo"
                  name="titulo"
                  defaultValue={selectedLivro?.titulo}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite o titulo do livro.
                </div>
              </div>

              <div className="col-md-12">
                <InputLogin
                  type="text"
                  className="form-control"
                  placeholder="Digite o sub-título do livro"
                  id="subtitulo"
                  name="subtitulo"
                  defaultValue={selectedLivro?.subtitulo}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite o sub-título do livro.
                </div>
              </div>

              <div className="col-md-12">
                <InputLogin
                  type="number"
                  className="form-control"
                  placeholder="Digite o ISBN do livro"
                  id="isbn"
                  name="isbn"
                  defaultValue={selectedLivro?.isbn}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite o ISBN do livro.
                </div>
              </div>
              <div className="col-md-12">
                <InputSelect
                  name="autor_id"
                  id="autor_id"
                  required
                  defaultValue={selectedLivro?.autor_id}
                >
                  {autores?.map((autor, index) => {
                    return (
                      <>
                        <option value={autor.id}>{autor?.nome}</option>
                      </>
                    );
                  })}
                </InputSelect>

                <div className="invalid-feedback">
                  Por favor selecione o autor do livro.
                </div>
              </div>
              <div className="col-md-12">
                <InputSelect
                  name="editora_id"
                  id="editora_id"
                  required
                  defaultValue={selectedLivro?.editora_id}
                >
                  {editoras?.map((editora, index) => {
                    return (
                      <>
                        <option value={editora.id}>{editora?.nome}</option>
                      </>
                    );
                  })}
                </InputSelect>

                <div className="invalid-feedback">
                  Por favor selecione a editora do livro.
                </div>
              </div>
              <div className="col-md-12">
                <InputLogin
                  type="string"
                  className="form-control"
                  placeholder="Digite o local do livro"
                  id="local"
                  name="local"
                  defaultValue={selectedLivro?.local}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite o local do livro.
                </div>
              </div>
              <div className="col-md-12">
                <InputLogin
                  type="number"
                  className="form-control"
                  placeholder="Digite o ano do livro"
                  id="ano"
                  name="ano"
                  defaultValue={selectedLivro?.ano}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite o ano do livro.
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
