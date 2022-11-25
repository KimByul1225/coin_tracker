import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Icon from "../images/icon/icon_go_top.png";

/**
 * @description 리스트페이지에서 페이지 최상단으로 이동하기 위한 버튼 컴포넌트
 */

function GoTopButton() {
    const [showTopBtn, setShowTopBtn] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <>
            {
                showTopBtn && <Button 
                    onClick={goToTop} 
                >
                    <i/>
                    <p>Go Top</p>
                </Button>
            }
        </>
    );
}
export default GoTopButton;

const Button = styled.button`
    position: fixed;
    bottom: 50px;
    right: 50px;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.05em;
    width: 70px;
    height: 70px;
    border-radius: 35px;
    border: 2px solid #fff;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    user-select: none;
    opacity: 0.7;
    :hover{
        opacity: 1;
        transition: all .3s ease;
    }
    i{
        display: inline-block;
        width: 30px;
        height: 30px;
        background: url(${Icon}) center no-repeat;
        background-size: contain;
        transform: rotate(90deg);
    }
    

`
