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
import { Button } from "react-bootstrap";
import { ButtonConfig, CardButton, CardForm, InputLogin } from "@/app/login/styles";

interface interProps {
  dados: Array<{ id: number; nome: string }>;
}

interface usuariosProps {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
}

export default function Listagem() {
  const router = useRouter();
  const refForm = useRef<any>();
  const [loading, setLoading] = useState(false);
  const [usuarios, setUsuarios] = useState<Array<usuariosProps>>();
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<usuariosProps>();

  const openModal = (user: usuariosProps) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  useEffect(() => {
    setLoading(true);
    loadUsuarios();
  }, []);

  const loadUsuarios = function () {
    axios.get("http://localhost:3000/api/usuarios").then((resposta) => {
      setUsuarios(resposta.data.usuarios);
      setLoading(false);
    });
  };

  const excluirUsuarios = useCallback((id: number) => {
    setLoading(true);
    axios
      .delete("http://localhost:3000/api/usuarios?id=" + id)
      .then((resposta) => {
        setLoading(false);
        loadUsuarios();
      });
  }, []);

  const submitForm = useCallback((e: any) => {
    e.preventDefault();
    if (refForm.current.checkValidity()) {
      setLoading(true);
      const objAtualizar = {
        id:  e.target.id.value,
        name: e.target.name.value,
        email: e.target.email.value
      };
      axios
        .put("http://localhost:3000/api/usuarios", objAtualizar)
        .then((resposta) => {
          loadUsuarios();
          setShowModal(false);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      refForm.current.classList.add("was-validated");
    }
  }, []);

  return (
    <>
      <Loading loading={loading} />
      <LayoutDashboard active="usuarios">
        <ButtonWrapper>
          <ButtonCad href={"/usuarios/cadastro"}>Cadastrar</ButtonCad>
        </ButtonWrapper>
        <TableWrapper>
          <Table>
            <thead>
              <TableRow>
                <TableHeader>ID</TableHeader>
                <TableHeader>Nome</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Ações</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {usuarios?.map((rec, index) => {
                return (
                  <>
                    <TableRow>
                      <TableCell key={index}>{rec.id}</TableCell>
                      <TableCell>{rec.name}</TableCell>
                      <TableCell>{rec.email}</TableCell>
                      <TableCell>
                        <ButtonEdit onClick={() => openModal(rec)}>
                          <Pencil />
                        </ButtonEdit>
                        <ButtonDel
                          onClick={() => {
                            excluirUsuarios(rec.id);
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

      <Modal show={showModal} onHide={() => setShowModal(false)} >
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Editar Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          {selectedUser && <p>Editando : {selectedUser.name}</p>}
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
                  defaultValue={selectedUser?.id}
                  hidden
                />
                <InputLogin
                  type="text"
                  className="form-control"
                  placeholder="Digite o nome do usuário"
                  id="name"
                  name="name"
                  defaultValue={selectedUser?.name}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite o nome do usuário.
                </div>
              </div>

              <div className="col-md-12">
                <InputLogin
                  type="email"
                  className="form-control"
                  placeholder="Digite o email do usuário"
                  id="email"
                  name="email"
                  defaultValue={selectedUser?.email}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite o email do usuário.
                </div>
              </div>
            </div>
            <CardButton className="col-md-12">
            <ButtonConfig className="btn btn-primary" type="submit" id="botao">
              Salvar
            </ButtonConfig>
          </CardButton>
          </CardForm>
        </Modal.Body>
      </Modal>
    </>
  );
}
