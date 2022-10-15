import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Icon from "../images/icon/icon_go_top.png";

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
    font-size: 14px;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    border: 1px solid #fff;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    i{
        display: inline-block;
        width: 30px;
        height: 30px;
        background: url(${Icon}) center no-repeat;
        background-size: contain;
        transform: rotate(90deg);
    }
    

`
