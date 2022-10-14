import { useState, useEffect } from "react";
import styled from "styled-components";

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
                    goTop
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
    color: white;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    border: 1px solid #eee;
    cursor: pointer;

`
