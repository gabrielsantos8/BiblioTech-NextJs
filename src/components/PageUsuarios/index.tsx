'use client'

import { useRouter } from "next/navigation"
import { useCallback, useState } from "react";

interface interProps {
    dados: Array<{ id: number, nome: string }>
}

export default function PageUsuarios(props: interProps) {

    const router = useRouter();

    const [dados, setDados] = useState<Array<{
        id: number,
        nome: string
    }
    >>(props.dados)

    const excluirUsuarios = useCallback((id: number) => {

    }, [])

    return (
        <>
            <div
                className="d-flex justify-content-between"
            >
                <h1>Usuarios</h1>
                <div>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                            router.push('/usuarios/criar')
                        }}
                    >
                        Adicionar
                    </button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dados.map((element) => {
                            return (
                                <tr>
                                    <td>
                                        {element.id}
                                    </td>
                                    <td>
                                        {element.nome}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                            onClick={() => {
                                                router.push('/usuarios/' + element.id)
                                            }}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            type="button"
                                            onClick={() => {
                                                excluirUsuarios(element.id)
                                            }}
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </>
    )
}