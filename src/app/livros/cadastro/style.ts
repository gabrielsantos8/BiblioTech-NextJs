import Link from "next/link";
import styled from "styled-components";


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