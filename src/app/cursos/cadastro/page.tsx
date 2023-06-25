"use client";

import { LayoutDashboard } from "@/components/LayoutDashboard";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import axios from "axios";
import { Loading } from "@/components/Loading";
import {
  ButtonConfig,
  CardButton,
  CardForm,
  CardSenhaEmail,
  InputLogin
} from "@/app/login/styles";
import { ToastComponent } from "@/components/Toast";

export default function Cadastro() {
  const router = useRouter();
  const refForm = useRef<any>();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");


  const submitForm = useCallback((e: any) => {
    e.preventDefault();
    if (refForm.current.checkValidity()) {
      setLoading(true);
      const objSalvar = {
        nome: e.target.nome.value,
        coordenador: e.target.coordenador.value,
        duracao: e.target.duracao.value
      };
      axios
        .post("http://localhost:3000/api/cursos", objSalvar)
        .then((resposta) => {
          setToastMessage(resposta.data.message);
          router.push('/cursos/listagem');
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
      <LayoutDashboard active="cursos">
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
          <CardSenhaEmail>
            <div className="input-group has-validadion">
              <div className="col-md-12">
                <InputLogin
                  type="text"
                  className="form-control"
                  placeholder="Digite o nome do curso"
                  id="nome"
                  name="nome"
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite o nome do curso.
                </div>
              </div>

              <div className="col-md-12">
                <InputLogin
                  type="text"
                  className="form-control"
                  placeholder="Digite o coordenador do curso"
                  id="coordenador"
                  name="coordenador"
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite o coordenador do curso.
                </div>
              </div>

              <div className="col-md-12">
                <InputLogin
                  type="number"
                  className="form-control"
                  placeholder="Digite a duração do curso"
                  id="duracao"
                  name="duracao"
                  required
                />
                <div className="invalid-feedback">
                  Por favor digite a duração do curso.
                </div>
              </div>
            </div>
          </CardSenhaEmail>

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
