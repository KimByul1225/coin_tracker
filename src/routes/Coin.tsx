import React from 'react'
import { useLocation } from 'react-router'

export default function Coin() {
    const location = useLocation();
    const {state} = location;

    console.log("location state", state);

    return (
        <div>Coin</div>
    )
}
