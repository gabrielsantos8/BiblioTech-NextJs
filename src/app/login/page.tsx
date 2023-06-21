"use client"

import { Loading } from "@/components/Loading";
import { ToastComponent } from "@/components/Toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie } from 'nookies'
import { useCallback, useRef, useState } from "react"
import { CardButton, CardCopyright, CardForm, CardImage, CardLogin, CardRememberMe, CardSenhaEmail, CardTitle, InputLogin } from "./styles";


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
                
                <CardImage>
                    
                </CardImage>

                
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        // paddingTop: 20
                    }}>
                        <h1 style={{
                            color: "#ADB5BD",
                            fontSize: "28px",
                            padding: "10px",
                            float: "inline-start"
                            

                        }}>
                            Realize o login
                        </h1>
                    </div>
                
                    <CardForm
                        className="row g-1 needs-validation"
                        noValidate
                        ref={refForm}
                        onSubmit={submitForm}

                    >
                        
                    <CardSenhaEmail>
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
                    </CardSenhaEmail>


                    <CardRememberMe>
                        <div className="form-check text-start my-3">
                            <input className="form-check-input" type="checkbox" value={"remember me"} id="flexCheckDefault"></input>
                            <label className="form-check-label" htmlFor="flexCheckDefault">Lembrar de mim</label> 
                        </div>
                    </CardRememberMe>


                        <div className="col-md-12">
                            <CardButton
                                className="btn btn-primary"
                                type='submit'
                                id="botao"

                            >
                                Enviar
                            </CardButton>


                            <CardCopyright>
                                <p className="mt-5 mb-3">© 2023 - TrioDev</p>
                            </CardCopyright>
                        </div>
                    </CardForm>
                
            </CardLogin>
        </>
    )
}