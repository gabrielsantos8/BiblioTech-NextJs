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
interface cursosProps {
  id: number;
  nome: string;
  coordenador: string;
  duracao: number;
  created_at: string;
  updated_at: string;
}
export default function Cadastro() {
  const router = useRouter();
  const refForm = useRef<any>();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [cursos, setCursos] = useState<Array<cursosProps>>();

  const loadCursos = function () {
    axios.get("http://localhost:3000/api/cursos").then((resposta) => {
      setCursos(resposta.data.cursos);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadCursos();
  }, []);

  const submitForm = useCallback((e: any) => {
    e.preventDefault();
    if (refForm.current.checkValidity()) {
      setLoading(true);
      const objSalvar = {
        nome: e.target.nome.value,
        ra: e.target.ra.value,
        endereco: e.target.endereco.value,
        cidade: e.target.cidade.value,
        uf: e.target.uf.value,
        telefone: e.target.telefone.value,
        curso_id: e.target.curso_id.value,
      };
      axios
        .post("http://localhost:3000/api/alunos", objSalvar)
        .then((resposta) => {
          setToastMessage(resposta.data.message);
          router.push("/alunos/listagem");
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
      <LayoutDashboard active="alunos">
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
                type="text"
                className="form-control"
                placeholder="Digite o nome do aluno"
                id="nome"
                name="nome"
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
                required
              />

              <div className="invalid-feedback">
                Por favor digite a telefone do aluno.
              </div>
            </div>
            <div className="col-md-12">
              <InputSelect name="curso_id" id="curso_id" required>
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
            <ButtonConfig className="btn btn-primary" type="submit" id="botao">
              Salvar
            </ButtonConfig>
          </CardButton>
        </CardForm>
      </LayoutDashboard>
    </>
  );
}
