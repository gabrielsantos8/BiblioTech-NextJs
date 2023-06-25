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
} from "@/app/login/styles";
import { ToastComponent } from "@/components/Toast";

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

export default function Listagem() {
  const refForm = useRef<any>();
  const [loading, setLoading] = useState(false);
  const [autores, setAutores] = useState<Array<autoresProps>>();
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedAutor, setSelectedAutor] = useState<autoresProps>();

  const openModal = (autor: autoresProps) => {
    setSelectedAutor(autor);
    setShowModal(true);
  };

  useEffect(() => {
    setLoading(true);
    loadAutores();
  }, []);

  const loadAutores = function () {
    axios.get("http://localhost:3000/api/autores").then((resposta) => {
      setAutores(resposta.data.autores);
      setLoading(false);
    });
  };

  const excluirAutores = useCallback((id: number) => {
    setLoading(true);
    axios
      .delete("http://localhost:3000/api/autores?id=" + id)
      .then((resposta) => {
        setLoading(false);
        loadAutores();
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
        endereco: e.target.endereco.value,
        cidade: e.target.cidade.value,
        uf: e.target.uf.value,
        telefone: e.target.telefone.value,
      };
      axios
        .put("http://localhost:3000/api/autores", objAtualizar)
        .then((resposta) => {
          loadAutores();
          setShowModal(false);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      refForm.current.classList.add("was-validated");
    }
  }, []);

  return (
    <>
      <Loading loading={loading} />
      <ToastComponent
        show={toast}
        message={toastMessage}
        colors="danger"
        onClose={() => {
          setToast(false);
        }}
      />
      <LayoutDashboard active="autores">
        <ButtonWrapper>
          <ButtonCad href={"/autores/cadastro"}>Cadastrar</ButtonCad>
        </ButtonWrapper>
        <TableWrapper>
          <Table>
            <thead>
              <TableRow>
                <TableHeader>ID</TableHeader>
                <TableHeader>Nome</TableHeader>
                <TableHeader>Endereço</TableHeader>
                <TableHeader>Cidade</TableHeader>
                <TableHeader>UF</TableHeader>
                <TableHeader>Telefone</TableHeader>
                <TableHeader>Ações</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {autores?.map((rec, index) => {
                return (
                  <>
                    <TableRow>
                      <TableCell key={index}>{rec.id}</TableCell>
                      <TableCell>{rec.nome}</TableCell>
                      <TableCell>{rec.endereco}</TableCell>
                      <TableCell>{rec.cidade}</TableCell>
                      <TableCell>{rec.uf}</TableCell>
                      <TableCell>{rec.telefone}</TableCell>
                      <TableCell>
                        <ButtonEdit onClick={() => openModal(rec)}>
                          <Pencil />
                        </ButtonEdit>
                        <ButtonDel
                          onClick={() => {
                            excluirAutores(rec.id);
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
          <Modal.Title>Editar Autor</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          {selectedAutor && <p>Editando : {selectedAutor.nome}</p>}
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
                  defaultValue={selectedAutor?.id}
                  hidden
                />
                <InputLogin
                  type="text"
                  className="form-control"
                  placeholder="Digite o nome do autor"
                  id="nome"
                  name="nome"
                  defaultValue={selectedAutor?.nome}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite o nome do autor.
                </div>
              </div>

              <div className="col-md-12">
                <InputLogin
                  type="text"
                  className="form-control"
                  placeholder="Digite o endereço do autor"
                  id="endereco"
                  name="endereco"
                  defaultValue={selectedAutor?.endereco}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite o endereço do autor.
                </div>
              </div>

              <div className="col-md-12">
                <InputLogin
                  type="text"
                  className="form-control"
                  placeholder="Digite a cidade do autor"
                  id="cidade"
                  name="cidade"
                  defaultValue={selectedAutor?.cidade}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite a cidade do autor.
                </div>
              </div>

              <div className="col-md-12">
                <InputLogin
                  type="text"
                  className="form-control"
                  placeholder="Digite a UF do autor"
                  id="uf"
                  name="uf"
                  defaultValue={selectedAutor?.uf}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite a UF do autor.
                </div>
              </div>

              <div className="col-md-12">
                <InputLogin
                  type="number"
                  className="form-control"
                  placeholder="Digite o telefone do autor"
                  id="telefone"
                  name="telefone"
                  defaultValue={selectedAutor?.telefone}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite o telefone do autor.
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
