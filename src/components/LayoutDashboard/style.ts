import styled from 'styled-components';

export const Dashboard = styled.div`
  display: flex;
`;

export const Header = styled.header`
  background-color: #222;
  color: #fff;
  padding: 10px;
  position: fixed;
  width: 100%;
`;

export const Logo = styled.h1`
  color: #fff;
  margin: 0;
  font-size: 24px;
`;

export const SideNav = styled.nav`
  width: 220px;
  height: 100vh;
  background-color: #333;
  color: #fff;
  padding: 20px;
`;

export const NavItem = styled.a`
  display: block;
  color: #fff;
  text-decoration: none;
  margin-bottom: 10px;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

export const Page = styled.div`
  flex: 1;
  padding: 20px;
`;
