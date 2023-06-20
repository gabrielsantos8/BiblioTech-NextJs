import { cookies } from 'next/headers'
import { LayoutDashboard } from "@/components/LayoutDashboard";
import { validaPermissao, verificaTokenExpirou } from '@/services/Token';
import { redirect } from 'next/navigation';
import PageUsuarios from '@/components/PageUsuarios';
import axios from 'axios';

interface interUsuarios {
    "id": number,
    "nome": string
}

export default async function Usuarios() {

    const cookie = cookies();

    const token = cookie.get('shoopypainel.token')

    if (!token?.value || verificaTokenExpirou(token.value)) {
        redirect('/login')
    }

    const acessPage = validaPermissao(token.value, ['admin'])

    if (!acessPage) {
        redirect('/dashboard')
    }

    let usuarios: { data: Array<interUsuarios> } = { data: [] }

    usuarios = await axios.get('http://localhost:3001/usuarios')

    return (
        <LayoutDashboard
            active='usuarios'
            token={token.value}
        >
            <PageUsuarios dados={usuarios.data} />
        </LayoutDashboard>
    )
}