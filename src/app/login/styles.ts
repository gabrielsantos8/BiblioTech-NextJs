import React from "react";
import styled from "styled-components";



export const CardLogin = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    padding: 1rem;
    width: 100vw;
    height: 100vh;
    background-color: black;
    font-family: sans-serif;
    font-color: #ADB5BD;
`;

export const CardSenhaEmail = styled.div`
    width: 50%;
`;

export const InputLogin = styled.input`
    background-color: #212529;
    border-color: black;
    border-radius: 100px;  
    margin: 5px;
    display: block;
    color: gray;

    ::placeholder{
        color: gray;
    }

    &:focus{
        background-color: #212529;
        color: gray;
    }
`;

export const CardTitle = styled.h1`
    color: #00ADEF;
    font-size: 20px;
    
    
    
`;

export const CardButton = styled.div`
    text-align: center;
    padding: 3%;
    

`;

export const ButtonConfig = styled.button`
    width: 52%;
    border-radius: 100px;  
`;

export const CardImage = styled.div`
    text-align: center;
    padding: 10px;
`;

export const SizeImage = styled.img`
    width: 85%;
`;

export const ImgTriodev = styled.img`
    width: 50px;
`;

export const CardCopyright = styled.div`
    color: #ADB5BD;
    font-size: 16px;
    padding-top: 50px;
`;

export const CardRememberMe = styled.div`  
    color: #ADB5BD;
    width: 53%;
   
`;

export const CardForm = styled.form`
    justify-content: center;
    padding: 10px;
`;


