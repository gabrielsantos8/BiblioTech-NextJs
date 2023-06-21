"use client"

import { Loading } from "@/components/Loading";
import { ToastComponent } from "@/components/Toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie } from 'nookies'
import { useCallback, useRef, useState } from "react"
import { CardLogin, InputLogin } from "./styles";
import { CardEmail } from "./styles";

export default function Login() {

    const router = useRouter();

    const refForm = useRef<any>();
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')


    const submitForm = useCallback((e: any) => {
        e.preventDefault();
        if (refForm.current.checkValidity()) {
            setLoading(true)
            const objSalvar = {
                email: e.target.email.value,
                senha: e.target.senha.value,
            }

            axios.post('http://localhost:3000/api/login',
                objSalvar
            )
                .then((resposta) => {
                    console.log(resposta.data)

                    setCookie(
                        undefined,
                        'shoopypainel.token',
                        resposta.data.token,
                        {
                            maxAge: 60 * 60 * 24 * 30,
                            path: '/'
                        }
                    )

                    router.push('/dashboard')

                    setLoading(false)
                })
                .catch((err) => {
                    setLoading(false)
                    setToast(true)
                    setToastMessage('Dados invalidos')
                    console.log(err)
                })

        } else {
            refForm.current.classList.add('was-validated')
        }


    }, [])

    return (
        <>
            <Loading loading={loading} />
            <ToastComponent
                show={toast}
                message={toastMessage}
                colors="danger"
                onClose={() => {setToast(false)}}
            />

        
            <CardLogin>
                
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        // paddingTop: 20
                    }}>
                        <h1 style={{ color: "#ADB5BD" }}>
                            Por favor, inscreva-se.
                        </h1>
                    </div>
                    <hr />
                    <form
                        className="row g-3 needs-validation"
                        noValidate
                        style={{
                            // paddingBottom: 20
                            alignItems: 'center'
                        }}
                        ref={refForm}
                        onSubmit={submitForm}

                    >
                        <CardEmail>
                            <div className="input-group has-validadion">
                                <InputLogin
                                    type="email"
                                    className="form-control"
                                    placeholder="Digite o email"
                                    id="email"
                                    required
                                />
                                <div className="invalid-feedback">
                                    Por favor digite seu email.
                                </div>
                            </div>
                        </CardEmail>

                        <div className="col-md-12">

                            <InputLogin
                                type="password"
                                className="form-control"
                                placeholder="Digite sua senha"
                                id="senha"
                                required
                            />
                            <div className="invalid-feedback">
                                Por favor digite sua senha.
                            </div>
                        </div>
                        <div className="col-md-12">
                            <button
                                className="btn btn-primary"
                                type='submit'
                                id="botao"

                            >
                                Enviar
                            </button>
                        </div>
                    </form>
                
            </CardLogin>
        </>
    )
}