import React from 'react'
import { Helmet } from "react-helmet-async";
interface PageTitleProps {
    title?: string;
}

function BrowserTitle({ title }: PageTitleProps) {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    )
}

export default BrowserTitle