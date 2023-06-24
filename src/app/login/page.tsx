"use client"

import { Loading } from "@/components/Loading";
import { ToastComponent } from "@/components/Toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie } from 'nookies'
import { useCallback, useEffect, useRef, useState } from "react"
import { ButtonConfig, CardButton, CardCopyright, CardForm, CardImage, CardLogin, CardRememberMe, CardSenhaEmail, CardTitle, ImgTriodev, InputLogin, SizeImage } from "./styles";


export default function Login() {

    const router = useRouter();

    const refForm = useRef<any>();
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        const cookies = parseCookies();
        const token = cookies["bibliotech.token"];
        if (token) {
            router.push('/dashboard');
        }
      }, []);

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

                    setCookie(
                        undefined,
                        'bibliotech.token',
                        resposta.data.token,
                        {
                            maxAge: 60 * 60 * 24 * 30,
                            path: '/'
                        }
                    )

                    setCookie(
                        resposta.data.user,
                        'bibliotech.usuario',
                        resposta.data.user,
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
                onClose={() => { setToast(false) }}
            />


            <CardLogin>

                <CardImage>
                    <SizeImage src="../img/logo.png" />
                </CardImage>


                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    // paddingTop: 20
                }}>
                    <CardTitle >

                    </CardTitle>
                </div>

                <CardForm
                    className="row g-1 needs-validation"
                    noValidate
                    ref={refForm}
                    onSubmit={submitForm}

                >

{/* Input Email e Senha */}
                    <CardSenhaEmail>
                        <div className="input-group has-validadion">
                            <div className="col-md-12">
                                <InputLogin
                                    type="email"
                                    className="form-control"
                                    placeholder="Digite seu email"
                                    id="email"
                                    required
                                />

                                <div className="invalid-feedback">
                                    Por favor digite seu email.
                                </div>
                            </div>

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
                        </div>
                    </CardSenhaEmail>
{/* Fim do Input Email e Senha */}

{/* Botão Enviar */}
                    <CardButton className="col-md-12">
                        <ButtonConfig
                            className="btn btn-primary"
                            type='submit'
                            id="botao"

                        >
                            Enviar
                        </ButtonConfig>
{/* Fim do Botão Enviar */}

                        <CardCopyright>
                            <ImgTriodev src="img/triodev.png" />
                        </CardCopyright>
                    </CardButton>
                </CardForm>

            </CardLogin>
        </>
    )
}