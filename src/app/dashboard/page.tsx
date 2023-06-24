import { cookies } from 'next/headers'
import { LayoutDashboard } from "@/components/LayoutDashboard";
import { verificaTokenExpirou } from '@/services/Token';
import { redirect } from 'next/navigation';

export default function Dashboard() {

    const cookie = cookies();
    const token = cookie.get('bibliotech.token')
    if (!token?.value || verificaTokenExpirou(token.value)) {
        cookie.delete('bibliotech.token');
        redirect('/login')
    }

    return (
        <LayoutDashboard
            active='dashboard'
        >
            <h1 style={{fontFamily: "sans-serif",
                        padding: "10px",
                        color: "#00ADEF"
        }}>
            Seja Bem-vindo...
            </h1>
        </LayoutDashboard>
    )
}