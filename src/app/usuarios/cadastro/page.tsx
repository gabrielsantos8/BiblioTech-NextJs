"use client";

import { LayoutDashboard } from "@/components/LayoutDashboard";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ButtonCad,
  ButtonWrapper
} from "./style";
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

interface interProps {
  dados: Array<{ id: number; nome: string }>;
}

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
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value
      };
      axios
        .post("http://localhost:3000/api/usuarios", objSalvar)
        .then((resposta) => {
          setToastMessage(resposta.data.message);
          router.push('/usuarios/listagem');
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setToast(true);
          setToastMessage("Dados invalidos");
          console.log(err);
        });
    } else {
      refForm.current.classList.add("was-validated");
    }
  }, []);

  return (
    <>
      <LayoutDashboard active="usuarios">
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
                  placeholder="Digite o nome do usuário"
                  id="name"
                  name="name"
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
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite o email do usuário.
                </div>
              </div>

              <div className="col-md-12">
                <InputLogin
                  type="password"
                  className="form-control"
                  placeholder="Digite a senha do usuário"
                  id="password"
                  name="password"
                  required
                />
                <div className="invalid-feedback">
                  Por favor digite a senha do usuário.
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
