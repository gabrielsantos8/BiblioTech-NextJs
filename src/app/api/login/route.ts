import { NextResponse } from 'next/server'
import axios from 'axios'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
    const { email, senha }: any = await req.json()

    try {

        let usuario = await axios.get(
            "http://localhost:3001/usuarios?email="
            +
            email
        )

        console.log(usuario)

        if (usuario.data.length === 1) {

            if (usuario.data[0].senha === senha) {

                let objUsuario = usuario.data[0]

                delete objUsuario.senha

                console.log(objUsuario)

                const token = jwt.sign(objUsuario, '123456', {
                    // expiresIn: "1d"  
                    expiresIn: 60 * 30
                })

                return NextResponse.json({ token: token })
            }

            return new Response('Dados incorretos', {
                status: 401
            })

        }
        return new Response('Dados incorretos', {
            status: 401
        })

    } catch (error: any) {
        console.log("error")
        return new Response(error.message, {
            status: 500
        })
        // console.log(error)
    }

    return NextResponse.json({ data: "Rota get" })
}