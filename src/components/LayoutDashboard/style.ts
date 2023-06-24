import styled from "styled-components";
import Link from "next/link";

interface linkProps {
  active: boolean;
}

export const Dashboard = styled.div`
  display: flex;
  height: 100vh;
  background-color: #2b3035;
  color: #adb5bd;
`;

export const Divisor = styled.hr``;
export const SpaceDiv = styled.div``;
export const Space = styled.br``;

export const ImgLogo = styled.img`
  width: 100%;
`;

export const Sidebar = styled.div`
  flex: 0 0 317px;
  padding: 20px;
  background-color: #212529;
`;

export const SidebarTitle = styled.h6`
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 14px;
  text-transform: uppercase;
  color: #6c757d;
`;

export const SidebarLink = styled(Link)<linkProps>`
  display: block;
  padding: 8px 1.5rem;
  color: #00adef;
  text-decoration: none;
  background-color: rgba(13, 110, 253, 0.1);
  background-color: ${(props: any) => props.active ? 'background-color: rgba(13, 110, 253, 0.1);' : `var(--red)`};
  font-size: 14px;
  margin-left: -20px;

  &:hover {
    color: #0d6efd;
    background-color: rgba(13, 110, 253, 0.1);
  }

  .sidebar-icon {
    margin-right: 0.5rem;
  }
`;

export const User = styled.div`
  font-size: 30px;
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

export const ContentTitle = styled.h1`
  margin-top: 0;
  color: #adb5bd;
`;

export const ContentText = styled.p`
  color: #adb5bd;
`;

export const ButtonLogout = styled.button`
  display: block;
  padding: 8px 1.5rem;
  color: #F33333;
  text-decoration: none;
  margin-left: -20px;
  background-color: #00ABEF00;
  border: none;
  &:hover {
    color: #F33333;
    background-color: #F333331F;
  }

  .sidebar-icon {
    margin-right: 0.5rem;
  }
`;
