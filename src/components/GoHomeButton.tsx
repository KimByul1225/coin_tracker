import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function GoHomeButton() {
    return (
        <Button
            to="/"
        >
            home
        </Button>
    );
}

export default GoHomeButton;

const Button = styled(Link)`
    
`