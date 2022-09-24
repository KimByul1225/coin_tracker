import { Helmet } from "react-helmet-async";

interface PageTitleProps {
    text?: string;
}

const BrowserTitle = ({ text }: PageTitleProps) => {
    return (
        <Helmet>
            <title>{text}</title>
        </Helmet>
    );
};

export default BrowserTitle;
