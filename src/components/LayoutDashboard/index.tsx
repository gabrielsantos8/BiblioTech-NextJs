"use client"

import { validaPermissao } from "@/services/Token"
import Link from "next/link"
import { ReactNode } from "react"
import { Dashboard, Header, Logo, NavItem, Page, SideNav } from "./style"
import { Nav } from "react-bootstrap"

interface interfProps {
    children: ReactNode
    active: string
    token: string | undefined
}
export const LayoutDashboard = (props: interfProps) => {

    return (
        <>
            <Dashboard>
                <Header>
                    <Logo>Dashboard</Logo>
                </Header>
                <SideNav>
                    <NavItem href="#">Usuários</NavItem>
                    <NavItem href="#">Alunos</NavItem>
                    <NavItem href="#">Livros</NavItem>
                    <NavItem href="#">Cursos</NavItem>
                    <NavItem href="#">Editora</NavItem>
                    <NavItem href="#">Autor</NavItem>
                </SideNav>
                <Page>
                    {props.children}
                </Page>
            </Dashboard>


        </>
    )
}