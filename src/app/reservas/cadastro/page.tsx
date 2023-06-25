"use client";

import { LayoutDashboard } from "@/components/LayoutDashboard";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Loading } from "@/components/Loading";
import {
  ButtonConfig,
  CardButton,
  CardForm,
  CardSenhaEmail,
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

export default function Cadastro() {
  const router = useRouter();
  const refForm = useRef<any>();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [livros, setLivros] = useState<Array<livrosProps>>();
  const [alunos, setAlunos] = useState<Array<alunosProps>>();

  useEffect(() => {
    setLoading(true);
    loadLivros();
    loadAlunos();
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

  const submitForm = useCallback((e: any) => {
    e.preventDefault();
    if (refForm.current.checkValidity()) {
      setLoading(true);
      const objSalvar = {
        aluno_id: e.target.aluno_id.value,
        livro_id: e.target.livro_id.value,
        datainicio: e.target.datainicio.value,
        datafim: e.target.datafim.value,
        observacao: e.target.observacao.value,
      };
      axios
        .post("http://localhost:3000/api/reservas", objSalvar)
        .then((resposta) => {
          setToastMessage(resposta.data.message);
          router.push("/reservas/listagem");
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setToast(true);
          setToastMessage("Dados invalidos");
        });
    } else {
      refForm.current.classList.add("was-validated");
    }
  }, []);

  return (
    <>
      <LayoutDashboard active="reservas">
        <Loading loading={loading} />
        <ToastComponent
          show={toast}
          message={toastMessage}
          colors="danger"
          onClose={() => {
            setToast(false);
          }}
        />

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
                hidden
              />
            </div>

            <div className="col-md-12">
              <InputSelect
                name="aluno_id"
                id="aluno_id"
                required
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
                required
              />

              <div className="invalid-feedback">
                Por favor digite a observação da reserva.
              </div>
            </div>
          </div>
          <CardButton className="col-md-12">
            <ButtonConfig className="btn btn-primary" type="submit" id="botao">
              Salvar
            </ButtonConfig>
          </CardButton>
        </CardForm>
      </LayoutDashboard>
    </>
  );
}
