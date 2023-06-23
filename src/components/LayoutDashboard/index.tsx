"use client"

import { validaPermissao } from "@/services/Token"
import Link from "next/link"
import { ReactNode } from "react"
import { Content, ContentText, ContentTitle, Dashboard, Divisor, ImgLogo, Sidebar, SidebarLink, SidebarTitle, Space, SpaceDiv } from "./style"
import { Nav } from "react-bootstrap"
import { PersonFill, BuildingFill, MortarboardFill, GearFill, Escape, PeopleFill, HouseDoorFill, BookFill, PenFill, PersonCircle, ChevronDown } from 'react-bootstrap-icons';


interface interfProps {
    children: ReactNode
    active: string
    token: string | undefined
}
export const LayoutDashboard = (props: interfProps) => {

    return (
        <>
            <Dashboard>
      <Sidebar>
        <SidebarTitle><ImgLogo src="img/dashboardlogo.png" /></SidebarTitle>
        <Divisor/>
        <SidebarLink href="#">
            <HouseDoorFill className="sidebar-icon" />
            Dashboard
        </SidebarLink>
        <SidebarLink href="#">
            <PersonFill className="sidebar-icon" />
            Usuários
        </SidebarLink>
        <SidebarLink href="#">
            <PeopleFill className="sidebar-icon" />
            Alunos
        </SidebarLink>
        <SidebarLink href="#">
            <BookFill className="sidebar-icon" />
            Livros
        </SidebarLink>
        <SidebarLink href="#">
            <MortarboardFill className="sidebar-icon" />
            Cursos
        </SidebarLink>
        <SidebarLink href="#">
            <BuildingFill className="sidebar-icon" />
            Editora
        </SidebarLink>
        <SidebarLink href="#">
            <PenFill className="sidebar-icon" />
            Autor
        </SidebarLink>
            
        <SpaceDiv>
        <Space/>
        <Space/>
        <Space/>
        <Space/>
        <Space/>
        <Space/>
        <Space/>
        <Space/>
        <Space/>
        <Space/>
        <Space/>
        <Space/>
        <Space/>
        <Space/>
        <Space/>
        <Space/>
        <Space/>
        <Space/>
        <Space/>
        </SpaceDiv>
        <Divisor/>

        <SidebarLink href="#">
            <PersonCircle className="sidebar-icon" />
            <ChevronDown className="sidebar-icon" />  
        </SidebarLink>
        <SidebarLink href="#">
            <GearFill className="sidebar-icon" />
            Configurações
        </SidebarLink>       
        <SidebarLink href="#">
            <Escape className="sidebar-icon" />
            Sair
        </SidebarLink>


        


      </Sidebar>
      <Content>
        <ContentTitle>Dashboard</ContentTitle>
        <ContentText>Seja bem-vindo...</ContentText>
      </Content>
    </Dashboard>


        </>
    )
}