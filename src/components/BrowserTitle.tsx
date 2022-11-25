import React from 'react'
import { Helmet } from "react-helmet-async";

/**
 * @description 브라우저 상단 타이틀을 위한 컴포넌트
 */

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