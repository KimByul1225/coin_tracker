import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { isDarkAtom } from '../atoms';

interface ToggleButtonProps {
    isDark: boolean;
}

function ToggleButton() {
    const [darkAtom, setDarkAtom] = useRecoilState(isDarkAtom);
    const toggleButtonHandler = () => setDarkAtom((prev) => !prev);

    return (
        <ThemeToggleButton onClick={toggleButtonHandler} isDark={darkAtom}>
            <IconWrap isDark={darkAtom}>
                <span className="sun">🌞</span>
                <span className="moon">🌙</span>
            </IconWrap>
        </ThemeToggleButton>
    )
}

export default ToggleButton

const ThemeToggleButton = styled.button<ToggleButtonProps>`
    position: absolute;
    top: 50px;
    right: 50px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    background-color: #111;
    width: 95px;
    height: 50px;
    border-radius: 50px;
    
    border: 1px solid #fff;
    outline: none;
    ::after{
        content: "";
        position: absolute;
        display: block;
        width: 38px;
        height: 38px;
        border-radius: 19px;
        background-color: #fff;
        left: ${(props) => props.isDark ? 5 : 49}px;
        top: 50%;
        transform: translateY(-51%);
        transition: all .3s ease-in;
    }
    i{
        display: inline-block;
        width: 36px;
    }
`
const IconWrap = styled.div<ToggleButtonProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    .moon{
        opacity: ${(props) => props.isDark ? 1 : 0};
        transition: all .3s ease-in;
    }
    .sun{
        opacity: ${(props) => props.isDark ? 0 : 1};
        transition: all .3s ease-in;
    }
`