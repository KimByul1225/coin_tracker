import { Helmet } from "react-helmet-async";

interface PageTitleProps {
    title?: string;
}

const BrowserTitle = ({ title }: PageTitleProps) => {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
};

export default BrowserTitle;
