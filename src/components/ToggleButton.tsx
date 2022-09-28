import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { isDarkAtom } from '../atoms';

function ToggleButton() {
    const [darkAtom, setDarkAtom] = useRecoilState(isDarkAtom);
    // const isDark = useRecoilValue(isDarkAtom);
    // const setDarkAtom =  useSetRecoilState(isDarkAtom);
    const toggleButtonHandler = () => setDarkAtom((prev) => !prev);

    return (
        <ThemeToggleButton onClick={toggleButtonHandler}>{darkAtom ? "dark" : "light"}</ThemeToggleButton>

    )
}

export default ToggleButton

const ThemeToggleButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 60px;
    color: white;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
`