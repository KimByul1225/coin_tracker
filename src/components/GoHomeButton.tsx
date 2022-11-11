import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {  useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';

interface DarkModeInterface {
    isDark: boolean;
}

function GoHomeButton() {
    const darkAtom = useRecoilValue(isDarkAtom);
    return (
        <Button
            to="/"
            isDark = {darkAtom}
        >
            home으로 이동
            <span></span>
        </Button>
    );
}
export default GoHomeButton;

const Button = styled(Link)<DarkModeInterface>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: 2px solid ${(props) => props.isDark ? "#fff" : "#000"};
    text-indent: -99999px;
    opacity: 0.7;
    :hover{
        opacity: 1;
        transition: all .3s ease;
    }
    span{
        display: block;
        background-color: ${(props) => props.isDark ? "#fff" : "#000"};
        width: 25px;
        height: 5px;
        background-color: ${(props) => props.isDark ? "#fff" : "#000"};
        border-radius: 5px;
        position: relative;
        ::after, ::before{
            content: '';
            position: absolute;
            display: block;
            width: 15px;
            height: 5px;
            background-color: ${(props) => props.isDark ? "#fff" : "#000"};
            border-radius: 5px;
            left: 0;
        }
        ::after{
            transform: rotate(315deg) translateY(2px);
            transform-origin: left;
        }
        ::before{
            transform: rotate(45deg) translateY(-2px);
            transform-origin: left;
        }
    }
`