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
        endereco: e.target.endereco.value,
        cidade: e.target.cidade.value,
        uf: e.target.uf.value,
        telefone: e.target.telefone.value,
      };
      axios
        .post("http://localhost:3000/api/editoras", objSalvar)
        .then((resposta) => {
          setToastMessage(resposta.data.message);
          router.push('/editoras/listagem');
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
      <LayoutDashboard active="editoras">
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
                <InputLogin
                  type="text"
                  className="form-control"
                  placeholder="Digite o nome da editora"
                  id="nome"
                  name="nome"
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite o nome da editora.
                </div>
              </div>

              <div className="col-md-12">
                <InputLogin
                  type="text"
                  className="form-control"
                  placeholder="Digite o endereço do editora"
                  id="endereco"
                  name="endereco"
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite o endereço da editora.
                </div>
              </div>

              <div className="col-md-12">
                <InputLogin
                  type="text"
                  className="form-control"
                  placeholder="Digite a cidade da editora"
                  id="cidade"
                  name="cidade"
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite a cidade da editora.
                </div>
              </div>

              <div className="col-md-12">
                <InputLogin
                  type="text"
                  className="form-control"
                  placeholder="Digite a UF da editora"
                  id="uf"
                  name="uf"
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite a UF da editora.
                </div>
              </div>

              <div className="col-md-12">
                <InputLogin
                  type="number"
                  className="form-control"
                  placeholder="Digite o telefone da editora"
                  id="telefone"
                  name="telefone"
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite o telefone da editora.
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
      </LayoutDashboard>
    </>
  );
}
