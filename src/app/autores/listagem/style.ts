import Link from "next/link";
import styled from "styled-components";

export const TableWrapper = styled.div`
  width: 100%;
  display: flex;
  background-color: #212529;
  justify-content: center;
`;

export const Table = styled.table`
  width: 100%;
  text-align: center;
  color: #FFFFFF;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  font-size: 14px;
`;

export const TableHeader = styled.th`
  padding: 5px;
  text-align: center;
  background-color: #010202;
  color: #dddddd;
  font-weight: bold;
  border-bottom: 1px solid #3871C1;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #303437;
  }
`;

export const TableCell = styled.td`
  padding: 5px;
  border-bottom: 1px solid #26282B;
`;

export const ButtonWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
`;

export const ButtonCad = styled(Link)`
  position: absolute;
  top: 10px;
  border-radius: 4px;
  right: 10px;
  padding: 10px 20px;
  text-decoration: none;
  background-color: #1C3962;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #18314f;
  }
`;

export const ButtonDel = styled.button`
  padding: 5px;
  text-decoration: none;
  color: #F83535;
  background-color: #F8353500;
  font-size: 1.2em;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: #A30E0E;
  }
`;


export const ButtonEdit = styled.button`
  padding: 5px;
  text-decoration: none;
  background-color: #F8353500;
  color: #00ADEF;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #3871C1;;
  }
`;