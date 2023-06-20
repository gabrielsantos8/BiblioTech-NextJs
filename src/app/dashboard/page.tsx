import { cookies } from 'next/headers'
import { LayoutDashboard } from "@/components/LayoutDashboard";
import { verificaTokenExpirou } from '@/services/Token';
import { redirect } from 'next/navigation';

export default function Dashboard() {

    const cookie = cookies();

    const token = cookie.get('shoopypainel.token')

    if (!token?.value || verificaTokenExpirou(token.value)) {
        redirect('/login')
    }

    return (
        <LayoutDashboard
            active='dashboard'
            token={token.value}
        >
            <h1>Dashboard</h1>
        </LayoutDashboard>
    )
}